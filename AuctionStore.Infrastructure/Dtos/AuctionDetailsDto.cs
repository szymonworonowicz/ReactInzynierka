using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Dtos
{
    public class AuctionDetailsDto
    {
        public Guid Id { get; set; }
        public string Title { get; set; }
        public decimal Price { get; set; }
        public long? TimeStampStart { get; set; }
        public long? TimeStampEnd { get; set; }
        public long? TimeStampDuration { get; set; }
        public string Description { get; set; }
        public decimal MaxOffer { get; set; }

        public Guid UserId { get; set; }

    }
}
