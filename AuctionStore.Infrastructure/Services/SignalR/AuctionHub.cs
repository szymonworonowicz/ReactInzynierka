using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Services.SignalR.SignalRMessages;
using Microsoft.AspNetCore.SignalR;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using System.Transactions;

namespace AuctionStore.Infrastructure.Services.SignalR
{
    public class AuctionHub : Hub
    {
        private readonly DataContext context;

        public AuctionHub(DataContext context)
        {
            this.context = context;
        }

        public async Task JoinGroup(Connection connection)
        {
            await Groups.AddToGroupAsync(Context.ConnectionId, connection.AuctionId);
        }

        public async Task AddOffer(AuctionOffer offer)
        {
            string sql = "EXEC dbo.AddOffer @AuctionId, @UserId, @NewPrice, @TimeStamp";

            var sqlparams = new List<SqlParameter>
            {
                new SqlParameter{ ParameterName = "@AuctionId", Value = offer.AuctionId, DbType = DbType.Guid},
                new SqlParameter{ ParameterName = "@UserId", Value = offer.UserId, DbType = DbType.Guid},
                new SqlParameter{ ParameterName = "@NewPrice", Value = offer.Offer, DbType = DbType.Decimal},
                new SqlParameter{ ParameterName = "@TimeStamp", Value = DateTimeOffset.Now.ToUnixTimeSeconds(), DbType = DbType.Int64},
            };

            context.Database.ExecuteSqlRaw(sql, sqlparams);

            await Clients.Group(offer.AuctionId.ToString()).SendAsync("getOffer", offer.UserId, offer.Offer.ToString());
        }
    }
}
