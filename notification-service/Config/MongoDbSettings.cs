namespace notification_service.Config;

public class MongoDbSettings
{
    public string ConnectionString { get; set; } 
    public string DatabaseName { get; set; } 
    public string CollectionName { get; set; }
}