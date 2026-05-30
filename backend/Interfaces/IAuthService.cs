using backend.DTOs;
using backend.Models;

namespace backend.Interfaces;

public interface IAuthService
{
    Task<AuthResponseDto> Register(RegisterDto dto);
    Task<AuthResponseDto> Login (LoginDto dto);
}