namespace service_provider_dispatcher_service.data;

public class ServiceProvider
{
    public Guid Id { get; set; }
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Website { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
    
    public List<ServiceProviderAssignment> Assignments { get; set; } = new List<ServiceProviderAssignment>();
}

public class ServiceProviderDto
{
    public string Name { get; set; }
    public string Email { get; set; }
    public string Phone { get; set; }
    public string Website { get; set; }
    public double Latitude { get; set; }
    public double Longitude { get; set; }
}