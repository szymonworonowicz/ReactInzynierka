using AuctionStore.Infrastructure.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Dtos
{
    public class UserAuctionDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public long? TimeStampStart { get; set; }
        public long? TimeStampEnd { get; set; }
        public long? TimeStampDuration { get; set; }
        public string Description { get; set; }
        public AuctionStatus Status { get; set; }
    }
}
