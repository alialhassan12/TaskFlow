using backend.Models;
namespace backend.DTOs;
public class AuthResponseDto
{
    public string Token{get;set;}=string.Empty;
    public UserDto user{get;set;}=null!;
    public bool success{get;set;}=false;
    public string Error{get;set;}=string.Empty;
}