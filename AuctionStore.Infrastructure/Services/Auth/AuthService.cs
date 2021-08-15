using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using AuctionStore.Infrastructure.Dtos;
using Microsoft.Extensions.Options;

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
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            return computedHash.SequenceEqual(passwordHashArray);
        }

        public string CreatePasswordHash(string password)
        {
            byte[] passwordSalt = Encoding.UTF8.GetBytes(authOptions.Password_Salt);
            using var hmac = new HMACSHA512(passwordSalt);
            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(password));

            return Convert.ToBase64String(computedHash);
        }

        public JwtUserTokensDto GenerateUserToken(string userId, string userLogin, string userName,
            List<string> userRoles, List<Claim> additionalClaims = null)
        {
            var customClaims = new List<Claim>();

            foreach (var userRole in userRoles) customClaims.Add(new Claim(ClaimTypes.Role, userRole));

            customClaims.Add(new Claim(ClaimTypes.UserData, userName));

            if (additionalClaims != null) customClaims.AddRange(additionalClaims);

            var tokenResponse = JwtHandler.GenerateUserTokens(userId, userLogin, customClaims, jwtOptions);

            return tokenResponse;
        }
    }
}
