namespace TaskManager.Repositories
{
    public interface ITaskRepository
    {
        Task<IEnumerable<Models.Domain.Task>> GetAllAsync();
        Task<Models.Domain.Task?> GetByIdAsync(Guid id);
        Task<Models.Domain.Task> CreateAsync(Models.Domain.Task task);
        Task<Models.Domain.Task?> UpdateAsync(Guid id, Models.Domain.Task task);
        Task<Models.Domain.Task?> DeleteAsync(Guid id);
    }
}
