using AuctionStore.Domain.Commands.Auction;
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
    public class  WinningAuctionMessageJob : IJob
    {
        private readonly IMediator mediator;
        private readonly ILogger<WinningAuctionMessageJob> logger;

        public WinningAuctionMessageJob(IMediator mediator , ILogger<WinningAuctionMessageJob> logger)
        {
            this.mediator = mediator;
            this.logger = logger;
        }
        public async Task Execute(IJobExecutionContext context)
        {
            logger.LogInformation($"Start Job {nameof(WinningAuctionMessageJob)}");
            await mediator.Send(new SendWinningAuctionMessageCommand());
            logger.LogInformation($"End Job {nameof(WinningAuctionMessageJob)}");

        }
    }
}
