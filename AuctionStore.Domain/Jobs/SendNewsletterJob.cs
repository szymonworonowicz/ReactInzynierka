using AuctionStore.Domain.Commands.Auction;
using AuctionStore.Domain.Commands.Newsletter;
using MediatR;
using Microsoft.Extensions.Logging;
using Quartz;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Jobs
{
    [DisallowConcurrentExecution]
    public class SendNewsletterJob : IJob
    {
        private readonly IMediator mediator;
        private readonly ILogger<SendNewsletterJob> logger;

        public SendNewsletterJob(IMediator mediator, ILogger<SendNewsletterJob> logger)
        {
            this.logger = logger;
            this.mediator = mediator;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            logger.LogInformation($"Start Job {nameof(WinningAuctionMessageJob)}");
            await mediator.Send(new SendNewsletterEmailCommand());
            logger.LogInformation($"End Job {nameof(WinningAuctionMessageJob)}");
        }
    }
}
