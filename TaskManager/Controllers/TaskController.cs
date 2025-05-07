using Microsoft.AspNetCore.Mvc;
using AutoMapper;
using TaskManager.Repositories;
using TaskManager.Models.DTO;

namespace TaskManager.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TaskController : ControllerBase
    {
        private readonly IMapper mapper;
        private readonly ITaskRepository taskRepository;

        public TaskController(ITaskRepository taskRepository, IMapper mapper)
        {
            this.taskRepository = taskRepository;
            this.mapper = mapper;
        }
        
        //Get All Tasks
        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var tasksDomain = await taskRepository.GetAllAsync();

            var tasksDto = mapper.Map<IEnumerable<TaskDto>>(tasksDomain);
            return Ok(tasksDto);
        }

        //Get Single Task 
        [HttpGet]
        [Route("{id:Guid}")]
        public async Task<IActionResult> GetById([FromRoute] Guid id)
        {
            var taskDomain = await taskRepository.GetByIdAsync(id);

            if (taskDomain == null)
            {
                return NotFound();
            }

            var taskDto = mapper.Map<TaskDto>(taskDomain);
            return Ok(taskDto);
        }

        //Post Task
        [HttpPost]
        public async Task<IActionResult> Create([FromBody] TaskCreateDto taskCreateDto)
        {
            var taskDomain = mapper.Map<Models.Domain.Task>(taskCreateDto);
            taskDomain = await taskRepository.CreateAsync(taskDomain);

            var taskDto = mapper.Map<TaskDto>(taskDomain);
            return CreatedAtAction(nameof(GetById), new { id = taskDto.Id }, taskDto);

        }

        //Update Task
        [HttpPut]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Update([FromRoute] Guid id, [FromBody] TaskUpdateDto taskUpdateDto)
        {
            var taskDomain = mapper.Map<Models.Domain.Task>(taskUpdateDto);
            taskDomain = await taskRepository.UpdateAsync(id, taskDomain);

            if (taskDomain == null)
            {
                return NotFound();
            }

            var taskDto = mapper.Map<TaskDto>(taskDomain);

            return Ok(taskDto);
        }

        [HttpDelete]
        [Route("{id:Guid}")]
        public async Task<IActionResult> Delete([FromRoute] Guid id)
        {
            var taskDomain = await taskRepository.DeleteAsync(id);
            if (taskDomain == null)
            {
                return NotFound();
            }

            var taskDto = mapper.Map<TaskDto>(taskDomain);
            return Ok(taskDto);
        }
    }
}