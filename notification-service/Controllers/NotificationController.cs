using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using notification_service.DTOs;
using notification_service.Interfaces;

namespace notification_service.Controllers;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class NotificationsController : ControllerBase
{
    private readonly INotificationService _notificationService;
    private readonly ILogger<NotificationsController> _logger;

    public NotificationsController(
        INotificationService notificationService,
        ILogger<NotificationsController> logger)
    {
        _notificationService = notificationService;
        _logger = logger;
    }

    [HttpPost]
    public async Task<ActionResult<NotificationResponseDto>> CreateNotification(
        [FromBody] CreateNotificationDto createDto)
    {
        try
        {
            var result = await _notificationService.CreateNotificationAsync(createDto);
            return CreatedAtAction(nameof(GetNotificationById), new { id = result.Id }, result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error creating notification");
            return StatusCode(500, "An error occurred while creating the notification");
        }
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<NotificationResponseDto>> GetNotificationById(Guid id)
    {
        try
        {
            var notification = await _notificationService.GetNotificationByIdAsync(id);
            if (notification == null)
            {
                return NotFound();
            }
            return Ok(notification);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving notification {NotificationId}", id);
            return StatusCode(500, "An error occurred while retrieving the notification");
        }
    }

    [HttpGet("user/{userId}")]
    public async Task<ActionResult<IEnumerable<NotificationResponseDto>>> GetUserNotifications(
        string userId, 
        [FromQuery] bool unreadOnly = false)
    {
        try
        {
            var notifications = await _notificationService.GetUserNotificationsAsync(userId, unreadOnly);
            return Ok(notifications);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error retrieving notifications for user {UserId}", userId);
            return StatusCode(500, "An error occurred while retrieving notifications");
        }
    }

    [HttpPut("status")]
    public async Task<ActionResult<NotificationResponseDto>> UpdateNotificationStatus(
        [FromBody] UpdateNotificationStatusDto updateDto)
    {
        try
        {
            var result = await _notificationService.UpdateNotificationStatusAsync(updateDto);
            return Ok(result);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error updating notification status {NotificationId}", updateDto.NotificationId);
            return StatusCode(500, "An error occurred while updating the notification status");
        }
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteNotification(Guid id)
    {
        try
        {
            var result = await _notificationService.DeleteNotificationAsync(id);
            if (!result)
            {
                return NotFound();
            }
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "Error deleting notification {NotificationId}", id);
            return StatusCode(500, "An error occurred while deleting the notification");
        }
    }
}