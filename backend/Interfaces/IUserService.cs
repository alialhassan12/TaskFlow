namespace backend.Interfaces;
using backend.DTOs;

public interface IUserService
{
    Task<List<UserDto>> GetAllUsers();
}