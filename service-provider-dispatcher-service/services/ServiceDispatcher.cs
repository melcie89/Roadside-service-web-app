using GeoCoordinatePortable;
using MassTransit;
using Microsoft.EntityFrameworkCore;
using service_provider_dispatcher_service.data;
using service_provider_dispatcher_service.dbcontext;
using Shared.Events;

namespace service_provider_dispatcher_service.services;

public class ServiceDispatcher(AppDbContext dbContext, IPublishEndpoint publishEndpoint)
{
    public async Task AssignServiceProviderAsync(RequestCreated request)
    {
        var availableProviders = await dbContext.ServiceProviders.ToListAsync();

        if (availableProviders.Count == 0)
        {
            Console.WriteLine("No available service providers for the requested service type.");
            return;
        }

        var clientLocation = new GeoCoordinate(request.Latitude, request.Longitude);
        
        var nearestProvider = availableProviders
            .OrderBy(sp => clientLocation.GetDistanceTo(new GeoCoordinate(sp.Latitude, sp.Longitude)))
            .FirstOrDefault();

        if (nearestProvider != null)
        {
            var assignment = new ServiceProviderAssignment
            {
                RequestId = request.RequestId,
                ServiceProviderId = nearestProvider.Id, 
                AssignmentDate = DateTime.UtcNow
            };

            dbContext.Assignments.Add(assignment);
            
            await dbContext.SaveChangesAsync();

            await publishEndpoint.Publish(new ServiceProviderAssigned()
            {
                ClientId = request.ClientId,
                RequesterId = assignment.RequestId,
                ServiceProviderId = assignment.ServiceProviderId,
            });

            Console.WriteLine($"Assigned Service Provider: {nearestProvider.Name} (ID: {nearestProvider.Id}) to Request: {request.RequestId}");
        }
        else
        {
            Console.WriteLine("No service providers available.");
        }
    }
}