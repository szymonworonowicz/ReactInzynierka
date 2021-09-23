using AuctionStore.Domain.Commands.Email;
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
    public class SendEmailJob : IJob
    {
        private readonly IMediator mediator;
        private readonly ILogger<SendEmailJob> logger;

        public SendEmailJob(IMediator mediator, ILogger<SendEmailJob> logger)
        {
            this.mediator = mediator;
            this.logger = logger;
        }
        public async Task Execute(IJobExecutionContext context)
        {
            logger.LogInformation($"Start Job {nameof(SendEmailJob)}");
            await mediator.Send(new SendEmailsCommand());
            logger.LogInformation($"End Job {nameof(SendEmailJob)}");

        }
    }
}
