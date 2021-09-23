using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Services.SignalR.SignalRMessages
{
    public class AuctionOffer
    {
        public Guid UserId { get; set; }
        public Guid AuctionId { get; set; }
        public decimal Offer { get; set; }
    }
}
