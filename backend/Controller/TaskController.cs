using backend.DTOs;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller;

[ApiController]
[Route("/api/tasks")]
public class TaskController : ControllerBase
{
    private readonly ITaskService _taskService;
    public TaskController(ITaskService taskServcie)
    {
        _taskService=taskServcie;
    }

    [Authorize(Roles="User")]
    [HttpPost("/new")]
    public async Task<IActionResult> CreateTask(CreateTaskDto dto)
    {
        var result=await _taskService.CreateTask(dto);
        if (!result.Success)
        {
            return BadRequest(new
            {
                message=result.Message ?? "Failed to create task"
            });
        }
        return Ok(result);
    }

    // [Authorize(Roles ="User")]
    [HttpPost("/mark-completed")]
    public async Task<IActionResult> MarkTaskAsCompleted(Guid taskId)
    {
        var result=await _taskService.MarkTaskAsCompleted(taskId);
        if (!result.Success)
        {
            return BadRequest(new
            {
                message=result.Message ?? "Failed to update task"
            });
        }
        return Ok(result);
    }
    // [Authorize(Roles ="User")]
    [HttpPost("/mark-incompleted")]
    public async Task<IActionResult> MarkTaskAsInComplete(Guid taskId)
    {
        var result=await _taskService.MarkTaskAsInComplete(taskId);
        if (!result.Success)
        {
            return BadRequest(new
            {
                message=result.Message ?? "Failed to update task"
            });
        }
        return Ok(result);
    }

    // [Authorize(Roles="User")]
    [HttpGet("/get")]
    public async Task<IActionResult> GetTasks(Guid projectId)
    {
        var result=await _taskService.GetTasks(projectId);
        if (!result.Success)
        {
            return BadRequest(new
            {
                message=result.Message ?? "Failed to retrieve tasks"
            });
        }
        return Ok(result);
    }
}