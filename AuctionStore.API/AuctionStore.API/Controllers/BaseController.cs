using AuctionStore.Infrastructure.Dtos;
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
    [Route("api/[controller]s")]
    [ApiController]

    public abstract class BaseController<C> : ControllerBase
    {
        protected readonly IMediator mediator;
        protected readonly ILogger<C> logger;

        protected BaseController(IMediator mediator, ILoggerFactory loggerFactory)
        {
            this.mediator = mediator;
            this.logger = loggerFactory.CreateLogger<C>();
        }

        protected async Task<TResult> QueryAsync<TResult>(IRequest<TResult> query)
        {
            return await mediator.Send(query);
        }

        protected async Task<TResult> CommandAsync<TResult>(IRequest<TResult> command)
        {
            return await mediator.Send(command);
        }

        [NonAction]
        protected JsonResult JsonSuccess()
        {
            return new JsonResult(new ApiResultBase(true));
        }

        [NonAction]
        protected JsonResult Json(bool success)
        {
            return new JsonResult(new ApiResultBase(success)) { StatusCode = success ? 200 : 400 };
        }

        [NonAction]
        protected JsonResult JsonSuccess<T>(T data)
        {
            return new JsonResult(new ApiResultGeneric<T>() { Data = data, Success = true });
        }

        [NonAction]
        protected JsonResult JsonError()
        {
            return new JsonResult(new ApiResultBase(false)) { StatusCode = 400 };
        }

        [NonAction]
        protected JsonResult JsonError(ApiError error)
        {
            return new JsonResult(new ApiResultBase(error)) { StatusCode = 400 };
        }

    }

}
