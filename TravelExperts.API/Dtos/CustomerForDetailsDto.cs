using System.ComponentModel.DataAnnotations;

namespace TravelExperts.API.Dtos
{
    public class CustomerForDetailsDto
    {
        [Required]
        [StringLength(200,MinimumLength=1,ErrorMessage="Specify a first name")]
        public string CustFirstName { get; set; }

        [Required]
        [StringLength(200,MinimumLength=1,ErrorMessage="Specify a last name")]
        public string CustLastName { get; set; }

        [Required]
        [StringLength(200,MinimumLength=1,ErrorMessage="Specify an address")]
        public string CustAddress { get; set; }

        [Required]
        [StringLength(50,MinimumLength=1,ErrorMessage="Specify a city")]
        public string CustCity { get; set; }

        [Required]
        [StringLength(2,MinimumLength=2,ErrorMessage="Specify a province code with 2 characters")]
        public string CustProv { get; set; }

        [Required]
        [StringLength(7,MinimumLength=5,ErrorMessage="Specify a postal code/ zip (5-7 chars) ")]
        public string CustPostal { get; set; }

        [Required]
        [StringLength(50,MinimumLength=1,ErrorMessage="Specify a country")]
        public string CustCountry { get; set; }

        [Required]
        [StringLength(15,MinimumLength=1,ErrorMessage="Specify a home phone number (max 15 chars)")]
        public string CustHomePhone { get; set; }
        
        [StringLength(15,MinimumLength=1,ErrorMessage="Specify a business phone number (max 15 chars)")]
        public string CustBusPhone { get; set; }
        
        [StringLength(200,MinimumLength=1,ErrorMessage="Specify an email")]
        public string CustEmail { get; set; }

        [Required]
        [StringLength(200,MinimumLength=4,ErrorMessage="Specify a username between 4 and 200 characters")]
        public string Username { get; set; }

    }
}