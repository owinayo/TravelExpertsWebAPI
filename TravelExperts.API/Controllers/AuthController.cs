using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
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
        private readonly IAuthRepository repo;
        private readonly IConfiguration config;

        public AuthController(IAuthRepository repo, IConfiguration config)
        {
            this.config = config;
            this.repo = repo;
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(CustomerForRegisterDto customerForRegisterDto)
        {

            // Makes username lowercase
            customerForRegisterDto.Username = customerForRegisterDto.Username.ToLower();

            if (await repo.CustomerExists(customerForRegisterDto.Username))
            {
                return BadRequest("Username already exists");
            }

            // Creates a customer with login and attempts to register customer
            var customerToCreate = new Customers
            {
                Username = customerForRegisterDto.Username
            };

            var createdUser = await repo.Register(customerToCreate, customerForRegisterDto.Password);

            return StatusCode(201);
        }

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
                new Claim(ClaimTypes.Name, loggedInCustomer.Username),
            };

            // Creates a key from token signature defined in app settings
            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config.GetSection("AppSettings:Token").Value));

            // Creates new credentials using key and encryption algorithm
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

            // Creates the token descriptor using our claims, credentials, and expires from 6 hours
            var tokenDescriptor = new SecurityTokenDescriptor{
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(1),
                SigningCredentials = creds
                
            };

            // Creates token using the above
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            IdentityModelEventSource.ShowPII = true;

            // returns the token if login successful
            return Ok(new {token = tokenHandler.WriteToken(token)});

        }

    }
}