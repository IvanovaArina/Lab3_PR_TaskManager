
using Microsoft.EntityFrameworkCore;
using TaskManager.Data;
using TaskManager.Models;

namespace TaskManager.Repositories
{
    public class NpgTaskRepository : ITaskRepository
    {
        private readonly TaskDbContext dbContext;

        public NpgTaskRepository(TaskDbContext dbContext)
        {
            this.dbContext = dbContext;
        }

        public async Task<Models.Domain.Task> CreateAsync(Models.Domain.Task task)
        {
            await dbContext.AddAsync(task);
            await dbContext.SaveChangesAsync();
            return task;
        }

        public async Task<Models.Domain.Task?> DeleteAsync(Guid id)
        {
            var existingTask = await dbContext.Tasks.FirstOrDefaultAsync(x => x.Id == id);
            if (existingTask == null)
            {
                return null;
            }

            dbContext.Tasks.Remove(existingTask);
            await dbContext.SaveChangesAsync();
            return existingTask;    
        }

        public async Task<IEnumerable<Models.Domain.Task>> GetAllAsync()
        {
            return await dbContext.Tasks.ToListAsync();
        }

        public async Task<Models.Domain.Task?> GetByIdAsync(Guid id)
        {
            return await dbContext.Tasks.FirstOrDefaultAsync(x => x.Id == id);   
        }

        public async Task<Models.Domain.Task?> UpdateAsync(Guid id, Models.Domain.Task task)
        {
            var existingTask = await dbContext.Tasks.FirstOrDefaultAsync(x => x.Id == id);

            if (existingTask == null)
            {
                return null;
            }

            existingTask.Title = task.Title;
            existingTask.Description = task.Description;
            existingTask.IsCompleted = task.IsCompleted;

            await dbContext.SaveChangesAsync();
            return existingTask;
        }
    }
}
