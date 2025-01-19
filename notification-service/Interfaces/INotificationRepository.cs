using notification_service.Entities;

namespace notification_service.Interfaces;

public interface INotificationRepository
{
    Task<Notification> CreateAsync(Notification notification);
    Task<Notification> GetByIdAsync(Guid id);
    Task<IEnumerable<Notification>> GetUserNotificationsAsync(string userId, bool unreadOnly);
    Task<Notification> UpdateAsync(Notification notification);
    Task<bool> DeleteAsync(Guid id);
}