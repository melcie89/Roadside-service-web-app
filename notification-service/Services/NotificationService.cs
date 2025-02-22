using notification_service.dbContext;
using notification_service.DTOs;
using notification_service.Entities;
using notification_service.Interfaces;

namespace notification_service.Services;

public class NotificationService(
    INotificationRepository repository,
    AppDbContext dbContext,
    ILogger<NotificationService> logger) : INotificationService
{
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

                var created = await repository.CreateAsync(notification);

                return MapToResponseDto(created);
            }
            catch (Exception ex)
            {
                logger.LogError(ex, "Error creating notification");
                throw;
            }
        }

        public async Task<NotificationResponseDto?> GetNotificationByIdAsync(Guid id)
        {
            var notification = await repository.GetByIdAsync(id);

            return notification == null ? null : MapToResponseDto(notification);
        }

        public async Task<IEnumerable<NotificationResponseDto>> GetUserNotificationsAsync(string userId, bool unreadOnly = false)
        {
            var notifications = await repository.GetUserNotificationsAsync(userId, unreadOnly);
            return notifications.Select(MapToResponseDto);
        }

        public async Task<NotificationResponseDto?> UpdateNotificationStatusAsync(UpdateNotificationStatusDto updateDto)
        {
            var notification = await repository.GetByIdAsync(updateDto.NotificationId);

            if (notification == null) return null;
            
            notification.Status = updateDto.NewStatus;
            
            if (updateDto.NewStatus == NotificationStatus.Read)
            {
                notification.ReadAt = DateTime.UtcNow;
            }

            var updated = await repository.UpdateAsync(notification);
            
            return MapToResponseDto(updated);
        }

        public async Task DeleteNotificationAsync(Guid id)
        {
            await repository.DeleteAsync(id);
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