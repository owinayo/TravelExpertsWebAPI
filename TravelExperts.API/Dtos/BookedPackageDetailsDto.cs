using System;

namespace TravelExperts.API.Dtos
{
    public class BookedPackageDetailsDto
    {
        public DateTime? BookingDate;
        public String PkgName;
        public String Image;
        public String Partner;
        public DateTime PkgStartDate;
        public DateTime PkgEndDate;
        public String PkgDesc;
        public decimal PkgBasePrice;

    }
}