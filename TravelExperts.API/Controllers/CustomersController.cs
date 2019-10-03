using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelExperts.API.Data;
using TravelExperts.API.Dtos;
using TravelExperts.API.Model;

namespace TravelExperts.API.Controllers
{
    // Ensures that we are authorized to access this controllers function
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ITravelExpertsRepository repo; // Repository to access travel experts DB CRUD methods
        private readonly IMapper mapper; // Auto mapper to transform DTO class to model class and vice versa

        // Creates controller
        public CustomersController(ITravelExpertsRepository repo, IMapper mapper)
        {
            this.mapper = mapper;
            this.repo = repo;
        }


        // Returns customer details dto for the given customer id
        // GET api/customers/5        
        [HttpGet("{id}", Name="GetCustomer")]
        public async Task<IActionResult> GetCustomer(int id)
        {
            var customer = await this.repo.GetCustomer(id); // Asks db to get customer based on id

            var customerToReturn = mapper.Map<CustomerForUpdateDto>(customer); // Maps customer model to dto

            return Ok(customerToReturn); // Returns ok request code with the customer to return dto
        }

        // Updates customer given id and update dto(this does not contain id)
        // PUT api/customers/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateCustomer(int id, CustomerForUpdateDto[] customerInformationDto)
        {
            CustomerForUpdateDto oldCustomerInformationDto = customerInformationDto[0]; // first entry in body request is old customer info
            CustomerForUpdateDto newCustomerInformationDto = customerInformationDto[1]; // second entry is new customer info
            if(oldCustomerInformationDto== null || newCustomerInformationDto == null){
                throw new Exception($"Error updating user {id} . Failed on information processing.");
            }

            // Checks that the id is for the currently logged in customer, otherwise unauthorized
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
                return Unauthorized();
            }

            // Maps the old customer information to a customers model
            Customers oldCustomer = new Customers();
            mapper.Map(oldCustomerInformationDto, oldCustomer);
            oldCustomer.CustomerId = id; // assign the customer id

            // Tries to save changes
            if (await repo.EditCustomer(oldCustomer, newCustomerInformationDto)!=null){
                return NoContent();
            }

            // If unsuccessful, throw exception that we failed to save
            throw new Exception($"Updating user {id} failed on save");
        }

        // Gets the booked packages for the given customer id
        [HttpGet("bookedPackages/{id}")]
        public async Task<IActionResult> GetBookedPackagesByCustomerId(int id){

            // Checks that the id is for the currently logged in customer, otherwise unauthorized
            if (id != int.Parse(User.FindFirst(ClaimTypes.NameIdentifier).Value)){
                return Unauthorized();
            } 

            // Gets the booked packages for the current customer
            List<BookedPackages> bookingsForCustomer = repo.GetBookedPackagesByCustomer(id);

            // Builds bookedpackage dto list since automapper is unable to
            List<BookedPackageDetailsDto> bookedPackagesToReturn = new List<BookedPackageDetailsDto>(); 
          
            foreach (BookedPackages b in bookingsForCustomer){
                bookedPackagesToReturn.Add(new BookedPackageDetailsDto{
                    BookingDate = b.BookingDate,
                    PkgName = b.PkgName,
                    Image = Convert.ToBase64String(b.Image),
                    Partner = b.Partner,
                    PkgStartDate = b.PkgStartDate,
                    PkgEndDate = b.PkgEndDate,
                    PkgDesc = b.PkgDesc,
                    PkgBasePrice = b.PkgBasePrice
                });
            }

            // Returns list to website
            return Ok(bookedPackagesToReturn);

        }

    
    }
}