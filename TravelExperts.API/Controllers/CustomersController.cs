using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TravelExperts.API.Data;
using TravelExperts.API.Dtos;

namespace TravelExperts.API.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class CustomersController : ControllerBase
    {
        private readonly ITravelExpertsRepository repo;
        private readonly IMapper mapper;
        public CustomersController(ITravelExpertsRepository repo, IMapper mapper)
        {
            this.mapper = mapper;
            this.repo = repo;
        }


        // GET api/customers/5
        [AllowAnonymous]
        [HttpGet("{id}")]
        public async Task<IActionResult> GetCustomer(int id)
        {
            var customer = await this.repo.GetCustomer(id);

            var customerToReturn = mapper.Map<CustomerForDetailsDto>(customer);

            return Ok(customerToReturn);
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