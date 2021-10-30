using AuctionStore.Infrastructure.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Models
{
    public class Auction
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public long? TimeStampStart { get; set; }
        public long? TimeStampEnd { get; set; }
        public long? TimeStampDuration { get; set; }
        public string Description { get; set; }
        public Guid UserId { get; set; }
        public Guid? SubCategoryId { get; set; }
        public AuctionStatus Status { get; set; }
        public int CountOfEntries { get; set; }


        public virtual IEnumerable<AuctionFile> AuctionMedias { get; set; }
        public virtual IEnumerable<AuctionOffer> AuctionOffers { get; set; }
        public virtual SubCategory SubCategory { get; set; }
    }
}
