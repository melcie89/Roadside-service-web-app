namespace shared.Events;

public class ServiceProviderAssigned
{
    public Guid RequesterId { get; set; }
    public Guid ServiceProviderId { get; set; }
}