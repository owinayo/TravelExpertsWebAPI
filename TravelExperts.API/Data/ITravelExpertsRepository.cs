using System;
using TravelExperts.API.Model;
using System.Threading.Tasks;
using System.Collections.Generic;
using TravelExperts.API.Dtos;

namespace TravelExperts.API.Data
{
    public interface ITravelExpertsRepository
    {
        void Add<T>(T entity) where T: class; // Adds the given class to db

        void Delete<T>(T entity) where T: class; // Deletes given class from db

        Task<bool> SaveAll(); // Saves changes to db

        Task<Customers> GetCustomer(int id); // Gets the given customer from id

        Task<Customers> EditCustomer(Customers oldCustomer, CustomerForUpdateDto newCustomer);  // Edits the customer (concurrency handled)

        Task<IEnumerable<Packages>> GetAllAvailablePackages(); // Gets all available packages

        List<BookedPackages> GetBookedPackagesByCustomer(int customerId); // Gets the booked packages for the customer

        
    }
}