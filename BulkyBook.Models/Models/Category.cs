using System;
using System.ComponentModel.DataAnnotations;

namespace BulkyBook.Models;
public class Category
{
    [Key]
    public int Id { get; set; }
    [Required]
    [Display(Name="Nome Categoria")]
    public string Name { get; set; }
    [Display(Name = "Display Order")]
    [Range(1, 100, ErrorMessage = "{0} must be between {1} and {2}")]
    public int DisplayOrder { get; set; }
    public DateTime CreatedDateTime { get; set; } = DateTime.Now;
}
