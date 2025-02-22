namespace shared.Events;

public class RequestCreated
{
    public Guid Id { get; set; }
    public Guid RequestId { get; set; } 
    public Guid ClientId { get; set; } 
    public double Latitude { get; set; } 
    public double Longitude { get; set; } 
    public string ServiceType { get; set; }
}