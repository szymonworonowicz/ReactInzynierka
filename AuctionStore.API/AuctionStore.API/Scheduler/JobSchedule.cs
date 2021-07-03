using System;

namespace AuctionStore.API.Scheduler
{
    public  class JobSchedule 
    {
        public readonly Type JobType;
        public readonly string CronExpression;
        public readonly bool runAtStartup;

        public JobSchedule(Type jobType, string cronExpression, bool runAtStartup)
        {
            JobType = jobType;
            CronExpression = cronExpression;
            this.runAtStartup = runAtStartup;
        }
    }
}