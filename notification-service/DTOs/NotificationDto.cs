using notification_service.Entities;

namespace notification_service.DTOs;

public record CreateNotificationDto
{
    public string UserId { get; init; }
    public string Title { get; init; }
    public string Message { get; init; }
    public NotificationType Type { get; init; }
    public NotificationPriority Priority { get; init; }
    public string? Data { get; init; }
}

public record NotificationResponseDto
{
    public Guid Id { get; init; }
    public string Title { get; init; }
    public string Message { get; init; }
    public NotificationType Type { get; init; }
    public NotificationStatus Status { get; init; }
    public DateTime CreatedAt { get; init; }
    public DateTime? ReadAt { get; init; }
}

public record UpdateNotificationStatusDto
{
    public Guid NotificationId { get; init; }
    public NotificationStatus NewStatus { get; init; }
}