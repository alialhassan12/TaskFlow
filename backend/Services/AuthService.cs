using backend.Data;
using backend.DTOs;
using backend.Interfaces;
using backend.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace backend.Services;

public class AuthService : IAuthService
{
    private readonly AppDbContext _context;
    private readonly JwtService _jwtService;

    public AuthService(AppDbContext context,JwtService jwtService)
    {
        _context = context;
        _jwtService=jwtService;
    }

    public async Task<AuthResponseDto> Register(RegisterDto dto)
    {
        var exists=await _context.Users.AnyAsync(u=>u.Email == dto.Email);
        if(exists){
            return new AuthResponseDto
            {
                Token="",
                user=null!,
                success=false,
                Error="Email in use"
            };
        }

        var passwordHasher = new PasswordHasher<User>();
        var newUser = new User
        {
            Name = dto.Name,
            Email = dto.Email,
        };
        newUser.Password=passwordHasher.HashPassword(newUser,dto.Password);

        _context.Users.Add(newUser);
        await _context.SaveChangesAsync();

        var token=_jwtService.GenrateToken(newUser);

        return new AuthResponseDto
        {
            Token=token,
            user=new UserDto{
                    Id=newUser.Id,
                    Name=newUser.Name,
                    Email=newUser.Email,
                },
            success=true
        };
    }

    public async Task<AuthResponseDto> Login(LoginDto dto)
    {
        var user= await _context.Users.FirstOrDefaultAsync(u => u.Email == dto.Email);

        if (user ==null)
        {
            return new AuthResponseDto
            {
                Token="",
                user=null!,
                success=false,
                Error="Invalid Credentials"
            };
        }

        var passwordHasher = new PasswordHasher<User>();

        var result=passwordHasher.VerifyHashedPassword(user,user.Password,dto.Password);
        if(result == PasswordVerificationResult.Failed)
        {
            return new AuthResponseDto
            {
                Token="",
                user=null!,
                success=false,
                Error="Invalid Credentials"
            };
        }
        return new AuthResponseDto
        {
            Token=_jwtService.GenrateToken(user),
            user=new UserDto{
                    Id=user.Id,
                    Name=user.Name,
                    Email=user.Email,
                },
            success=true
        };
    }
}