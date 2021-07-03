using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Quartz;
using Quartz.Spi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.API.Scheduler
{
    public class QuartzHostedService : IHostedService
    {
        private readonly ISchedulerFactory schedulerFactory;
        private readonly IJobFactory jobFactory;
        private IEnumerable<JobSchedule> jobSchedules;
        private readonly ILogger<QuartzHostedService> logger;

        public QuartzHostedService(ISchedulerFactory schedulerFactory,
            IJobFactory jobFactory,
            IEnumerable<JobSchedule> jobSchedules,
            ILogger<QuartzHostedService> logger)
        {
            this.schedulerFactory = schedulerFactory;
            this.jobFactory = jobFactory;
            this.jobSchedules = jobSchedules;
            this.logger = logger;
        }

        public IScheduler Scheduler { get; set; }

        public async Task StartAsync(CancellationToken ct)
        {
            Scheduler = await schedulerFactory.GetScheduler(ct);
            Scheduler.JobFactory = jobFactory;

            foreach(var jobSchedule in jobSchedules)
            {
                var job = CreateJob(jobSchedule);
                var trigger = CreateTrigger(jobSchedule);
                await Scheduler.ScheduleJob(job, trigger, ct);

                if(jobSchedule.runAtStartup)
                {
                    await Scheduler.TriggerJob(job.Key, ct);
                }

            }

            await Scheduler.Start(ct);

            logger.LogInformation("Scheduler started: jobs scheduled:\r\n" + string.Join("\r\n",
                jobSchedules.Select(x => x.JobType.FullName)));

        }

        public async Task StopAsync(CancellationToken ct)
        {
            await Scheduler?.Shutdown(ct);
        }

        private static IJobDetail CreateJob(JobSchedule schedule)
        {
            var jobType = schedule.JobType;

            return JobBuilder
                .Create(jobType)
                .WithIdentity(jobType.FullName)
                .WithDescription(jobType.Name)
                .Build();
        }

        private static ITrigger CreateTrigger(JobSchedule schedule)
        {
            return TriggerBuilder
                .Create()
                .WithIdentity($"{schedule.JobType.FullName}.trigger")
                .WithCronSchedule(schedule.CronExpression)
                .WithDescription(schedule.CronExpression)
                .Build();
        }
    }
}
