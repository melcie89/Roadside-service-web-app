using Microsoft.Extensions.Options;
using MongoDB.Driver;
using notification_service.Config;
using notification_service.Entities;
using notification_service.Interfaces;

namespace notification_service.Repositories;

public class MongoNotificationRepository : INotificationRepository
{
    private readonly IMongoCollection<Notification> _notifications;

    public MongoNotificationRepository(IOptions<MongoDbSettings> settings)
    {
        var client = new MongoClient(settings.Value.ConnectionString);
        var database = client.GetDatabase(settings.Value.DatabaseName);
        _notifications = database.GetCollection<Notification>(settings.Value.CollectionName);
    }

    public async Task<Notification> CreateAsync(Notification notification)
    {
        notification.Id = Guid.NewGuid();
        notification.CreatedAt = DateTime.UtcNow;
        await _notifications.InsertOneAsync(notification);
        return notification;
    }

    public async Task<Notification> GetByIdAsync(Guid id)
    {
        var filter = Builders<Notification>.Filter.Eq(n => n.Id, id);
        return await _notifications.Find(filter).FirstOrDefaultAsync();
    }

    public async Task<IEnumerable<Notification>> GetUserNotificationsAsync(string userId, bool unreadOnly)
    {
        var filterBuilder = Builders<Notification>.Filter;
        var filter = filterBuilder.Eq(n => n.UserId, userId);
        
        if (unreadOnly)
        {
            filter &= filterBuilder.Eq(n => n.IsRead, false);
        }

        return await _notifications
            .Find(filter)
            .SortByDescending(n => n.CreatedAt)
            .ToListAsync();
    }

    public async Task<Notification> UpdateAsync(Notification notification)
    {
        var filter = Builders<Notification>.Filter.Eq(n => n.Id, notification.Id);
        await _notifications.ReplaceOneAsync(filter, notification);
        return notification;
    }

    public async Task<bool> DeleteAsync(Guid id)
    {
        var filter = Builders<Notification>.Filter.Eq(n => n.Id, id);
        var result = await _notifications.DeleteOneAsync(filter);
        return result.DeletedCount > 0;
    }
}