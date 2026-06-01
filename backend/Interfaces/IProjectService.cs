using backend.DTOs;

namespace backend.Interfaces;

public interface IProjectService
{
    public Task<ResponseDto> CreateProject(CreateProjectDto dto);
    public Task<ResponseDto> GetMyProjects(Guid userId);
    public Task<ResponseDto> DeleteProject(Guid projectId,Guid userId);
}