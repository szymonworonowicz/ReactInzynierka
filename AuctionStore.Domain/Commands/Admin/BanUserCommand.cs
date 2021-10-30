using System;
using System.Threading;
using System.Threading.Tasks;
using AuctionStore.Infrastructure.DB;
using Microsoft.EntityFrameworkCore;

namespace AuctionStore.Domain.Commands.Admin
{
    public class BanUserCommand : ICommand<bool>
    {
        public Guid UserId { get; set; }

        public class BanUserCommandHandler : ICommandHandler<BanUserCommand, bool>
        {
            private readonly DataContext context;

            public BanUserCommandHandler(DataContext context)
            {
                this.context = context;
            }

            public async Task<bool> Handle(BanUserCommand request, CancellationToken cancellationToken)
            {
                var target = await context.Users.FirstOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);

                if (target == null)
                {
                    return false;
                }

                target.IsBanned = true;
                target.EndOffBan = DateTime.Now.AddDays(7);

                await context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}