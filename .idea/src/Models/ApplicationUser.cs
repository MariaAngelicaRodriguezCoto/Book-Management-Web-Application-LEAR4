using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace BookManagement.Models;

public class ApplicationUser : IdentityUser
{
    [StringLength(50)]
    public string FirstName { get; set; } = string.Empty;

    [StringLength(50)]
    public string LastName { get; set; } = string.Empty;
}
