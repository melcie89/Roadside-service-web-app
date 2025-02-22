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
    }
}