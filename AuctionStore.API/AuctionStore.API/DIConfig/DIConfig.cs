using AuctionStore.API.Scheduler;
using MediatR;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NetCore.AutoRegisterDi;
using System;
using System.Linq;
using AuctionStore.Domain.Repositories;

namespace AuctionStore.API.DIConfig
{
    public static class DiConfig
    {
        public static void ConfigureDi(this IServiceCollection services , IConfiguration config)
        {
            var infrastructure = AppDomain.CurrentDomain.Load("AuctionStore.Infrastructure");
            var domain = AppDomain.CurrentDomain.Load("AuctionStore.Domain");
            var api = AppDomain.CurrentDomain.Load("AuctionStore.API");


            services.AddMediatR(domain);
            services.AddAutoMapper(infrastructure, api);

            services.RegisterAssemblyPublicNonGenericClasses(infrastructure)
                .Where(x => x.Name.EndsWith("Service"))
                .AsPublicImplementedInterfaces();

            services.RegisterAssemblyPublicNonGenericClasses(infrastructure)
                .Where(x => x.Name.EndsWith("Repository") && !x.Name.Contains("SendEmailRepository"))
                .AsPublicImplementedInterfaces();

            services.AddSingleton<ISendEmailRepository, SendEmailRepository>();

            services.AddSingleton<IHttpContextAccessor,HttpContextAccessor>();

            var schedulerOption = new SchedulerOptions();
            config.GetSection("Scheduler").Bind(schedulerOption);
            services.RegisterJobs(schedulerOption);

            services.AddSignalR(options => {
                options.EnableDetailedErrors = true;
            });

            //services.RegisterSignalRComponents();
        }

        //private static void RegisterSignalRComponents(this IServiceCollection services)
        //{
        //    services.AddSingleton<IWebSocketClientService, WebSocketClientService>();
        //    services.AddSingleton<ISignalRMessageRepository, SignalRMessageRepository>();
        //    services.AddSingleton<ISignalRClientService, SignalRClientService>();
        //}
    }
}
