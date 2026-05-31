namespace backend.Interfaces;
using backend.DTOs;

public interface IUserServiceInterface
{
    Task<List<UserDto>> GetAllUsers();
}