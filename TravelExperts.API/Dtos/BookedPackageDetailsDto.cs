using System;
using System.ComponentModel.DataAnnotations;

namespace TravelExperts.API.Dtos
{
    // Contains all details to display a booked package
    public class BookedPackageDetailsDto
    {
        [Required]
        public DateTime? BookingDate; // Date when package is booked
        [Required]
        public String PkgName; // Name
        [Required]
        public String Image; // Image as base 64 string
        public String Partner; // Partner site
        [Required]
        public DateTime PkgStartDate; // Package start date
        [Required]
        public DateTime PkgEndDate; // Package end date
        [Required]
        public String PkgDesc; // Package desc
        [Required]
        public decimal PkgBasePrice; // Package base price

    }
}