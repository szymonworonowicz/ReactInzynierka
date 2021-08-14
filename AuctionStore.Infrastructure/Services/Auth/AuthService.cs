using AuctionStore.Infrastructure.Dtos;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace AuctionStore.Infrastructure.Services.Auth
{
    public class AuthService : IAuthService
    {
        private readonly JwtOptions jwtOptions;
        private readonly AuthOptions authOptions;

        public AuthService(IOptions<JwtOptions> jwtOptions, IOptions<AuthOptions> authOptions)
        {
            this.jwtOptions = jwtOptions.Value;
            this.authOptions = authOptions.Value;
        }

        public bool VerifyPassword(string password, string passwordHash)
        {
            var passwordHashArray = Convert.FromBase64String(passwordHash);
            byte[] passwordSalt = Encoding.UTF8.GetBytes(authOptions.Password_Salt);

            using var hmac = new HMACSHA512(passwordSalt);
            var computedHash = hmac.ComputeHash(passwordSalt);

            return computedHash.SequenceEqual(passwordHashArray);
        }

        public string CreatePasswordHash(string password)
        {
            byte[] passwordSalt = Encoding.UTF8.GetBytes(authOptions.Password_Salt);
            using var hmac = new HMACSHA512(passwordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            return Convert.ToBase64String(computedHash);
        }

        public Task<JwtToken> GenerateUserToken(string userId, string userLogin, string userName,
            List<string> userRoles, string userWorkplaceId, List<Claim> additionalClaims = null)
        {
            var customClaims = new List<Claim>();

            foreach (var userRole in userRoles) customClaims.Add(new Claim(ClaimTypes.Role, userRole));

            customClaims.Add(new Claim(ClaimTypes.UserData, userName));
            if (userWorkplaceId != null) customClaims.Add(new Claim("userWorkplaceId", userWorkplaceId));

            if (additionalClaims != null) customClaims.AddRange(additionalClaims);

            var accessToken = JwtHandler.GenerateUserTokens(userId, userLogin, customClaims, jwtOptions);

            var tokenResponse = new JwtUserTokensDto
            {
                AccessToken = new JwtSecurityTokenHandler().WriteToken(accessToken),
                RefreshToken = CreateRefreshToken(userLogin)
            };
            return Task.FromResult(tokenResponse);
        }
    }
}
