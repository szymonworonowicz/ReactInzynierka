using AuctionStore.Domain.Commands.Auth;
using AuctionStore.Infrastructure.Helpers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Threading.Tasks;

namespace AuctionStore.API.Controllers
{
    public class AuthController : BaseController<AuthController>
    {
        public AuthController(IMediator medator, ILoggerFactory loggerFactory) : base(medator, loggerFactory)
        {

        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginCommand command)
        {
            var result = await CommandAsync(command);

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "login failed"));
        }

        [HttpPost("login/refresh")]

        public async Task<IActionResult> Login([FromBody] UserRefreshTokenLoginCommand command)
        {
            var result = await CommandAsync(command);

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "login failed"));
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] CreateUserCommand command)
        {
            var result = await CommandAsync(command);

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "register failed"));

        }

        [HttpPost("{userId}/update")]
        public async Task<IActionResult> UpdateUser(Guid userId, [FromBody] UpdateUserCommand command)
        {
            var result = await CommandAsync(command.WithUserId(userId));

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("changePassword")]

        public async Task<IActionResult> ChangePassword([FromBody] ChangePasswordCommand command)
        {
            var result = await CommandAsync(command.WithUserId(GetUserId()));

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));

        }

        [HttpPost("resetPasswordRequest")]
        public async Task<IActionResult> ResetPasswordRequest([FromBody] ResetPasswordRequestCommand command)
        {
            var result = await CommandAsync(command);

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("resetPassword")]
        public async Task<IActionResult> ResetPassword([FromBody] ResetPasswordCommand command)
        {
            var result = await CommandAsync(command);

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("deleteUser")]
        public async Task <IActionResult> DeleteUser()
        {
            var result = await CommandAsync(new DeleteUserCommand(GetUserId()));

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }
    }
}
