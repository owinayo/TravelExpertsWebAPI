using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using TravelExperts.API.Dtos;
using TravelExperts.API.Model;

namespace TravelExperts.API.Data
{
    public class TravelExpertsRepository : ITravelExpertsRepository
    {
        private TravelExpertsContext context; // db context
        private readonly IMapper mapper; // Automapper

        // Initialize context on construct
        public TravelExpertsRepository(TravelExpertsContext context, IMapper mapper)
        {
            this.mapper = mapper;
            this.context = context;
        }

        // Adds given class to db
        public void Add<T>(T entity) where T : class
        {
            context.Add(entity);
        }

        // Deletes given class from db
        public void Delete<T>(T entity) where T : class
        {
            context.Remove(entity);
        }

        // Edits the customer given the old customer and new customer
        public async Task<Customers> EditCustomer(Customers oldCustomer, CustomerForUpdateDto newCustomer)
        {
            // Gets old customer from db, ensures that customer has not been changed (for updatable properties)
            var oldCustomerFromDB = await context.Customers
            .Where(c =>
            (c.CustomerId == oldCustomer.CustomerId) &&
            (c.CustAddress == oldCustomer.CustAddress) &&
            (c.CustCity == oldCustomer.CustCity) &&
            (c.CustCountry == oldCustomer.CustCountry) &&
            (c.CustFirstName == oldCustomer.CustFirstName) &&
            (c.CustLastName == oldCustomer.CustLastName) &&
            (c.CustPostal == oldCustomer.CustPostal) &&
            (c.CustProv == oldCustomer.CustProv) &&
            (c.CustHomePhone == oldCustomer.CustHomePhone) &&
            (c.CustBusPhone == oldCustomer.CustBusPhone) &&
            (c.CustEmail == oldCustomer.CustEmail)
            ).FirstOrDefaultAsync();
            if (oldCustomerFromDB != null)
            {
                mapper.Map(newCustomer, oldCustomerFromDB); // Assigns new customer properties to old customer
                await context.SaveChangesAsync(); // Saves changes
            }
            return oldCustomerFromDB; // Returns updated customer from db
        }

        // Gets all packages from db as a list
        public async Task<IEnumerable<Packages>> GetAllAvailablePackages()
        {
            var packages = await context.Packages.ToListAsync();
            return packages;
        }

        // Gets the booked packages by customer id
        public List<BookedPackages> GetBookedPackagesByCustomer(int customerId)
        {
            // Selects package details and booking date for the given customer (based on id)
            var packages =
            (from c in context.Customers
             join b in context.Bookings on c.CustomerId equals b.CustomerId
             join p in context.Packages on b.PackageId equals p.PackageId
             where c.CustomerId == customerId
             select new
             {
                 b.BookingDate,
                 p.PackageId,
                 p.PkgName,
                 p.Image,
                 p.Partner,
                 p.AirfairInclusion,
                 p.PkgStartDate,
                 p.PkgEndDate,
                 p.PkgDesc,
                 p.PkgBasePrice,
                 p.PkgAgencyCommission
             });
            Console.WriteLine("here");

            // Builds the list of booked packages from the query information
            List<BookedPackages> bookedPackagesList = new List<BookedPackages>();
            foreach (var package in packages)
            {
                bookedPackagesList.Add(new BookedPackages
                {
                    BookingDate = package.BookingDate,
                    PackageId = package.PackageId,
                    PkgName = package.PkgName,
                    Image = package.Image,
                    AirfairInclusion = package.AirfairInclusion,
                    PkgStartDate = package.PkgStartDate,
                    PkgEndDate = package.PkgEndDate,
                    PkgDesc = package.PkgDesc,
                    PkgBasePrice = package.PkgBasePrice,
                    PkgAgencyCommission = package.PkgAgencyCommission
                });

            }

            return bookedPackagesList; // returns list   

        }

        // Gets the customer based on id
        public async Task<Customers> GetCustomer(int id)
        {
            var customer = await this.context.Customers.FirstOrDefaultAsync(c => c.CustomerId == id);
            return customer;
        }

        // Saves all changes in db
        public async Task<bool> SaveAll()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}