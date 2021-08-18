using AuctionStore.Infrastructure.Enums;
using AuctionStore.Infrastructure.Exceptions;
using Microsoft.AspNetCore.Mvc.Filters;
using System;
using System.Linq;

namespace AuctionStore.Infrastructure.Attributes
{
    public class AppAuthorizeAttribute : Attribute, IAuthorizationFilter
    {
        public string[] UserRoles { get; set; }
        public DictErrorCodes ErrorCode { get; set; }

        public void OnAuthorization(AuthorizationFilterContext context)
        {
            var user = context.HttpContext.User;

            if(!user.Identity.IsAuthenticated)
            {
                //context.Result = new UnauthorizedResult();
                throw new DomainException((int)ErrorCode, ErrorCode.GetDescription());
            }

            if(!UserRoles.Any(role => user.IsInRole(role)))
            {
                throw new DomainException((int)ErrorCode, ErrorCode.GetDescription());
            }

        }
    }
}
