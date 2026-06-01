namespace backend.Models;

public class Project
{
    public Guid Id{get;set;}
    public Guid UserId{get;set;}
    public string ProjectTitle{get;set;}=string.Empty;
    public string Description{get;set;}=string.Empty;
    public DateTime StartDate{get;set;}
    public DateTime EndDate{get;set;}

    // relationsips
    public User? User{get;set;}
}