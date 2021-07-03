using Microsoft.Extensions.DependencyInjection;
using Quartz;
using Quartz.Spi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionStore.API.Scheduler
{
    public class ScopedJobFactory : IJobFactory
    {
        private readonly IServiceProvider rootserviceProvider;

        public ScopedJobFactory(IServiceProvider rootserviceProvider)
        {
            this.rootserviceProvider = rootserviceProvider ?? throw new ArgumentNullException(nameof(rootserviceProvider));
        }

        public IJob NewJob(TriggerFiredBundle bundle, IScheduler scheduler)
        {
            var jobType = bundle.JobDetail.JobType;

            var scope = rootserviceProvider.CreateScope();

            var job = (IJob)scope.ServiceProvider.GetRequiredService(jobType);

            return new ScopedJob(scope, job);
        }

        public void ReturnJob(IJob job)
        {
            (job as IDisposable).Dispose();
        }

        private class ScopedJob : IJob, IDisposable
        {
            private readonly IServiceScope scope;
            private readonly IJob innerJob;

            public ScopedJob(IServiceScope scope, IJob innerJob)
            {
                this.scope = scope;
                this.innerJob = innerJob;
            }

            public Task Execute(IJobExecutionContext context) => innerJob.Execute(context);

            public void Dispose()
            {
                scope.Dispose();
                (innerJob as IDisposable)?.Dispose();
            }
        }
    }
}
