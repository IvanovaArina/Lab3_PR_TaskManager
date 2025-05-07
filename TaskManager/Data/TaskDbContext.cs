using Microsoft.EntityFrameworkCore;

namespace TaskManager.Data
{
    public class TaskDbContext : DbContext
    {
        public TaskDbContext(DbContextOptions<TaskDbContext> options)
            : base(options)
        {
            
        }

        public DbSet<Models.Domain.Task> Tasks { get; set; }
    }
}
