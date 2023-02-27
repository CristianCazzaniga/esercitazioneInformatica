using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;

namespace BulkyBook.Models.Models
{
    public class Product
    {
        public int Id { get; set; }
        //l'annotation [Required] non sarebbe necessaria perché stiamo usando i nullable reference types e l'operatore null!
        [Required]
        public string Title { get; set; } = null!;
        public string Description { get; set; } = null!;
        [Required]
        public string ISBN { get; set; } = null!;
        [Required]
        public string Author { get; set; } = null!;
        [Required]
        [Range(1, 10000)]
        public double ListPrice { get; set; }
        [Required]
        [Range(1, 10000)]
        public double Price { get; set; }
        [Required]
        [Range(1, 10000)]
        public double Price50 { get; set; }
        [Required]
        [Range(1, 10000)]
        public double Price100 { get; set; }
        public string? ImageUrl { get; set; }
        [Required]
        public int CategoryId { get; set; }
        [ForeignKey("CategoryId")]
        [ValidateNever]
        public Category Category { get; set; } = null!;
        [Required]
        public int CoverTypeId { get; set; }
        [ValidateNever]
        public CoverType CoverType { get; set; } = null!;
    }
}
