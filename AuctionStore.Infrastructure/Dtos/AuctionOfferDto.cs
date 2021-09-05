using System;

namespace AuctionStore.Infrastructure.Dtos
{
    public class AuctionOfferDto
    {
        public Guid Id { get; set; }
        public decimal NewPrice { get; set; }
        public long TimeStampAdded { get; set; }
        public Guid UserId { get; set; }
    }
}