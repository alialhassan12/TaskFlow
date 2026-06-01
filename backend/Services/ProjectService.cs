using backend.Data;
using backend.DTOs;
using backend.Interfaces;
using backend.Models;

namespace backend.Services;

public class ProjectService : IProjectService
{
    private readonly AppDbContext _context;
    public ProjectService(AppDbContext context)
    {
        _context=context;
    }

    public async Task<ResponseDto> CreateProject(CreateProjectDto dto)
    {
        var user=_context.Users.FirstOrDefault(u=>u.Id==dto.UserId);
        if (user == null)
        {
            return new ResponseDto{
                Message="unauthenticated",
                Success=false
            };
        }
        var project= new Project
        {
            UserId=user.Id,
            ProjectTitle=dto.ProjectTitle,
            Description=dto.Description,
            StartDate=dto.StartDate,
            EndDate=dto.EndDate,
        };
        _context.Projects.Add(project);
        await _context.SaveChangesAsync();

        return new ResponseDto{
            Message="Project created successfully",
            Data=project,
            Success=true
        };
    }

    public async Task<ResponseDto> GetMyProjects(Guid userId)
    {
        var user=_context.Users.FirstOrDefault(u=>u.Id==userId);
        if(user == null)
        {
            return new ResponseDto
            {
                Message="unauthenticated",
                Success=false
            };
        }
        var projects=_context.Projects.Where(p=>p.UserId==userId).ToList();
        return new ResponseDto
        {
            Message="Projects fetched successfully",
            Data=projects,
            Success=true
        };
    }

    public async Task<ResponseDto> DeleteProject(Guid projectId,Guid userId)
    {
        var user=_context.Users.FirstOrDefault(u=>u.Id==userId);
        if(user == null)
        {
            return new ResponseDto
            {
                Message="unauthenticated",
                Success=false
            };
        }
        var project=_context.Projects.FirstOrDefault(p=>p.Id==projectId && p.UserId==userId);
        if(project == null)        {
            return new ResponseDto
            {
                Message="Project not found",
                Success=false
            };
        }

        _context.Projects.Remove(project);
        await _context.SaveChangesAsync();

        return new ResponseDto
        {
            Message="Project deleted successfully",
            Success=true
        };
    }
}