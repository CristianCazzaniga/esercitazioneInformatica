using BulkyBook.Models.Models;
using Microsoft.AspNetCore.Mvc.ModelBinding.Validation;
using Microsoft.AspNetCore.Mvc.Rendering;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BulkyBook.Models.ViewModels
{
    public class ProductVM
    {
        public Product Product { get; set; } = null!;
        [ValidateNever]
        public IEnumerable<SelectListItem> CategoryList { get; set; } = null!;
        [ValidateNever]
        public IEnumerable<SelectListItem> CoverTypeList { get; set; } = null!;
    }
}
