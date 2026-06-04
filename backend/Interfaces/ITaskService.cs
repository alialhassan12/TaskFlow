using backend.DTOs;

namespace backend.Interfaces;

public interface ITaskService
{
    Task<ResponseDto> CreateTask(CreateTaskDto dto);
    Task<ResponseDto> GetTasks(Guid projectId);
    Task<ResponseDto> MarkTaskAsCompleted(Guid taskId);
    Task<ResponseDto> MarkTaskAsInComplete(Guid taskId);
}