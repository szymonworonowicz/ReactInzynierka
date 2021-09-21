using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Infrastructure.Services.SignalR
{ 
    public class AuctionHub : Hub
    {
        public class Connection
        {
            public string UserId { get; set; }
            public string AuctionId { get; set; }
        }

        public class AuctionOffer
        {
            public string UserId { get; set; }
            public string AuctionId { get; set; }
            public decimal Offer { get; set; }
        }

        public async Task JoinGroup (Connection connection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.AuctionId);
        }

        public async Task AddOffer(AuctionOffer offer)
        {
            await Clients.Group(offer.AuctionId).SendAsync("getOffer",offer.UserId, offer.Offer.ToString());
        }
    }
}
