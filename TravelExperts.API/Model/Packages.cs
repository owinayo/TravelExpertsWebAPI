using System;
using System.Collections.Generic;

namespace TravelExperts.API.Model
{
    public partial class Packages
    {
        public Packages()
        {
            Bookings = new HashSet<Bookings>();
            PackagesProductsSuppliers = new HashSet<PackagesProductsSuppliers>();
        }

        public int PackageId { get; set; }
        public string PkgName { get; set; }
        public byte[] Image { get; set; }
        public string Partner { get; set; }
        public int AirfairInclusion { get; set; }
        public DateTime PkgStartDate { get; set; }
        public DateTime PkgEndDate { get; set; }
        public string PkgDesc { get; set; }
        public decimal PkgBasePrice { get; set; }
        public decimal PkgAgencyCommission { get; set; }

        public virtual ICollection<Bookings> Bookings { get; set; }
        public virtual ICollection<PackagesProductsSuppliers> PackagesProductsSuppliers { get; set; }
    }
}
