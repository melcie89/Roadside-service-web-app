namespace request_service.Models;

public class CreateRequestDto
{
    public Guid CustomerId { get; set; }
    public string ServiceType { get; set; }
    public double CustomerLatitude { get; set; }
    public double CustomerLongitude { get; set; }
    public string Description { get; set; }
}