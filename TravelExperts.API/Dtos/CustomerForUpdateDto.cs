using System.ComponentModel.DataAnnotations;

namespace TravelExperts.API.Dtos
{
    // Holds all information required to update a customer that user would fill in
    public class CustomerForUpdateDto
    {
        [Required]
        [StringLength(200,MinimumLength=1,ErrorMessage="Specify a first name")]
        public string CustFirstName { get; set; } // First name

        [Required]
        [StringLength(200,MinimumLength=1,ErrorMessage="Specify a last name")]
        public string CustLastName { get; set; } // Last name

        [Required]
        [StringLength(200,MinimumLength=1,ErrorMessage="Specify an address")]
        public string CustAddress { get; set; } // Address

        [Required]
        [StringLength(50,MinimumLength=1,ErrorMessage="Specify a city")]
        public string CustCity { get; set; } // City

        [Required]
        [StringLength(2,MinimumLength=2,ErrorMessage="Specify a province code with 2 characters")]
        public string CustProv { get; set; } // Province

        [Required]
        [StringLength(7,MinimumLength=5,ErrorMessage="Specify a postal code/ zip (5-7 chars) ")]
        public string CustPostal { get; set; } // Postal code

        [Required]
        [StringLength(50,MinimumLength=1,ErrorMessage="Specify a country")]
        public string CustCountry { get; set; } // Country

        [Required]
        [StringLength(15,MinimumLength=1,ErrorMessage="Specify a home phone number (max 15 chars)")]
        public string CustHomePhone { get; set; } // Home phone #
        
        [StringLength(15,MinimumLength=0,ErrorMessage="Specify a business phone number (max 15 chars)")]
        public string CustBusPhone { get; set; } // Business phone #
        
        [StringLength(200,MinimumLength=0,ErrorMessage="Specify an email")]
        public string CustEmail { get; set; } // Email address


    }
}