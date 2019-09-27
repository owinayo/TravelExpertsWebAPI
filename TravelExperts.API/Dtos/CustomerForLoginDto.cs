using System.ComponentModel.DataAnnotations;

namespace TravelExperts.API.Dtos
{
    public class CustomerForLoginDto
    {
        [Required]
        public string Username { get; set; }

        [Required]
        [StringLength(200, MinimumLength = 4, ErrorMessage="Specify a password between 4 and 200 characters")]
        public string Password { get; set; }
    }
}