using notification_service.Entities;

namespace notification_service.Interfaces;

public interface INotificationSender
{
    Task SendPushNotificationAsync(Notification notification);
}