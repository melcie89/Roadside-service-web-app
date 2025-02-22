using MongoDB.Driver.Linq;
using notification_service.dbContext;
using notification_service.Entities;
using notification_service.Interfaces;

namespace notification_service.Repositories;

public class PostgresNotificationRepository(AppDbContext dbContext) : INotificationRepository
{
    public async Task<Notification> CreateAsync(Notification notification)
    {
        notification.Id = Guid.NewGuid();
        notification.CreatedAt = DateTime.UtcNow;
        dbContext.Notifications.Add(notification);
        await dbContext.SaveChangesAsync();
        return notification;
    }

    public async Task<Notification?> GetByIdAsync(Guid id)
    {
        return await dbContext.Notifications.FindAsync(id);
    }

    public async Task<IEnumerable<Notification>> GetUserNotificationsAsync(string userId, bool unreadOnly)
    {
        return await dbContext.Notifications.Where(n => n.UserId == userId).ToListAsync();
    }

    public async Task<Notification> UpdateAsync(Notification notification)
    {
        dbContext.Notifications.Update(notification);
        await dbContext.SaveChangesAsync();
        return notification;
    }

    public async Task DeleteAsync(Guid id)
    {
        dbContext.Notifications.Remove(new Notification { Id = id });
        await  dbContext.SaveChangesAsync();
    }
}