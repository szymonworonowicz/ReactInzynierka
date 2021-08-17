using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Models;
using AuctionStore.Infrastructure.Services.Auth;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Auth
{
    public class UserLoginCommand : IRequest<JwtUserTokensDto>
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string Password { get; set; }

        public class UserLoginCommandHandler : IRequestHandler<UserLoginCommand, JwtUserTokensDto>
        {
            private readonly DataContext context;
            private readonly IAuthService authService;
            private readonly AuthOptions authOptions;

            public UserLoginCommandHandler(DataContext context, IAuthService authService,  IOptions<AuthOptions> authOptions)
            {
                this.context = context;
                this.authService = authService;
                this.authOptions = authOptions.Value;
            }

            public async Task<JwtUserTokensDto> Handle(UserLoginCommand request, CancellationToken cancellationToken)
            {
                var targetUser = await context.Users.FirstOrDefaultAsync(x => x.UserName == request.Username && !x.IsDeleted, cancellationToken);

                if (targetUser == null) return null;

                if (!authService.VerifyPassword(request.Password, targetUser.PasswordHash))
                    return null;

                var userRoles = await context.UserRoles.Where(x => x.UserId == targetUser.Id).Select(x => x.Role.Name).ToListAsync(cancellationToken);

                var userName = targetUser.FirstName + " " + targetUser.LastName;

                var tokens = authService.GenerateUserToken(targetUser.Id.ToString(), targetUser.UserName, userName, userRoles);

                var dbToken = await context.UserTokens.FirstOrDefaultAsync(x =>
                    x.UserID == targetUser.Id && x.TokenProvider == authOptions.REFRESH_TOKEN_PROVIDER
                    && x.Name == authOptions.REFRESH_TOKEN_KEY, cancellationToken);

               tokens.RefreshToken = await CheckDbTokens(dbToken, targetUser.Id, tokens.RefreshToken, cancellationToken);
                

                targetUser.LastLoginDateUtc = DateTime.UtcNow;
                await context.SaveChangesAsync(cancellationToken);

                return tokens;
            }

            private async Task<string> CheckDbTokens(UserToken dbToken, Guid userId, string refreshToken, CancellationToken ct)
            {
                if (dbToken == null)
                {
                    dbToken = new UserToken
                    {
                        UserID = userId,
                        TokenProvider = authOptions.REFRESH_TOKEN_PROVIDER,
                        Name = authOptions.REFRESH_TOKEN_KEY,
                        Value = refreshToken,
                        ExpirationTimeUtc = DateTime.UtcNow.AddDays(authOptions.REFRESH_TOKEN_VALID_DAYS)
                    };

                    await context.UserTokens.AddAsync(dbToken, ct);
                }
                else
                {
                    if(dbToken.ExpirationTimeUtc <= DateTime.UtcNow)
                    {
                        dbToken.Value = refreshToken;
                        dbToken.ExpirationTimeUtc = DateTime.UtcNow.AddDays(authOptions.REFRESH_TOKEN_VALID_DAYS);
                    }

                    else
                    {
                        return dbToken.Value;
                    }
                }

                return refreshToken;
            }
        }
    }
}
