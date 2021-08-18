using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Services.Auth;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Auth
{
    public class ResetPasswordCommand : IRequest<bool>
    {
        [Required] public string Token { get; set; }
        [Required] public string Password { get; set; }
        [Required] public string NewPassword { get; set; }

        public class ResetPasswordCommandHandler : IRequestHandler<ResetPasswordCommand, bool>
        {
            private readonly DataContext context;
            private readonly ILogger<ResetPasswordCommand> logger;
            private readonly IAuthService authService;

            public ResetPasswordCommandHandler(DataContext context, ILogger<ResetPasswordCommand> logger, 
                IAuthService authService)
            {
                this.context = context;
                this.logger = logger;
                this.authService = authService;
            }

            public async Task<bool> Handle(ResetPasswordCommand request, CancellationToken cancellationToken)
            {
                var userTempPass = await context.UserTemporaryPasswords.FirstOrDefaultAsync(x => x.Token == request.Token && x.Password == request.Password, cancellationToken);

                if (userTempPass.RequestDateUtc.AddHours(1) < DateTime.UtcNow)
                    return true;

                if (userTempPass.IsUsed)
                    return true;

                var user = await context.Users.FirstOrDefaultAsync(x => x.Id == userTempPass.UserId && !x.IsDeleted, cancellationToken);

                if (user == null)
                    return true;

                user.PasswordHash = authService.CreatePasswordHash(request.NewPassword);
                userTempPass.IsUsed = true;

                await context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
