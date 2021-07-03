using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Exceptions;
using AuctionStore.Infrastructure.Helpers;
using Microsoft.AspNetCore.Http;
using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace AuctionStore.API.Middleware
{
    public class DomainExceptionMiddleware
    {
        private readonly RequestDelegate next;

        public DomainExceptionMiddleware(RequestDelegate next)
        {
            this.next = next;
        }

        public async Task Invoke(HttpContext context)
        {
            try
            {
                await next.Invoke(context);
            }
            catch (DomainException e)
            {
                var response = new ApiResultBase(new ApiError(e.Error.Code, e.Error.Message));
                int statusCode = 400;

                switch (e.Error.Code)
                {
                    case 404: statusCode = 404; break;
                    default: break;
                }

                context.Response.StatusCode = statusCode;
                context.Response.ContentType = "text/json";

                var json = JsonConvert.SerializeObject(response, new JsonSerializerSettings()
                {
                    ContractResolver = new CamelCasePropertyNamesContractResolver()
                });

                var jsonBytes = Encoding.UTF8.GetBytes(json);
                await context.Response.Body.WriteAsync(jsonBytes);
            }
        }
    }
}
