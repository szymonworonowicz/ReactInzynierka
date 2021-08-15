using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Services.Auth;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
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
            private readonly IMapper mapper;

            public UserLoginCommandHandler(DataContext context, IAuthService authService, IMapper mapper)
            {
                this.context = context;
                this.authService = authService;
                this.mapper = mapper;
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

                targetUser.LastLoginDateUtc = DateTime.UtcNow;
                await context.SaveChangesAsync(cancellationToken);

                return tokens;
            }
        }
    }
}
