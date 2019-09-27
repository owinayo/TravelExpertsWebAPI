using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelExperts.API.Data;

namespace TravelExperts.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly TravelExpertsContext context;
        public CustomersController(TravelExpertsContext context)
        {
            this.context = context;
        }
        // GET api/customers
        [HttpGet]
        public async Task<IActionResult> GetCustomers()
        {
            var customers = await this.context.Customers.ToListAsync();

            return Ok(customers);
        }

        // GET api/customers/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomer(int id)
        {
            var customer = await this.context.Customers.FirstOrDefaultAsync(x => x.CustomerId == id);

            return Ok(customer);
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody] string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}