using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;

public class CreateProjectDto
{
    [Required]
    public Guid UserId{get;set;}
    [Required]
    public string ProjectTitle{get;set;}=string.Empty;
    public string Description{get;set;}=string.Empty;
    public DateTime StartDate{get;set;}
    public DateTime EndDate{get;set;}
}