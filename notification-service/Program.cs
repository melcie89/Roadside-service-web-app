using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using notification_service.Config;
using notification_service.Interfaces;
using notification_service.Repositories;
using notification_service.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton(FirebaseApp.Create(new AppOptions 
{
    Credential = GoogleCredential.FromFile("path-to-firebase-config.json")
}));

builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDb:NotificationsDatabase"));

builder.Services.AddSingleton<INotificationRepository, MongoNotificationRepository>();
builder.Services.AddSingleton<INotificationService, NotificationService>();
builder.Services.AddSingleton<INotificationSender, FirebaseNotificationSender>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.MapGet("/health", () => "healthy")
    .WithName("Health")
    .WithOpenApi();

app.Run();