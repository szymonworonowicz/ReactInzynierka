using AuctionStore.Infrastructure.Dtos;
using System.Collections.Generic;
using System.Security.Claims;

namespace AuctionStore.Infrastructure.Services.Auth
{
    public interface IAuthService
    {
        string CreatePasswordHash(string password);
        JwtUserTokensDto GenerateUserToken(string userId, string userLogin, string userName, List<string> userRoles, List<Claim> additionalClaims = null);
        bool VerifyPassword(string password, string passwordHash);
    }
}