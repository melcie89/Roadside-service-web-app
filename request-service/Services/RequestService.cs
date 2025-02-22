using MassTransit;
using Microsoft.EntityFrameworkCore;
using request_service.DbContext;
using request_service.Events;
using request_service.Models;
using request_service.Repositories;
using shared.Events;

namespace request_service.Services;

public class RequestService : IRequestService
{
    private readonly IRequestRepository _requestRepository;
    private readonly IPublishEndpoint  _publishEndpoint;

    public RequestService(IRequestRepository requestRepository, IPublishEndpoint publishEndpoint)
    {
        _requestRepository = requestRepository;
        _publishEndpoint = publishEndpoint;
    }

    public async Task<Request?> GetRequestAsync(Guid requestId)
    {
        return await _requestRepository.GetRequestByIdAsync(requestId);
    }

    public async Task<ICollection<Request>?> GetCustomerRequestsAsync(Guid customerId)
    {
        return await _requestRepository.GetCustomerRequestsAsync(customerId);
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
        
        var createdRequest = await _requestRepository.CreateRequestAsync(r);

        await _publishEndpoint.Publish(new RequestCreated(
                                                createdRequest.Id, 
                                                createdRequest.CustomerId, 
                                                createdRequest.CustomerLatitude, 
                                                createdRequest.CustomerLongitude, 
                                                createdRequest.ServiceType));
        
        return createdRequest;
    }

    public async Task<int> DeleteRequestAsync(Guid requestId)
    {
        int deletedCount = await _requestRepository.DeleteRequestAsync(requestId);
        
        await _publishEndpoint.Publish(new RequestDeleted(requestId));
        
        return deletedCount;
    }

    public async Task<Request?> UpdateRequestAsync(UpdateRequestDto request)
    {
        Request? updatedRequest = await _requestRepository.UpdateRequestAsync(request);

        if (updatedRequest != null)
        {
            await _publishEndpoint.Publish(new RequestUpdated(updatedRequest.Id));
        }
        
        return updatedRequest;
    }
    
    public async Task<Request?> UpdateRequestStatusAsync(Guid requestId, string status)
    {
        Request? req = await _requestRepository.GetRequestByIdAsync(requestId);

        if (req == null) return null;
        
        var updated = new UpdateRequestDto()
        {
            Id = req.Id,
            CustomerId = req.CustomerId,
            ServiceType = req.ServiceType,
            CustomerLatitude = req.CustomerLatitude,
            CustomerLongitude = req.CustomerLongitude,
            Description = req.Description,
            Status = status
        };
            
        req.Status = status;
        await _requestRepository.UpdateRequestAsync(updated);

        return req;
    }
}