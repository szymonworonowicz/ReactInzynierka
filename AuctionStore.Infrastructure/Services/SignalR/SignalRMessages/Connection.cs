using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Services.SignalR.SignalRMessages
{
    public class Connection
    {
        public string UserId { get; set; }
        public string AuctionId { get; set; }
    }
}
