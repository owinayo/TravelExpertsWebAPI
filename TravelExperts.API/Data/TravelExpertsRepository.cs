using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TravelExperts.API.Model;

namespace TravelExperts.API.Data
{
    public class TravelExpertsRepository : ITravelExpertsRepository
    {
        private TravelExpertsContext context;

        public TravelExpertsRepository(TravelExpertsContext context){
            this.context = context;
        }
        public void Add<T>(T entity) where T : class
        {
            context.Add(entity);
        }

        public void Delete<T>(T entity) where T : class
        {
            context.Remove(entity);            
        }

        public async Task<Customers> EditCustomer(Customers oldCustomer, Customers newCustomer)
        {
            var oldCustomerFromDB = await context.Customers.Where(c => c.CustomerId == oldCustomer.CustomerId).FirstOrDefaultAsync();
            oldCustomerFromDB = newCustomer;
            await context.SaveChangesAsync();
            return oldCustomerFromDB;
        }

        public async Task<IEnumerable<Packages>> GetAllAvailablePackages()
        {
            var packages = await context.Packages.ToListAsync();
            return packages;
        }

        public List<BookedPackages> GetBookedPackagesByCustomer(int customerId)
        {
            var packages = 
            (from c in context.Customers
            join b in context.Bookings on c.CustomerId equals b.CustomerId
            join p in context.Packages on b.PackageId equals p.PackageId
            where c.CustomerId == customerId
            select new {b.BookingDate, p.PackageId, p.PkgName, p.Image, p.Partner, p.AirfairInclusion,
            p.PkgStartDate, p.PkgEndDate, p.PkgDesc, p.PkgBasePrice, p.PkgAgencyCommission});
            Console.WriteLine("here"); 

            List<BookedPackages> bookedPackagesList = new List<BookedPackages>();
            foreach(var package in packages){
                bookedPackagesList.Add(new BookedPackages{
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
                Console.WriteLine("here2");                
            }
                
            return bookedPackagesList;
            
            /*
            Task<List<BookedPackages>> task = new Task<List<BookedPackages>>(()=>{
                List<BookedPackages> bookedPackagesList = new List<BookedPackages>();
                foreach(var package in packages){
                    bookedPackagesList.Add(new BookedPackages{
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
                    Console.WriteLine("here2");                
                }
                return bookedPackagesList;
            });
            */
            
        }

        public async Task<Customers> GetCustomer(int id)
        {
            var customer = await this.context.Customers.FirstOrDefaultAsync(c => c.CustomerId == id);
            return customer;
        }

        public async Task<bool> SaveAll()
        {
            return await context.SaveChangesAsync() > 0;
        }
    }
}