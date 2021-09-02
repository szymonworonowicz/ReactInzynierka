using AuctionStore.Domain.Commands.Category;
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

        [HttpPost("deleteCategory")]
        public async Task<IActionResult> DeleteCategory([FromBody] DeleteCategoryCommand command)
        {
            var result = await CommandAsync(command);

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpPost("deleteSubCategory")]
        public async Task<IActionResult> deleteSubCategory([FromBody] DeleteSubCategoryCommand command)
        {
            var result = await CommandAsync(command);

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }

        [HttpGet("getCategories")]
        public async Task<IActionResult> GetCategories()
        {
            var result = await QueryAsync(new GetCategoriesQuery());
            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "register failed"));

        }

        [HttpPost("AddCategory")]
        public async Task<IActionResult> AddCategory([FromBody] AddCategoryCommand command)
        {
            var result = await CommandAsync(command);

            return result != null ? JsonSuccess(result) : JsonError(new ApiError(400, "register failed"));

        }

    }
}
