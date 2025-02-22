namespace shared.Events;

public class RequestCreated (Guid requestId, Guid clientId, double latitude, double longitude, string serviceType)
{
    public Guid Id { get; set; } = Guid.NewGuid();
    public Guid RequestId { get; set; } = requestId;
    public Guid ClientId { get; set; } = clientId;
    public double Latitude { get; set; } = latitude;
    public double Longitude { get; set; } = longitude;
    public string ServiceType { get; set; } = serviceType;
}