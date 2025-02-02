using request_service.Models;

namespace request_service.Repositories;

public interface IRequestRepository
{
    Task<Request?> GetRequestByIdAsync(Guid id);
    Task<ICollection<Request>?> GetCustomerRequestsAsync(Guid customerId);
    Task<Request> CreateRequestAsync(Request request);
    Task<int> DeleteRequestAsync(Guid requestId);
    Task<Request?> UpdateRequestAsync(UpdateRequestDto request);
}