
using System;
using System.ComponentModel.DataAnnotations;

namespace BulkyBookWeb.Models;
public class Category
{
    [Key]
    public int Id { get; set; }
    [Required]
    [Display(Name="Nome Categoria")]
    public string Name { get; set; }
    [Display(Name = "Display Order")]
    public int DisplayOrder { get; set; }
    public DateTime CreatedDateTime { get; set; } = DateTime.Now;
}
