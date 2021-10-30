using AuctionStore.Domain.Commands.Admin;
using AuctionStore.Domain.Queries.Admin;
using AuctionStore.Infrastructure.Helpers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionStore.API.Controllers
{
    public class AdminController : BaseController<AdminController>
    {
        public AdminController(IMediator mediator, ILoggerFactory loggerFactory) : base(mediator, loggerFactory)
        {
        }


        [HttpPost("bannedUser")]
        public async Task<IActionResult> GetBannedUser([FromBody] PagedBannedUserQuery query)
        {
            var result = await QueryAsync(query);
            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("unbanUser")]
        public async Task<IActionResult> UnbanUser([FromBody] UnBanUserCommand command)
        {
            var result = await CommandAsync(command);

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost()]
        public async Task<IActionResult> GetAdmins([FromBody] PagedAdminQuery query)
        {
            var result = await QueryAsync(query);
            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("holiday")]
        public async Task<IActionResult> SetAdminHoliday([FromBody] AdminHolidayCommand command)
        {
            var result = await CommandAsync(command);

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("delete")]
        public async Task<IActionResult> SetAdminDeleted([FromBody] DeleteAdminCommand command)
        {
            var result = await CommandAsync(command);

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("bannedWords")]
        public async Task<IActionResult> GetPagedBannedWords([FromBody] PagedBannedWordsQuery query)
        {
            var result = await QueryAsync(query);
            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));

        }

        [HttpPost("deleteBannedWord")]
        public async Task<IActionResult> DeleteBannedWord([FromBody] DeleteBannedWordCommand command)
        {
            var result = await CommandAsync(command);

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("addBannedWord")]
        public async Task<IActionResult> AddBannedWord([FromBody] AddBannedWordCommand command)
        {
            var result = await CommandAsync(command);
            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpGet("auctionInfo")]
        public async Task<IActionResult> GetAuctionInfo()
        {
            var result = await QueryAsync(new GetStoreConfigQuery());
            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));

        }

        [HttpPost("auctionInfo")]
        public async Task<IActionResult> GetAuctionInfo([FromBody] UpsertStoreConfigCommand command)
        {
            var result = await CommandAsync(command);

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));

        }

        [HttpPost("banUser")]
        public async Task<IActionResult> BanUser([FromBody] BanUserCommand command)
        {
            var result = await CommandAsync(command);

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }
    }

}
