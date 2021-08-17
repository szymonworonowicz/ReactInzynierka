using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Helpers;
using AuctionStore.Infrastructure.Services.Auth;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Auth
{
    public class ChangePasswordCommand : IRequest<bool>
    {
        protected Guid UserId { get; set; }

        [Required]
        public string OldPassword { get; set; }

        [Required]
        [MinLength(6)]
        [MaxLength(50)]
        [RegularExpression(Constants.Password)]
        public string NewPassword { get; set; }

        public ChangePasswordCommand WithUserId (Guid userId)
        {
            this.UserId = userId;
            return this;
        }

        public class ChangePasswordCommandHandler : IRequestHandler<ChangePasswordCommand, bool>
        {
            private readonly DataContext context;
            private readonly IAuthService authService;

            public ChangePasswordCommandHandler(DataContext context, IAuthService authService)
            {
                this.context = context;
                this.authService = authService;
            }

            public async Task<bool> Handle(ChangePasswordCommand request, CancellationToken cancellationToken)
            {
                var user = await context.Users.FirstOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);

                user.PasswordHash = authService.CreatePasswordHash(request.NewPassword);

                await context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
