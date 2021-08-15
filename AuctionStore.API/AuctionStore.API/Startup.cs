using AuctionStore.API.DIConfig;
using AuctionStore.API.Middleware;
using AuctionStore.Infrastructure.DB;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Microsoft.OpenApi.Models;
using Newtonsoft.Json.Serialization;

namespace AuctionStore.API
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.ConfigApi(Configuration);


            services.AddDbContext<DataContext>(opt =>
            {
                string connectionString = Configuration.GetConnectionString("DataContext");
                opt.UseSqlServer(connectionString, options =>
                {
                    options.MigrationsAssembly("AuctionStore.Infrastructure");
                });
            });

            services.AddControllers(opt =>
            {
                opt.EnableEndpointRouting = false;
                //opt.Filters.Add(typeof(ValidateModelStateattribute))
            })
                .AddNewtonsoftJson(opt =>
            {
                opt.SerializerSettings.ContractResolver = new DefaultContractResolver();
                opt.UseCamelCasing(true);
            });

            services.AddRouting(options => options.LowercaseUrls = true);
            services.AddResponseCaching();

            services.ConfigureDI(Configuration);

        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, ILogger<Startup> logger)
        {
            app.UseStaticFiles();
            //app.ueWebApiCommon();
            app.UseCors("CorsPolicy");
            app.UseMiddleware<DomainExceptionMiddleware>();
            app.UseMvc();

            logger.LogInformation("App started");

            //if (env.IsDevelopment())
            //{
            //    app.UseDeveloperExceptionPage();
            //    app.UseSwagger();
            //    app.UseSwaggerUI(c => c.SwaggerEndpoint("/swagger/v1/swagger.json", "AuctionStore.API v1"));
            //}

            //app.UseHttpsRedirection();

            //app.UseRouting();

            //app.UseAuthorization();

            //app.UseEndpoints(endpoints =>
            //{
            //    endpoints.MapControllers();
            //});
        }
    }
}
