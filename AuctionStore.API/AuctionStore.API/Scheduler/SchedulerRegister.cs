using Microsoft.Extensions.DependencyInjection;
using Quartz;
using Quartz.Impl;
using Quartz.Spi;
using System;
using System.Linq;

namespace AuctionStore.API.Scheduler
{
    public static class SchedulerRegister
    {
        public static void RegisterJobs(this IServiceCollection services, SchedulerOptions options)
        {
            services.AddHostedService<QuartzHostedService>();
            services.AddSingleton<IJobFactory, ScopedJobFactory>();
            services.AddSingleton<ISchedulerFactory, StdSchedulerFactory>();

            foreach (var jobSchedule in options.JobSchedules.Where(j => j.IsEnable))
            {
                var type = Type.GetType(jobSchedule.JobType, true);

                services.AddSingleton(new JobSchedule(type, jobSchedule.CronExpression, jobSchedule.RunAtStartup));

                services.AddScoped(type);

            }
        }
    }
}
