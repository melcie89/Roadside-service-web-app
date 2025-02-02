using Microsoft.EntityFrameworkCore;
using request_service.DbContext;
using request_service.Models;

namespace request_service.Repositories;

public class RequestRepository : IRequestRepository
{
    private readonly AppDbContext _context;

    public RequestRepository(AppDbContext context)
    {
        _context = context;
    }

    public async Task<ICollection<Request>?> GetCustomerRequestsAsync(Guid customerId)
    {
        return await _context.Requests.Where(r=> r.CustomerId == customerId).ToListAsync();
    }

    public async Task<Request> CreateRequestAsync(Request request)
    {
        request.CreatedAt = DateTime.Now;
        request.UpdatedAt = DateTime.Now;
        
        _context.Requests.Add(request);
        
        await _context.SaveChangesAsync();
        
        return request;
    }

    public async Task<Request?> GetRequestByIdAsync(Guid id)
    {
        return  await _context.Requests.FindAsync(id);
    }
    
    public async Task<int> DeleteRequestAsync(Guid requestId)
    {
        return await _context.Requests.Where(r => r.Id == requestId).ExecuteDeleteAsync();
    }

    public async Task<Request?> UpdateRequestAsync(UpdateRequestDto request)
    {
        var existingRequest = await _context.Requests.FindAsync(request.Id);

        if (existingRequest == null) return null;
        
        existingRequest.ServiceType = request.ServiceType;
        existingRequest.CustomerLatitude = request.CustomerLatitude;
        existingRequest.CustomerLongitude = request.CustomerLongitude;
        existingRequest.Description = request.Description;
        existingRequest.UpdatedAt = DateTime.UtcNow; 

        await _context.SaveChangesAsync();

        return existingRequest;
    }
}