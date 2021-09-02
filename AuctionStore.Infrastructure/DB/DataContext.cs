using AuctionStore.Infrastructure.Models;
using Microsoft.EntityFrameworkCore;

namespace AuctionStore.Infrastructure.DB
{
    public class DataContext : DbContext
    {
        public DataContext()
        {

        }

        public DataContext(DbContextOptions<DataContext> options) : base(options)
        {

        }

        public DbSet<User> Users { get; set; }
        public DbSet<UserRoles> UserRoles { get; set; }
        public DbSet<Role> Roles { get; set; }
        public DbSet<UserToken> UserTokens { get; set; }
        public DbSet<UserTemporaryPassword> UserTemporaryPasswords { get; set; }
        public DbSet<Category> Categories { get; set; }
        public DbSet<SubCategory> Subcategories { get; set; }
        public DbSet<BannedWord> BannedWords { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<UserRoles>(entity =>
            {
                entity.HasKey(x => new { x.RoleId, x.UserId });
            });

            modelBuilder.Entity<Category>().HasMany(x => x.SubCategories).WithOne(x => x.Category).OnDelete(DeleteBehavior.Cascade);
        }
    }
}
