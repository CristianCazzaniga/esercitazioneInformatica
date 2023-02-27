using BulkyBook.Models;
using BulkyBook.Models.Models;
using Microsoft.EntityFrameworkCore;

namespace BulkyBook.DataAccess;
public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
    {
    }
    public DbSet<Category> Categories { get; set; }
    public DbSet<CoverType> CoverTypes { get; set; } = null!;
    public DbSet<Product> Products { get; set; } = null!;
}
