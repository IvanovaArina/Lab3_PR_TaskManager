using AutoMapper;
using TaskManager.Models.DTO;

namespace TaskManager.Mappings
{
    public class AutoMapperProfiles : Profile
    {
        public AutoMapperProfiles()
        {
            CreateMap<Models.Domain.Task, TaskDto>().ReverseMap();
            CreateMap<Models.Domain.Task, TaskCreateDto>().ReverseMap();
            CreateMap<Models.Domain.Task, TaskUpdateDto >().ReverseMap();
        }

    }
}
