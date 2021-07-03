using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionStore.API.Scheduler
{
    public class SchedulerOptions
    {
        public bool IsEnable { get; set; }
        public List<JobScheduleOptions> JobSchedules { get; set; } = new List<JobScheduleOptions>();

        public class JobScheduleOptions
        {
            public string JobType { get; set; }
            public string CronExpression { get; set; }
            public bool IsEnable { get; set; }
            public bool RunAtStartup { get; set; }
        }
    }
}
