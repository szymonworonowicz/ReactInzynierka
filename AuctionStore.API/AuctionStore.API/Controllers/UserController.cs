using AuctionStore.Domain.Commands.Users;
using AuctionStore.Domain.Queries.User;
using AuctionStore.Infrastructure.Attributes;
using AuctionStore.Infrastructure.Enums;
using AuctionStore.Infrastructure.Helpers;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionStore.API.Controllers
{
    //[Authorize]
    public class UserController : BaseController<UserController>
    {
        public UserController(IMediator mediator, ILoggerFactory loggerFactory) : base(mediator, loggerFactory)
        {

        }

        [HttpPost("update")]
        public async Task<IActionResult> UpdateUser([FromBody] UpdateUserCommand command)
        {
            var result = await CommandAsync(command);

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("changePassword")]
        //[AppAuthorize(ErrorCode = DictErrorCodes.UnAuthorize, UserRoles = new string[] { "User", "Admin" })]
        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordCommand command)
        {
            var result = await CommandAsync(command);

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));

        }

        [HttpPost("deleteUser")]
        public async Task<IActionResult> DeleteUser([FromBody] DeleteUserCommand command)
        {
            var result = await CommandAsync(command);

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost]
        public async Task<IActionResult> GetUser([FromBody] GetUserByIdQuery query)
        {
            var result = await QueryAsync(query);

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "register failed"));
        }

        [HttpPost("getAddress")]
        public async Task<IActionResult> GetAddress([FromBody] GetAddressesQuery query)
        {
            var result = await QueryAsync(query);

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "register failed"));
        }
        
        [HttpPost("deleteAddress")]
        public async Task<IActionResult> DeleteAddress([FromBody] DeleteAddressCommand command)
        {
            var result = await CommandAsync(command);

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("upsertAddress")]
        public async Task<IActionResult> UpsertAddress([FromBody] UpsertAddressCommand command)
        {
            var result = await CommandAsync(command);

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "register failed"));

        }

        [HttpPost("getBankAccount")]
        public async Task<IActionResult> GetBankAccount([FromBody] GetBankAccountQuery query)
        {
            var result = await QueryAsync(query);

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "register failed"));

        }

        [HttpPost("upsertBankAccount")]
        public async Task<IActionResult> UpsertBankAccount([FromBody] UpsertBankAccountCommand command)
        {
            var result = await CommandAsync(command);

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "register failed"));
        }
    }
}
