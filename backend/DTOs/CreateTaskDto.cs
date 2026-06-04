using System.ComponentModel.DataAnnotations;

namespace backend.DTOs;

public class CreateTaskDto
{

    [Required]
    public Guid ProjectId{get;set;} 
    [Required]
    public string Title{get;set;}=string.Empty;
    public string Description{get;set;}=string.Empty;
    public DateTime DueDate{get;set;}
    public bool IsCompleted{get;set;}=false;
}