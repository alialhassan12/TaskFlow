using backend.DTOs;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controller;

[ApiController]
[Route("api/projects")]
public class ProjectController : ControllerBase
{
    private readonly IProjectService _projectService;
    public ProjectController(IProjectService projectService)
    {
        _projectService = projectService;
    }

    [Authorize(Roles = "User")]
    [HttpPost("create")]
    public async Task<IActionResult> CreateProject(CreateProjectDto dto)
    {
        var result = await _projectService.CreateProject(dto);
        if (!result.Success)
        {
            return BadRequest(new
            {
                message = result.Message ?? "Failed to create project"
            });
        }
        return Ok(result);
    }

    [Authorize(Roles = "User")]
    [HttpGet("my-projects/{userId}")]
    public async Task<IActionResult> GetMyProjects(Guid userId)
    {
        var result = await _projectService.GetMyProjects(userId);
        if (!result.Success)
        {
            return BadRequest(new
            {
                message = result.Message ?? "Failed to fetch projects"
            });
        }
        return Ok(result);
    }

    [Authorize(Roles = "User")]
    [HttpDelete("delete/{projectId}/{userId}")]
    public async Task<IActionResult> DeleteProject(Guid projectId, Guid userId)
    {
        var result = await _projectService.DeleteProject(projectId, userId);
        if (!result.Success)
        {
            return BadRequest(new
            {
                message = result.Message ?? "Failed to delete project"
            });
        }
        return Ok(result);
    }
}