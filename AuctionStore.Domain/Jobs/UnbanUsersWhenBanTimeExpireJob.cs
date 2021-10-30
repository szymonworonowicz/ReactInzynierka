using System.Threading.Tasks;
using AuctionStore.Domain.Commands.Users;
using MediatR;
using Microsoft.Extensions.Logging;
using Quartz;

namespace AuctionStore.Domain.Jobs
{
    [DisallowConcurrentExecution]
    public class UnbanUsersWhenBanTimeExpireJob : IJob
    {
        private readonly ILogger<UnbanUsersWhenBanTimeExpireJob> logger;
        private readonly IMediator mediator;

        public UnbanUsersWhenBanTimeExpireJob(ILogger<UnbanUsersWhenBanTimeExpireJob> logger, IMediator mediator)
        {
            this.logger = logger;
            this.mediator = mediator;
        }

        public async Task Execute(IJobExecutionContext context)
        {
            logger.LogInformation($"Start Job {nameof(UnbanUsersWhenBanTimeExpireJob)}");
            await mediator.Send(new UnbanUserJobCommand());
            logger.LogInformation($"End Job {nameof(UnbanUsersWhenBanTimeExpireJob)}");

        }
    }
}