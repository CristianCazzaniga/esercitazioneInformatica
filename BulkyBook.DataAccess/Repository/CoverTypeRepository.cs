using BulkyBook.DataAccess.Repository.IRepository;
using BulkyBook.DataAccess.Repository.IRepository.BulkyBook.DataAccess.Repository.IRepository;
using BulkyBook.Models;
using BulkyBook.Models.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BulkyBook.DataAccess.Repository
{
    public class ProductRepository : Repository<Product>, IProductRepository
    {
        private readonly ApplicationDbContext _db;
        public ProductRepository(ApplicationDbContext db) : base(db)
        {
            _db = db;
        }
        public void Update(Product product)
        {
            //Questo modo di aggiornare product non è molto efficiente quando abbiamo pochi campi da aggiornare:
            //anche se dobbiamo aggiornare un solo campo, questo metodo aggiorna tutti i campi nel database.
            //_db.Products.Update(product);
            //per migliorare le cose possiamo prima recuperare l'oggetto dal database mediante EF Core in modo che inizi il traking dell'oggetto
            //in questo modo EF Core aggiornerà solo le proprietà che sono state effettivamente modificate
            //qui possiamo usare direttamente _db di EF Core perché siamo all'interno del repository
            //supponiamo che l'aggiornamento del prodotto possa non riguardare l'immagine, pertanto l'aggiornamento
            //dell'Url dell'immagine verrà fatto solo se l'utente intende modificarla
            var objFromDb = _db.Products.FirstOrDefault(u => u.Id == product.Id);
            if (objFromDb != null)
            {
                objFromDb.Title = product.Title;
                objFromDb.ISBN = product.ISBN;
                objFromDb.Price = product.Price;
                objFromDb.Price50 = product.Price50;
                objFromDb.ListPrice = product.ListPrice;
                objFromDb.Price100 = product.Price100;
                objFromDb.Description = product.Description;
                objFromDb.CategoryId = product.CategoryId;
                objFromDb.Author = product.Author;
                objFromDb.CoverTypeId = product.CoverTypeId;
                if (product.ImageUrl != null)
                {
                    objFromDb.ImageUrl = product.ImageUrl;
                }
            }
        }
    }
}
