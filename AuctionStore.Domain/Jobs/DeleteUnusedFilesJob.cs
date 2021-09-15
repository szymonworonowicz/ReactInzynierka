using AuctionStore.Domain.Commands.Image;
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
    public class DeleteUnusedFilesJob : IJob
    {
        private readonly IMediator mediator;
        private readonly ILogger<DeleteUnusedFilesJob> logger;

        public DeleteUnusedFilesJob(IMediator mediator, ILogger<DeleteUnusedFilesJob> logger)
        {
            this.mediator = mediator;
            this.logger = logger;
        }
        public async Task Execute(IJobExecutionContext context)
        {
            logger.LogInformation($"Start Job {nameof(DeleteUnusedFilesJob)}");
            await mediator.Send(new DeleteUnusedFilesJobCommand());
            logger.LogInformation($"End Job {nameof(DeleteUnusedFilesJob)}");
        }
    }
}
