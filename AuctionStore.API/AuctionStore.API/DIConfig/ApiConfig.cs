using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Services.Auth;
using AuctionStore.Infrastructure.Services.Payment;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Net;
using System.Text;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.IdentityModel.Tokens;
using Newtonsoft.Json;

namespace AuctionStore.API.DIConfig
{
    public static class ApiConfig
    {
        private class CommonOptions
        {
            public bool UseSwagger { get; set; }
            public bool UseJwt { get; set; }
            public bool UseCors { get; set; }
            public string CorsOrigin { get; set; }
            public JwtOptions Jwt { get; set; }
        }

        public static void ConfigApi(this IServiceCollection services, IConfiguration configuration,
            Action<JwtBearerOptions> jwtOptions = null)
        {
            // System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;

            var commopOptions = new CommonOptions();
            configuration.GetSection("ApiOptions").Bind(commopOptions);

            if (commopOptions.UseCors)
            {
                services.AddCors(options =>
                {
                    options.AddPolicy("CorsPolicy",
                        builder => builder
                            .AllowAnyOrigin()
                            .AllowAnyHeader().AllowAnyMethod());
                    //WithOrigins(commopOptions.CorsOrigin)
                });
            }

            if (commopOptions.UseJwt)
            {
                var bytesSecret = Encoding.UTF8.GetBytes(commopOptions.Jwt.JwtRefreshTokenSecretKey);
                services.AddAuthentication(option =>
                    {
                        option.DefaultAuthenticateScheme = "Bearer";
                        option.DefaultScheme = "Bearer";
                        option.DefaultChallengeScheme = "Bearer";
                    }
                ).AddJwtBearer(cfg =>
                {
                    cfg.RequireHttpsMetadata = false;
                    cfg.SaveToken = true;
                    cfg.TokenValidationParameters = new TokenValidationParameters()
                    {
                        ValidIssuer = "AuctionStore.API",
                        ValidAudience = "AuctionStore.API",
                        IssuerSigningKey = new SymmetricSecurityKey(bytesSecret)
                    };

                });
                
            }

            services.AddMvc();

            services.Configure<AuthOptions>(configuration.GetSection("AuthOptions"));
            services.Configure<JwtOptions>(configuration.GetSection("ApiOptions:Jwt"));
            services.Configure<WebUrlOptions>(configuration.GetSection("WebUrlOptions"));
            services.Configure<SmtpOptions>(configuration.GetSection("SmtpOptions"));
            services.Configure<ImageOptions>(configuration.GetSection("ImageOptions"));
            services.Configure<DotpayOptions>(configuration.GetSection("Dotpay"));
            services.Configure<DotpayAuthOptions>(configuration.GetSection("DotpayAuthorize"));
        }
    }
}