namespace notification_service.Entities;

public class Notification
{
    public Guid Id { get; set; }
    public string UserId { get; set; }
    public string Title { get; set; }
    public string Message { get; set; }
    public NotificationType Type { get; set; }
    public NotificationStatus Status { get; set; }
    public NotificationPriority Priority { get; set; }
    public string? Data { get; set; }
    public DateTime CreatedAt { get; set; }
    public DateTime? ReadAt { get; set; }
    public DateTime? SentAt { get; set; }
    public bool IsRead { get; set; }
}