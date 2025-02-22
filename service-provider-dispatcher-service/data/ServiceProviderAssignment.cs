namespace service_provider_dispatcher_service.data;

public class ServiceProviderAssignment
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid RequestId { get; set; } 
    public Guid ServiceProviderId { get; set; }
    public DateTime AssignmentDate { get; set; } = DateTime.UtcNow;
    public ServiceProvider ServiceProvider { get; set; }
}