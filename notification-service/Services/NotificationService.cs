using notification_service.DTOs;
using notification_service.Entities;
using notification_service.Interfaces;

namespace notification_service.Services;

public class NotificationService : INotificationService
    {
        private readonly INotificationRepository _repository;
        private readonly INotificationSender _sender;
        private readonly ILogger<NotificationService> _logger;

        public NotificationService(
            INotificationRepository repository,
            INotificationSender sender,
            ILogger<NotificationService> logger)
        {
            _repository = repository;
            _sender = sender;
            _logger = logger;
        }

        public async Task<NotificationResponseDto> CreateNotificationAsync(CreateNotificationDto notificationDto)
        {
            try
            {
                var notification = new Notification
                {
                    Id = Guid.NewGuid(),
                    UserId = notificationDto.UserId,
                    Title = notificationDto.Title,
                    Message = notificationDto.Message,
                    Type = notificationDto.Type,
                    Priority = notificationDto.Priority,
                    Data = notificationDto.Data,
                    Status = NotificationStatus.Pending,
                    CreatedAt = DateTime.UtcNow
                };

                var created = await _repository.CreateAsync(notification);
                
                // Send push notification
                try
                {
                    await _sender.SendPushNotificationAsync(created);
                    created.Status = NotificationStatus.Sent;
                    created.SentAt = DateTime.UtcNow;
                    await _repository.UpdateAsync(created);
                }
                catch (Exception ex)
                {
                    _logger.LogError(ex, "Failed to send push notification for notification ID: {NotificationId}", created.Id);
                    created.Status = NotificationStatus.Failed;
                    await _repository.UpdateAsync(created);
                }

                return MapToResponseDto(created);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating notification");
                throw;
            }
        }

        public async Task<NotificationResponseDto> GetNotificationByIdAsync(Guid id)
        {
            var notification = await _repository.GetByIdAsync(id);
            return MapToResponseDto(notification);
        }

        public async Task<IEnumerable<NotificationResponseDto>> GetUserNotificationsAsync(string userId, bool unreadOnly = false)
        {
            var notifications = await _repository.GetUserNotificationsAsync(userId, unreadOnly);
            return notifications.Select(MapToResponseDto);
        }

        public async Task<NotificationResponseDto> UpdateNotificationStatusAsync(UpdateNotificationStatusDto updateDto)
        {
            var notification = await _repository.GetByIdAsync(updateDto.NotificationId);
            
            notification.Status = updateDto.NewStatus;
            if (updateDto.NewStatus == NotificationStatus.Read)
            {
                notification.ReadAt = DateTime.UtcNow;
            }

            var updated = await _repository.UpdateAsync(notification);
            return MapToResponseDto(updated);
        }

        public async Task<bool> DeleteNotificationAsync(Guid id)
        {
            return await _repository.DeleteAsync(id);
        }

        private static NotificationResponseDto MapToResponseDto(Notification notification)
        {
            return new NotificationResponseDto
            {
                Id = notification.Id,
                Title = notification.Title,
                Message = notification.Message,
                Type = notification.Type,
                Status = notification.Status,
                CreatedAt = notification.CreatedAt,
                ReadAt = notification.ReadAt
            };
        }
    }