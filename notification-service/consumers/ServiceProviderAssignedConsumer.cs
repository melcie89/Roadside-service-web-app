using System.Globalization;
using MassTransit;
using notification_service.DTOs;
using notification_service.Entities;
using notification_service.Interfaces;
using Shared.Events;

namespace notification_service.consumers;

public class ServiceProviderAssignedConsumer(INotificationService notificationService) : IConsumer<ServiceProviderAssigned>
{
    public async Task Consume(ConsumeContext<ServiceProviderAssigned> context)
    {
        var assigned = context.Message;
        
        await notificationService.CreateNotificationAsync(new CreateNotificationDto
        {
            UserId = assigned.ClientId.ToString(),
            Message = "Service Provider assigned successfully.!",
            Title = "SUCCESS",
            Type = NotificationType.SystemAlert,
            Priority = NotificationPriority.Normal,
            Data = DateTime.UtcNow.ToString(CultureInfo.InvariantCulture)
        });
    }
}