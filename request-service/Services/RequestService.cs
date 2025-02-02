using Microsoft.EntityFrameworkCore;
using request_service.DbContext;
using request_service.Models;
using request_service.Repositories;

namespace request_service.Services;

public class RequestService : IRequestService
{
    private readonly IRequestRepository _requestRepository;

    public RequestService(IRequestRepository requestRepository)
    {
        _requestRepository = requestRepository;
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

        // Publish to message broker
        
        return createdRequest;
    }

    public async Task<int> DeleteRequestAsync(Guid requestId)
    {
        return await _requestRepository.DeleteRequestAsync(requestId);
    }

    public async Task<Request?> UpdateRequestAsync(UpdateRequestDto request)
    {
        return await _requestRepository.UpdateRequestAsync(request);
    }
}