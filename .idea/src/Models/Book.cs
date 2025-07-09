using System.ComponentModel.DataAnnotations;

namespace BookManagement.Models;

public class Book
{
    public int Id { get; set; }

    [Required]
    [StringLength(200)]
    public string Title { get; set; } = string.Empty;

    [Required]
    [StringLength(100)]
    public string Author { get; set; } = string.Empty;

    [Required]
    [StringLength(50)]
    public string Genre { get; set; } = string.Empty;

    [Required]
    public DateTime PublicationDate { get; set; }

    [StringLength(2000)]
    public string Description { get; set; } = string.Empty;
}