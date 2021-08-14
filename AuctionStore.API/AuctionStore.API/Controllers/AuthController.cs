using AuctionStore.Domain.Commands.Auth;
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
    [AllowAnonymous]

    public class AuthController : BaseController<AuthController>
    {
        public AuthController(IMediator medator, ILoggerFactory loggerFactory) : base(medator, loggerFactory)
        {

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(UserLoginCommand command)
        {
            var result = await CommandAsync(command);

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "login failed"));
        }

        [HttpPost("login/refresh")]

        public async Task<IActionResult> Login(UserRefreshTokenLoginCommand command)
        {
            var result = await CommandAsync(command);

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "login failed"));
        }
    }
}
