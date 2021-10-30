using AuctionStore.Infrastructure.DB;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Admin
{
    public class UnBanUserCommand : ICommand<bool>
    {
        public Guid Id { get; set; }

        public class UnbanUserCommandHandler : ICommandHandler<UnBanUserCommand, bool>
        {
            private readonly DataContext context;

            public UnbanUserCommandHandler(DataContext context)
            {
                this.context = context;
            }

            public async Task<bool> Handle(UnBanUserCommand request, CancellationToken cancellationToken)
            {
                var target = await context.Users.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                if (target == null)
                {
                    return false;
                }

                target.IsBanned = false;
                target.EndOffBan = null;

                await context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
