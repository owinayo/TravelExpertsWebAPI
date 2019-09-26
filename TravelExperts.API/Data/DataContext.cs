using Microsoft.EntityFrameworkCore;
using TravelExperts.API.Models;

namespace TravelExperts.API.Data
{
    public class DataContext : DbContext
    {
       public DataContext(DbContextOptions<DataContext> options) : base (options) {}
       
       public DbSet<Value> Values { get; set; }
    }
}