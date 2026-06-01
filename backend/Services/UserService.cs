using backend.Data;
using backend.DTOs;
using backend.Interfaces;

namespace backend.Services;

class UserService : IUserService
{
    private readonly AppDbContext _context;
    public UserService(AppDbContext context)
    {
        _context = context;
    }
    public Task<List<UserDto>> GetAllUsers()
    {
        List<UserDto> users=_context.Users.Where(u=>u.Role=="User").Select(u=>new UserDto{
            Id=u.Id,
            Name=u.Name,
            Email=u.Email
        }).ToList();

        return Task.FromResult(users);
    }
}