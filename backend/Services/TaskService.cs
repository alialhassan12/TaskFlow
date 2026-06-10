using Azure;
using backend.Data;
using backend.DTOs;
using backend.Interfaces;

namespace backend.Services;

public class TaskService : ITaskService
{
    private readonly AppDbContext _context;
    public TaskService(AppDbContext context)
    {
        _context=context;
    }
    public async Task<ResponseDto> CreateTask(CreateTaskDto dto)
    {
        var project=_context.Projects.FirstOrDefault(p=>p.Id==dto.ProjectId);
        if (project == null)
        {
            return new ResponseDto
            {
                Message="Project not found",
                Success=false
            };
        }
        var task =new Models.Task
        {
            ProjectId=project.Id,
            Title=dto.Title,
            Description=dto.Description,
            DueDate=dto.DueDate,
        };
        _context.Tasks.Add(task);
        await _context.SaveChangesAsync();
        return new ResponseDto
        {
            Message="Task created successfully",
            Data=task,
            Success=true
        };
    }

    public async Task<ResponseDto> GetTasks(Guid projectId)
    {
        var tasks=_context.Tasks.Where(t=>t.ProjectId==projectId).ToList();
        return new ResponseDto
        {
            Message="Tasks retrieved successfully",
            Data=tasks,
            Success=true
        };
    }

    public async Task<ResponseDto> MarkTaskAsCompleted(Guid taskId)
    {
        var task=_context.Tasks.FirstOrDefault(t=>t.Id == taskId);
        if(task == null)
        {
            return new ResponseDto
            {
                Message="Task not Found",
                Success=false
            };
        }

        task.IsCompleted=true;
        await _context.SaveChangesAsync();

        return new ResponseDto
        {
            Message="Completed",
            Success=true,
            Data=task
        };
    }

    public async Task<ResponseDto> MarkTaskAsInComplete(Guid taskId)
    {
        var task=_context.Tasks.FirstOrDefault(t=>t.Id == taskId);
        if(task == null)
        {
            return new ResponseDto
            {
                Message="Task not Found",
                Success=false
            };
        }

        task.IsCompleted=false;
        await _context.SaveChangesAsync();

        return new ResponseDto
        {
            Message="In Completed",
            Success=true,
            Data=task
        };
    }
}