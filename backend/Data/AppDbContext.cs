using backend.Data;
using backend.Models;
using Microsoft.EntityFrameworkCore;

namespace backend.Data;

public class AppDbContext:DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) 
    : base(options)
    {
    }

    public DbSet<User> Users{get;set;}
    public DbSet<Project> Projects{get;set;}
    public DbSet<Models.Task> Tasks{get;set;}
}