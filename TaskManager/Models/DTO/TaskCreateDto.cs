using System.ComponentModel.DataAnnotations;

namespace TaskManager.Models.DTO
{
    public class TaskCreateDto
    {
        [Required]
        [MaxLength(100, ErrorMessage = "Title has to be maximum 100 characters")]
        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }
    }
}
