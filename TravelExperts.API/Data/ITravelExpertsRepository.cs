using System;
using TravelExperts.API.Model;
using System.Threading.Tasks;
using System.Collections.Generic;

namespace TravelExperts.API.Data
{
    public interface ITravelExpertsRepository
    {
        void Add<T>(T entity) where T: class;

        void Delete<T>(T entity) where T: class;

        Task<bool> SaveAll();

        Task<Customers> GetCustomer(int id);

        Task<Customers> EditCustomer(Customers oldCustomer, Customers newCustomer); 

        Task<IEnumerable<Packages>> GetAllAvailablePackages();

        List<BookedPackages> GetBookedPackagesByCustomer(int customerId);

        
    }
}