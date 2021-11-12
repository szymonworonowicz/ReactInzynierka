using AuctionStore.Domain.Commands.Message;
using AuctionStore.Domain.Queries.Message;
using AuctionStore.Infrastructure.Helpers;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionStore.API.Controllers
{
    public class MessageController : BaseController<MessageController>
    {
        public MessageController(IMediator mediator, ILoggerFactory loggerFactory) :base(mediator, loggerFactory) 
        {

        }

        [HttpPost]
        public async Task<IActionResult> GetPagedMessagesAsync([FromBody] PagedMessageQuery query)
        {
            var result = await QueryAsync(query);

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("delete")]
        public async Task<IActionResult> DeleteMessageAsync([FromBody] DeleteMessageCommand command)
        {
            var result = await CommandAsync(command);

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("sendMessage")]
        public async Task<IActionResult> AddMessageAsync([FromBody] AddMessageCommand command)
        {
            var result = await CommandAsync(command);

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("setMessageState")]
        public async Task<IActionResult> UpdateMessageStateAsync([FromBody] UpdateMessageStateCommand command)
        {
            var result = await CommandAsync(command);

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));

        }
    }
}
