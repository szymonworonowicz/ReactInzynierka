﻿using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Services.Auth;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using NSwag.Generation.AspNetCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

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
            Action<AspNetCoreOpenApiDocumentGeneratorSettings,
                IServiceProvider> swaggerConfiguration = null,
            Action<JwtBearerOptions> jwtOptions = null)
        {
            System.Net.ServicePointManager.SecurityProtocol = System.Net.SecurityProtocolType.Tls12;

            var commopOptions = new CommonOptions();
            configuration.GetSection("ApiOption").Bind(commopOptions);

            if (commopOptions.UseCors)
            {
                services.AddCors(options =>
                {
                    options.AddPolicy("CorsPolicy",
                        builder => builder.
                        WithOrigins(commopOptions.CorsOrigin).AllowAnyHeader().AllowAnyMethod());
                });
            }

            if(commopOptions.Jwt?.UseJwt ?? false)
            {
                services.AddAuthentication(
                    options =>
                    {
                        options.DefaultScheme = JwtBearerDefaults.AuthenticationScheme;
                        options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                        options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                    })
                    .AddJwtBearer(options =>
                    {
                        options.SaveToken = true;
                        options.TokenValidationParameters = JwtHandler.GetTokenValidationParameters(commopOptions.Jwt.JwtTokenIssuer, commopOptions.Jwt.JwtTokenSecretKey);

                        jwtOptions?.Invoke(options);
                    });
            }

            if(commopOptions.UseSwagger)
            {

            }

        }
    }
}