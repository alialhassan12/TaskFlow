using backend.Models;

namespace backend.DTOs;

public class ResponseDto
{
    public string Message{get;set;}=string.Empty;
    public object Data{get;set;}=null!;
    public bool Success{get;set;}=false;
}