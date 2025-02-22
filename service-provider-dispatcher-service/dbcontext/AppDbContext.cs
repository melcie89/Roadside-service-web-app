using Microsoft.EntityFrameworkCore;
using service_provider_dispatcher_service.data;

namespace service_provider_dispatcher_service.dbcontext;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options)
    {
    }

    public DbSet<data.ServiceProvider> ServiceProviders { get; set; }
    public DbSet<data.ServiceProviderAssignment> Assignments { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<data.ServiceProvider>().HasKey(sp => sp.Id);
        
        modelBuilder.Entity<ServiceProviderAssignment>().HasKey(sp => sp.Id);
        
        modelBuilder.Entity<ServiceProviderAssignment>()
            .HasOne(sa => sa.ServiceProvider)
            .WithMany(sp => sp.Assignments)
            .HasForeignKey(sa => sa.ServiceProviderId);

        modelBuilder.Entity<data.ServiceProvider>().HasData(
            new data.ServiceProvider { Id = new Guid("1ea33fc5-696b-4433-b69c-085bf6629d9b"), Name = "QuickFix Roadside Assistance", Email = "support@quickfixroadside.com", Phone = "(555) 123-4567", Website = "www.quickfixroadside.com", Latitude = 34.052235, Longitude = -118.243683 },
            new data.ServiceProvider { Id = new Guid("bf6f3846-3f05-4c0b-82b6-55a6df672efd"), Name = "SafeDrive Rescue", Email = "help@safedriverescue.net", Phone = "(555) 234-5678", Website = "www.safedriverescue.net", Latitude = 40.712776, Longitude = -74.005974 },
            new data.ServiceProvider { Id = new Guid("a5d33c08-231e-4702-932a-6910f319ce28"), Name = "RoadGuard Pros", Email = "info@roadguardpros.com", Phone = "(555) 345-6789", Website = "www.roadguardpros.com", Latitude = 41.878113, Longitude = -87.629799 },
            new data.ServiceProvider { Id = new Guid("f0a06bb2-d82d-415e-b85c-76c083f5fe07"), Name = "SpeedyTowing & Recovery", Email = "contact@speedyrecovery.us", Phone = "(555) 456-7890", Website = "www.speedyrecovery.us", Latitude = 29.760427, Longitude = -95.369804 },
            new data.ServiceProvider { Id = new Guid("b4ff1da6-2750-4adf-ab05-62cfa489b494"), Name = "24/7 Roadside Heroes", Email = "service@roadsideheroes247.com", Phone = "(555) 567-8901", Website = "www.roadsideheroes247.com", Latitude = 33.448376, Longitude = -112.074036 },
            new data.ServiceProvider { Id = new Guid("4bfd0f5b-7919-4463-ae9b-f3473474b092"), Name = "Nationwide Auto Rescue", Email = "support@nationwideautorescue.org", Phone = "(555) 678-9012", Website = "www.nationwideautorescue.org", Latitude = 39.952583, Longitude = -75.165222 },
            new data.ServiceProvider { Id = new Guid("3dd2ff4a-dbed-4c47-bc10-0c8195f51504"), Name = "FastLane Assistance", Email = "help@fastlaneassist.com", Phone = "(555) 789-0123", Website = "www.fastlaneassist.com", Latitude = 32.715738, Longitude = -117.161084 },
            new data.ServiceProvider { Id = new Guid("78736ca9-6ab5-424b-af4f-e06720111f2d"), Name = "Reliable Roadside Solutions", Email = "info@reliableroadside.com", Phone = "(555) 890-1234", Website = "www.reliableroadside.com", Latitude = 36.169941, Longitude = -115.139830 },
            new data.ServiceProvider { Id = new Guid("b91fc238-1f2d-4af5-be83-c8153cb40027"), Name = "Emergency Tow & Go", Email = "support@emergencytowandgo.com", Phone = "(555) 901-2345", Website = "www.emergencytowandgo.com", Latitude = 37.774929, Longitude = -122.419416 },
            new data.ServiceProvider { Id = new Guid("3eb20c15-3d25-4146-8321-fae8fd593ca1"), Name = "AllStar Roadside Aid", Email = "contact@allstarroadsideaid.com", Phone = "(555) 012-3456", Website = "www.allstarroadsideaid.com", Latitude = 30.267153, Longitude = -97.743061 }
            );
    }
}