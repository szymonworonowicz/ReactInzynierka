using AuctionStore.API.Scheduler;
using MediatR;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NetCore.AutoRegisterDi;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;

namespace AuctionStore.API.DIConfig
{
    public static class DIConfig
    {
        public static void ConfigureDI(this IServiceCollection services , IConfiguration config)
        {
            var infrastructure = AppDomain.CurrentDomain.Load("AuctionStore.Infrastructure");
            var domain = AppDomain.CurrentDomain.Load("AuctionStore.Domain");
            var api = AppDomain.CurrentDomain.Load("AuctionStore.API");


            services.AddMediatR(domain);
            services.AddAutoMapper(infrastructure, api);

            services.RegisterAssemblyPublicNonGenericClasses(infrastructure)
                .Where(x => x.Name.EndsWith("Service"))
                .AsPublicImplementedInterfaces();

            var schedulerOption = new SchedulerOptions();
            config.GetSection("Scheduler").Bind(schedulerOption);
            services.RegisterJobs(schedulerOption);
        }
    }
}
