﻿using System;
using System.Collections.Generic;

namespace TravelExperts.API.Model
{
    public partial class Fees
    {
        public Fees()
        {
            BookingDetails = new HashSet<BookingDetails>();
        }

        public string FeeId { get; set; }
        public string FeeName { get; set; }
        public decimal FeeAmt { get; set; }
        public string FeeDesc { get; set; }

        public virtual ICollection<BookingDetails> BookingDetails { get; set; }
    }
}
