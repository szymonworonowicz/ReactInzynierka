using AuctionStore.Domain.Commands.Image;
using AuctionStore.Domain.Queries.File;
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
    public class FileController : BaseController<FileController>
    {
        public FileController(IMediator mediator, ILoggerFactory loggerFactory) : base(mediator, loggerFactory)
        {

        }

        [HttpPost("addImage")]
        public async Task<IActionResult> AddImageAsync([FromForm] AddImageCommand command)
        {
            var result = await CommandAsync(command);

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));

        }

        [HttpPost("deleteImage")]
        public async Task<IActionResult> DeleteImageAsync([FromBody] DeleteImageCommand command)
        {
            var result = await CommandAsync(command);


            return result !=  false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("getAuctionMainImage")]
        public async Task<IActionResult> GetAuctionMainImageAsync([FromBody] GetAuctionMainImageQuery query)
        {
            var result = await QueryAsync(query);

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("getAuctionImages")]
        public async Task<IActionResult> GetAuctionImagesAsync([FromBody] GetAuctionImagesQuery query)
        {
            var result = await QueryAsync(query);

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));

        }
    }
}
