using AuctionStore.Domain.Commands.Newsletter;
using AuctionStore.Infrastructure.Helpers;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Threading.Tasks;

namespace AuctionStore.API.Controllers
{
    public class NewsletterController : BaseController<NewsletterController>
    {
        public NewsletterController(IMediator mediator, ILoggerFactory loggerFactory) : base(mediator, loggerFactory)
        {

        }

        [HttpPost("addNewsletter")]
        public async Task<IActionResult> AddNewsletterEmail([FromBody] AddNewsletterEmailComamand command)
        {
            var result = await CommandAsync(command);

            return result != false ? JsonSuccess(result) : JsonError(new ApiError(400, "update"));
        }
    }
}
