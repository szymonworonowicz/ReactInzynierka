using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Models
{
    public class Address
    {
        public Guid Id { get; set; }
        public Guid? UserId { get; set; }
        public string City { get; set; }
        public string Street { get; set; }
        public string HouseNo { get; set; }
        public string PostCode { get; set; }
        public bool IsDeleted { get; set; }
    }
}
