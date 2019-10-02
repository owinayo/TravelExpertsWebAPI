using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Logging;
using Microsoft.IdentityModel.Tokens;
using TravelExperts.API.Data;
using TravelExperts.API.Dtos;
using TravelExperts.API.Model;

namespace TravelExperts.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IAuthRepository repo; // Repository that holds methods for authorization functions
        private readonly IConfiguration config; // Config gets reference to token
        private readonly IMapper mapper; // Auto mapper to transform one class to another

        // Default constructor that initializes all required files
        public AuthController(IAuthRepository repo, IConfiguration config, IMapper mapper)
        {
            this.mapper = mapper;
            this.config = config;
            this.repo = repo;
        }

        // Handles post request to register
        [HttpPost("register")]
        public async Task<IActionResult> Register(CustomerForRegisterDto customerForRegisterDto)
        {

            // Makes username lowercase
            customerForRegisterDto.Username = customerForRegisterDto.Username.ToLower();

            // Returns error if customer's username already exists in db
            if (await repo.CustomerExists(customerForRegisterDto.Username))
            {
                return BadRequest("Username already exists");
            }

            // Converts dto to the DB Customer model class
            var customerToCreate = this.mapper.Map<Customers>(customerForRegisterDto);

            // Runs the register method and returns the created user
            var createdUser = await repo.Register(customerToCreate, customerForRegisterDto.Password);

            // Maps the created user to an update DTO (for edit profile)
            var customerToReturn = mapper.Map<CustomerForUpdateDto>(createdUser);

            // Routing middleware to get the new customer details (from Customer controller GetCustomer with supplied id)
            return CreatedAtRoute("GetCustomer", new {controller="Customers", id=createdUser.CustomerId}, customerToReturn);
        }

        // Handles login requests from customer for login dtos
        [HttpPost("login")]
        public async Task<IActionResult> Login(CustomerForLoginDto customerForLoginDto)
        {

            // Makes username lowercase
            customerForLoginDto.Username = customerForLoginDto.Username.ToLower();

            // Get logged in customer, null if failed
            var loggedInCustomer = await repo.Login(customerForLoginDto.Username.ToLower(), customerForLoginDto.Password);

            if (loggedInCustomer == null)
            {
                return Unauthorized();
            }

            // Ensure customer id and user match with pulled customer
            var claims = new[]
            {
                new Claim(ClaimTypes.NameIdentifier,loggedInCustomer.CustomerId.ToString()),
                new Claim(ClaimTypes.Name, loggedInCustomer.CustFirstName),
            };

            // Creates a key from token signature defined in app settings
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("AppSettings:Token").Value));

            // Creates new credentials using key and encryption algorithm
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // Creates the token descriptor using our claims, credentials, and expires from 6 hours
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds

            };

            // Creates token using the above
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            IdentityModelEventSource.ShowPII = true;

            // returns the token if login successful
            return Ok(new { token = tokenHandler.WriteToken(token) });

        }

    }
}