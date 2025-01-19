using FirebaseAdmin;
using FirebaseAdmin.Messaging;
using notification_service.Interfaces;
using Notification = notification_service.Entities.Notification;
using NotificationPriority = notification_service.Entities.NotificationPriority;

namespace notification_service.Services;

public class FirebaseNotificationSender : INotificationSender
    {
        private readonly FirebaseMessaging _messaging;
        private readonly ILogger<FirebaseNotificationSender> _logger;

        public FirebaseNotificationSender(FirebaseApp app, ILogger<FirebaseNotificationSender> logger)
        {
            _messaging = FirebaseMessaging.GetMessaging(app);
            _logger = logger;
        }

        public async Task SendPushNotificationAsync(Notification notification)
        {
            try
            {
                var message = new Message
                {
                    Token = notification.UserId, // Assuming UserId is the FCM token
                    Notification = new FirebaseAdmin.Messaging.Notification
                    {
                        Title = notification.Title,
                        Body = notification.Message
                    },
                    Data = new Dictionary<string, string>
                    {
                        { "type", notification.Type.ToString() },
                        { "id", notification.Id.ToString() }
                    },
                    Android = new AndroidConfig
                    {
                        Priority = notification.Priority == NotificationPriority.High ? Priority.High : Priority.Normal
                    },
                    Apns = new ApnsConfig
                    {
                        Headers = new Dictionary<string, string>
                        {
                            { "apns-priority", notification.Priority == NotificationPriority.High ? "10" : "5" }
                        }
                    }
                };

                string result = await _messaging.SendAsync(message);
                _logger.LogInformation("Successfully sent notification {NotificationId}. Result: {Result}", 
                    notification.Id, result);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error sending push notification {NotificationId}", notification.Id);
                throw;
            }
        }
    }