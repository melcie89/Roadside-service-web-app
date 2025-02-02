using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Mvc;
using notification_service.Config;
using notification_service.Controllers;
using notification_service.DTOs;
using notification_service.Interfaces;
using notification_service.Repositories;
using notification_service.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddSingleton(FirebaseApp.Create(new AppOptions()
{
    Credential = GoogleCredential.FromFile("./config/roadside-service-web-app-firebase-adminsdk-fbsvc-cc36c391bf.json"),
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

app.MapPost("/api/notificatons", async (
    INotificationService notificationService, 
    ILogger<NotificationsController> logger, 
    [FromBody] CreateNotificationDto createDto) =>
{
    try
    {
        var result = await notificationService.CreateNotificationAsync(createDto);
        return Results.Ok(result);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Error creating notification");
        return Results.Problem("An error occurred while creating the notification");
    }
});

app.MapGet("/api/notifications/{id}", async (
    INotificationService notificationService, 
    ILogger<NotificationsController> logger,
    Guid id) =>
{
    try
    {
        var notification = await notificationService.GetNotificationByIdAsync(id);
        return Results.Ok(notification);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Error retrieving notification {NotificationId}", id);
        return Results.Problem("An error occurred while retrieving the notification");
    }
});

app.MapGet("/api/notifications/user/{userId}", async (
    INotificationService notificationService, 
    ILogger<NotificationsController> logger, 
    string userId, 
    [FromQuery] bool unreadOnly = false) =>
{
    try
    {
        var notifications = await notificationService.GetUserNotificationsAsync(userId, unreadOnly);
        return Results.Ok(notifications);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Error retrieving notifications for user {UserId}", userId);
        return Results.Problem( "An error occurred while retrieving notifications");
    }
});

app.MapPut("/api/notifications", async (
    INotificationService notificationService, 
    ILogger<NotificationsController> logger,
    [FromBody] UpdateNotificationStatusDto updateDto) =>
{
    try
    {
        var result = await notificationService.UpdateNotificationStatusAsync(updateDto);
        return Results.Ok(result);
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Error updating notification status {NotificationId}", updateDto.NotificationId);
        return Results.Problem("An error occurred while updating the notification status");
    }
});

app.MapDelete("/api/notifications/{id}", async ( 
    INotificationService notificationService, 
    ILogger<NotificationsController> logger, 
    Guid id) =>
{
    try
    {
        var result = await notificationService.DeleteNotificationAsync(id);
        return !result ? Results.NotFound() : Results.NoContent();
    }
    catch (Exception ex)
    {
        logger.LogError(ex, "Error deleting notification {NotificationId}", id);
        return Results.Problem("An error occurred while deleting the notification");
    }
});

app.UseHttpsRedirection();

app.Run();