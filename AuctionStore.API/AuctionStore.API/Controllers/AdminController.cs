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
        public async Task<IActionResult> GetAdmins([FromBody] AdminHolidayCommand command)
        {
            var result = await CommandAsync(command);

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("delete")]
        public async Task<IActionResult> GetAdmins([FromBody] DeleteAdminCommand command)
        {
            var result = await CommandAsync(command);

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }
    }
}
