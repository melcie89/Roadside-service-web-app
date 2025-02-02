namespace request_service.Models;

public class Request
{
        public Guid Id { get; set; }
        public Guid CustomerId { get; set; }
        public string ServiceType { get; set; }  // e.g., TireChange, JumpStart, Towing
        public double CustomerLatitude { get; set; }
        public double CustomerLongitude { get; set; }
        public string Status { get; set; }  // Pending, AssignedToProvider, InProgress, Completed, Cancelled
        public Guid? ServiceProviderId { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;
        public string Description { get; set; }
}