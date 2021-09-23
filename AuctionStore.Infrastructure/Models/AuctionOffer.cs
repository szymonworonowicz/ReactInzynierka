using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Models
{
    public class AuctionOffer
    {
        public Guid Id { get; set; }
        public decimal NewPrice { get; set; }
        public long TimeStampAdded { get; set; }
        public Guid UserId { get; set; }
        public Guid? AuctionId { get; set; }
    }
}
