namespace request_service.Events;

public class RequestUpdated(Guid requestId)
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid RequestId { get; set; } = requestId;
}