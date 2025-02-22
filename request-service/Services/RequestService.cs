using MassTransit;
using Microsoft.EntityFrameworkCore;
using request_service.DbContext;
using request_service.Models;
using Shared.Events;

namespace request_service.Services;

public class RequestService(IPublishEndpoint publishEndpoint, AppDbContext context) : IRequestService
{
    public async Task<Request?> GetRequestAsync(Guid requestId)
    {
        return await context.Requests.FindAsync(requestId);
    }

    public async Task<ICollection<Request>?> GetCustomerRequestsAsync(Guid customerId)
    {
        return await context.Requests.Where(r=> r.CustomerId == customerId).ToListAsync();
    }

    public async Task<Request> CreateRequestAsync(CreateRequestDto request)
    {
        var r = new Request()
        {
            Id = Guid.NewGuid(),
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow,
            Status = "Pending",

            CustomerId = request.CustomerId,
            ServiceType = request.ServiceType,
            CustomerLatitude = request.CustomerLatitude,
            CustomerLongitude = request.CustomerLongitude,
            ServiceProviderId = Guid.Empty,
            Description = request.Description
        };
        
        context.Requests.Add(r);
        
        await context.SaveChangesAsync();

        await publishEndpoint.Publish(new RequestCreated
        {
            Id = Guid.NewGuid(),
            RequestId = r.Id, 
            ClientId = r.CustomerId, 
            Latitude = r.CustomerLatitude, 
            Longitude = r.CustomerLongitude, 
            ServiceType = r.ServiceType
        });
        
        return r;
    }

    public async Task<int> DeleteRequestAsync(Guid requestId)
    {
        return await context.Requests.Where(r => r.Id == requestId).ExecuteDeleteAsync();
    }

    public async Task<Request?> UpdateRequestAsync(UpdateRequestDto request)
    {
        var existingRequest = await context.Requests.FindAsync(request.Id);

        if (existingRequest == null) return null;
        
        existingRequest.ServiceType = request.ServiceType;
        existingRequest.CustomerLatitude = request.CustomerLatitude;
        existingRequest.CustomerLongitude = request.CustomerLongitude;
        existingRequest.Description = request.Description;
        existingRequest.UpdatedAt = DateTime.UtcNow;
        existingRequest.Status = request.Status;

        await context.SaveChangesAsync();
        
        return existingRequest;
    }

    public async Task<Request?> UpdateRequestStatusAsync(Guid requestId, Guid serviceProviderId)
    {
        var existingRequest = await context.Requests.FindAsync(requestId);
        
        if (existingRequest == null) return null;

        existingRequest.Status = "Assigned";
        existingRequest.ServiceProviderId = serviceProviderId;
        
        await context.SaveChangesAsync();
        
        return existingRequest;
    }
}