using System.Text.Json.Serialization;

namespace backend.Models;

public class User
{
    public Guid Id{get;set;}
    public string Name{get;set;}=string.Empty;
    public string Email{get;set;}=string.Empty;
    public string Password{get;set;}=string.Empty;
    public string Role{get;set;}="User";

    // relationships
    [JsonIgnore]
    public List<Project> Projects{get;set;}=new List<Project>();
}