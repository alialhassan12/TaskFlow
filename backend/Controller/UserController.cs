namespace backend.Controller;
using backend.DTOs;
using backend.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[ApiController]
[Route("/api/[controller]")]
public class UserController : ControllerBase
{
    private readonly IUserServiceInterface _userService;
    public UserController(IUserServiceInterface userService)
    {
        _userService=userService;
    }

    [Authorize(Roles ="Admin")]
    [HttpGet("/admin/users")]
    public async Task<IActionResult> GetAllUsers()
    {
        var users = await _userService.GetAllUsers();
        return Ok(users);
    }
}