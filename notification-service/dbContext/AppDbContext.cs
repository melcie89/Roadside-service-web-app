using Microsoft.EntityFrameworkCore;
using notification_service.Entities;

namespace notification_service.dbContext;

public class AppDbContext(DbContextOptions<AppDbContext> options) : DbContext(options)
{
    public DbSet<Notification> Notifications { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Notification>().HasKey(r => r.Id);
        
        modelBuilder.Entity<Notification>()
            .Property(e => e.CreatedAt)
            .HasConversion(
                v => v.ToUniversalTime(),
                v => DateTime.SpecifyKind(v, DateTimeKind.Utc));
    }
}