using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Services.Auth;
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
    public class UserRefreshTokenLoginCommand : IRequest<JwtUserTokensDto>
    {
        [Required]
        public string Username { get; set; }

        [Required]
        public string RefreshToken { get; set; }

        public class UserRefreshTokenLoginCommandHandler : IRequestHandler<UserRefreshTokenLoginCommand, JwtUserTokensDto>
        {
            private readonly DataContext context;
            private readonly IAuthService authService;
            private readonly AuthOptions authOptions;

            public UserRefreshTokenLoginCommandHandler(DataContext context, IAuthService authService, IOptions<AuthOptions> authOptions)
            {
                this.context = context;
                this.authService = authService;
                this.authOptions = authOptions.Value;
            }

            public async Task<JwtUserTokensDto> Handle(UserRefreshTokenLoginCommand request, CancellationToken cancellationToken)
            {
                var targetUser = await context.Users.FirstOrDefaultAsync(x => x.UserName == request.Username && !x.IsDeleted, cancellationToken);

                if (targetUser == null) return null;

                var dbRefreshToken = await context.UserTokens.AsNoTracking().FirstOrDefaultAsync(x =>
                    x.UserID == targetUser.Id && x.TokenProvider == authOptions.REFRESH_TOKEN_PROVIDER
                        && x.Name == authOptions.REFRESH_TOKEN_KEY
                        && x.Value == request.RefreshToken
                        && x.ExpirationTimeUtc > DateTime.UtcNow, cancellationToken);

                if (dbRefreshToken == null) return null;

                var userRoles = await context.UserRoles
                    .Where(x => x.UserId == targetUser.Id)
                    .Select(x => x.Role.Name)
                    .ToListAsync(cancellationToken);

                var userName = targetUser.FirstName + " " + targetUser.LastName;

                var jwtTokens = authService.GenerateUserToken(targetUser.Id.ToString(), targetUser.UserName, userName, userRoles);

                jwtTokens.RefreshToken = dbRefreshToken.Value;

                targetUser.LastLoginDateUtc = DateTime.UtcNow;

                await context.SaveChangesAsync(cancellationToken);

                return jwtTokens;
            }
        }
    }
}
