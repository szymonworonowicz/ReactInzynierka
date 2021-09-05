using AuctionStore.Infrastructure.Helpers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctionStore.Domain.Queries.Auction;

namespace AuctionStore.API.Controllers
{
    public class AuctionController : BaseController<AuctionController>
    {
        public AuctionController(IMediator mediator, ILoggerFactory loggerFactory) : base(mediator,loggerFactory)
        {

        }

        [HttpPost]
        public async Task<IActionResult> GetAuctionByCategory([FromBody] GetAuctionByCategoryPagedQuery query )
        {
            var result = await QueryAsync(query);
            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }
    }
}
