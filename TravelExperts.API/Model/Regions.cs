using System;
using System.Collections.Generic;

namespace TravelExperts.API.Model
{
    public partial class Regions
    {
        public Regions()
        {
            BookingDetails = new HashSet<BookingDetails>();
        }

        public string RegionId { get; set; }
        public string RegionName { get; set; }

        public virtual ICollection<BookingDetails> BookingDetails { get; set; }
    }
}
