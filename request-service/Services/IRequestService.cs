using request_service.Models;

namespace request_service.Services;

public interface IRequestService
{
    Task<Request?> GetRequestAsync(Guid requestId);
    Task<ICollection<Request>?> GetCustomerRequestsAsync(Guid customerId);
    Task<Request> CreateRequestAsync(CreateRequestDto request);
    Task<int> DeleteRequestAsync(Guid requestId);
    Task<Request?> UpdateRequestAsync(UpdateRequestDto request);
    Task<Request?> UpdateRequestStatusAsync(Guid requestId, Guid serviceProviderId);
}