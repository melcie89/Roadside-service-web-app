using FirebaseAdmin;
using Google.Apis.Auth.OAuth2;
using Microsoft.AspNetCore.Mvc;
using notification_service.Config;
using notification_service.DTOs;
using notification_service.Interfaces;
using notification_service.Repositories;
using notification_service.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.Configure<MongoDbSettings>(
    builder.Configuration.GetSection("MongoDb:NotificationsDatabase"));

builder.Services.AddSingleton<INotificationRepository, MongoNotificationRepository>();
builder.Services.AddSingleton<INotificationService, NotificationService>();
//builder.Services.AddSingleton<INotificationSender, FirebaseNotificationSender>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.MapGet("/api/notifications/health", () => "healthy")
    .WithName("Health")
    .WithOpenApi();

app.MapGet("/api/notifications/{id}", async (
    INotificationService notificationService, 
    Guid id) =>
{
    try
    {
        var notification = await notificationService.GetNotificationByIdAsync(id);
        return Results.Ok(notification);
    }
    catch (Exception ex)
    {
        return Results.Problem("An error occurred while retrieving the notification");
    }
});

app.MapGet("/api/notifications/user/{userid}", async (
    INotificationService notificationService, 
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
        return Results.Problem("An error occurred while retrieving the notification");
    }
});

app.MapPut("/api/notifications/status", async (
    INotificationService notificationService, 
    [FromBody] UpdateNotificationStatusDto updateDto) =>
{
    try
    {
        var result = await notificationService.UpdateNotificationStatusAsync(updateDto);
        return Results.Ok(result);
    }
    catch (Exception ex)
    {
        return Results.Problem("An error occurred while updating the notification status");
    }
});

app.MapDelete("/api/notifications/{id}", async (
    INotificationService notificationService, 
    Guid id) =>
{
    try
    {
        var result = await notificationService.DeleteNotificationAsync(id);
        return !result ? Results.NotFound() : Results.NoContent();
    }
    catch (Exception ex)
    {
        return Results.Problem("An error occurred while deleting the notification");
    }
});

app.Run();