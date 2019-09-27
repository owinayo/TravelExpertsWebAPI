using System;
using System.Collections.Generic;

namespace TravelExperts.API.Model
{
    public partial class PackagesProductsSuppliers
    {
        public int PackageId { get; set; }
        public int ProductSupplierId { get; set; }

        public virtual Packages Package { get; set; }
        public virtual ProductsSuppliers ProductSupplier { get; set; }
    }
}
