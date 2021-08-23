using AuctionStore.Domain.Queries.Categories;
using AuctionStore.Infrastructure.Attributes;
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
    public class CategoryController : BaseController<CategoryController>
    {
        public CategoryController(IMediator mediator, ILoggerFactory loggerFactory) : base(mediator,loggerFactory)
        {

        }

        [HttpGet]
        public async Task<IActionResult> GetAll()
        {
            var result = await QueryAsync(new GetAllCategoriesQuery());

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "register failed"));
        }
    }
}
