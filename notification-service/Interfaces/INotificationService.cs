using notification_service.DTOs;

namespace notification_service.Interfaces;

public interface INotificationService
{
    Task<NotificationResponseDto> CreateNotificationAsync(CreateNotificationDto notification);
    Task<NotificationResponseDto> GetNotificationByIdAsync(Guid id);
    Task<IEnumerable<NotificationResponseDto>> GetUserNotificationsAsync(string userId, bool unreadOnly = false);
    Task<NotificationResponseDto> UpdateNotificationStatusAsync(UpdateNotificationStatusDto updateDto);
    Task<bool> DeleteNotificationAsync(Guid id);
}