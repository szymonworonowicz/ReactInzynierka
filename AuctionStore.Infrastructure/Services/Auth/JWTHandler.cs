using AuctionStore.Infrastructure.Dtos;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;

namespace AuctionStore.Infrastructure.Services.Auth
{
    public class JwtHandler
    {
        public static JwtUserTokensDto GenerateUserTokens(string userId, string userLogin, List<Claim> customClaims, JwtOptions options)
        {
            GenerateUserTokensValidateOptions(options);

            var claims = new List<Claim>();


            if(customClaims != null)
            {
                foreach(var claim in customClaims)
                {
                    claims.Add(claim);
                }
            }

            var accessToken = DoGenerateToken(options.JwtTokenIssuer, options.JwtTokenSecretKey, options.AccessTokenExpiresInMinutes, userId, userLogin, claims);
            var refreshToken = DoGenerateToken(options.JwtTokenIssuer, options.JwtRefreshTokenSecretKey, options.RefreshTokenExpiresInMinutes.Value, userId, userLogin, claims);

            var tokenHandler = new JwtSecurityTokenHandler();

            return new JwtUserTokensDto
            {
                AccessToken = tokenHandler.WriteToken(accessToken),
                RefreshToken = tokenHandler.WriteToken(refreshToken)
            };
        }

        public static void GenerateUserTokensValidateOptions(JwtOptions options)
        {
            if (string.IsNullOrEmpty(options.JwtTokenSecretKey) || options.JwtTokenSecretKey.Length < 16)
            {
                throw new ArgumentException($"Parameter {nameof(options.JwtTokenSecretKey)} must have more than 15 chars");
            }

            if (string.IsNullOrEmpty(options.JwtRefreshTokenSecretKey) || options.JwtRefreshTokenSecretKey.Length < 16)
            {
                throw new ArgumentException($"Parameter {nameof(options.JwtTokenSecretKey)} must have more than 15 chars");
            }

            if (options.JwtRefreshTokenSecretKey.Equals(options.JwtTokenSecretKey))
            {
                throw new ArgumentException($"Parameter {nameof(options.JwtRefreshTokenSecretKey)} must be different than {nameof(options.JwtTokenSecretKey)}");
            }

            if (options.AccessTokenExpiresInMinutes <= 0)
            {
                throw new ArgumentException($"Parameter {nameof(options.AccessTokenExpiresInMinutes)} must be more than 0");
            }

            if (!options.RefreshTokenExpiresInMinutes.HasValue || options.RefreshTokenExpiresInMinutes <= 0)
            {
                throw new ArgumentException($"Parameter {nameof(options.RefreshTokenExpiresInMinutes)} must be more than 0");
            }

            if (options.AccessTokenExpiresInMinutes >= options.RefreshTokenExpiresInMinutes.Value)
            {
                throw new ArgumentException($"Parameter {nameof(options.AccessTokenExpiresInMinutes)} must be higher than {nameof(options.RefreshTokenExpiresInMinutes)}");
            }
        }

        public static SecurityToken DoGenerateToken(string JwtTokenIssuer, string secretKey, int expireInMinutes, string userId, string userLogin, List<Claim> customClaims)
        {
            var claims = new List<Claim>()
            {
                new Claim(ClaimTypes.NameIdentifier, userId),
                new Claim(ClaimTypes.Name, userLogin)
            };

            if(customClaims != null)
            {
                if(customClaims.Any())
                {
                    claims.AddRange(customClaims);
                }
            }

            var Key = GetSymetricSecurityKey(secretKey);

            var credentials = new SigningCredentials(Key, SecurityAlgorithms.HmacSha512Signature);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddMinutes(expireInMinutes),
                SigningCredentials = credentials,
                Issuer = JwtTokenIssuer
            };

            var tokenHandler = new JwtSecurityTokenHandler();

            return tokenHandler.CreateToken(tokenDescriptor);
        }

        public static bool ValidateToken(string token, string jwtTokenIssuer, string secretKey)
        {
            var tokenValidatorsParameters = GetTokenValidationParameters(jwtTokenIssuer, secretKey);
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                _ = tokenHandler.ValidateToken(token, tokenValidatorsParameters, out SecurityToken validatedToken);
                return true;

            }
            catch 
            {

                return false;
            }
        }

        public static List<Claim> GetTokenClaims(string token, string jwtTokenIssuer, string secretKey)
        {
            var tokenValidatorsParameters = GetTokenValidationParameters(jwtTokenIssuer, secretKey);
            var tokenHandler = new JwtSecurityTokenHandler();

            try
            {
                ClaimsPrincipal tokenValid = tokenHandler.ValidateToken(token, tokenValidatorsParameters, out SecurityToken validatedToken);
                return tokenValid.Claims.ToList();
            }
            catch (Exception ex)
            {

                throw ex;
            }
        }

        public static TokenValidationParameters GetTokenValidationParameters(string jwtTokenIssuer, string secretKey)
        {
            return new TokenValidationParameters
            {
                ValidateIssuerSigningKey = true,
                ValidateLifetime = true,
                IssuerSigningKey = new SymmetricSecurityKey(
                                Encoding.ASCII.GetBytes(secretKey)),
                ValidateIssuer = true,
                ValidIssuer = jwtTokenIssuer,
                //ValidateAudience = false,
                ClockSkew = TimeSpan.Zero,
                //RequireSignedTokens = true,
                //RequireExpirationTime = true
            };
        }
        private static SecurityKey GetSymetricSecurityKey(string secretKey)
        {
            return new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey));
        }

    }
}
