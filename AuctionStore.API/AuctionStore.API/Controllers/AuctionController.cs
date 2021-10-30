using AuctionStore.Infrastructure.Helpers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AuctionStore.Domain.Queries.Auction;
using AuctionStore.Domain.Commands;
using AuctionStore.Domain.Commands.Auction;

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

        [HttpGet("auctionInfo")]
        public async Task<IActionResult> GetAuctionInfo()
        {
            var result = await QueryAsync(new GetAuctionInfoQuery());
            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));

        }

        [HttpPost("addAuction")]
        public async Task<IActionResult> AddAuction([FromBody] AddAuctionCommand command)
        {
            var result = await CommandAsync(command);

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("getAuction")]
        public async Task<IActionResult> GetAuction([FromBody] GetAuctionQuery query)
        {
            var result = await QueryAsync(query);

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }
        
        [HttpPost("deleteAuction")]
        public async Task<IActionResult> DeleteAuction([FromBody] DeleteAuctionCommand command)
        {
            var result = await CommandAsync(command);

            return result ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("userAuction")]
        public async Task<IActionResult> AddAuction([FromBody] GetUserAuctionPagedQuery query)
        {
            var result = await QueryAsync(query);

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("confirmAuctionDelivery")]
        public async Task<IActionResult> ConfirmAuction([FromBody] ConfirmAuctionCommand command)
        {
            var result = await CommandAsync(command);
            
            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("checkBadWords")]
        public async Task<IActionResult> CheckBadWords([FromBody] CheckBadWordsCommand command)
        {
            var result = await CommandAsync(command);

            return result ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpGet("getNewestAuctions")]
        public async Task<IActionResult> GetNewestAuctions()
        {
            var result = await QueryAsync(new GetNewestAuctionsQuery());
            
            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));

        }
        [HttpGet("getTrendingAuctions")]
        public async Task<IActionResult> GetTrendingAuctions()
        {
            var result = await QueryAsync(new GetTrendingAuctionsQuery());
            
            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));

        }
        
    }
}
