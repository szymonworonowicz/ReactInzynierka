using System;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AuctionStore.Infrastructure.DB;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace AuctionStore.Domain.Commands.Users
{
    public class UnbanUserJobCommand : ICommand<Unit>
    {
        public class UnbanUserJobCommandHandler : ICommandHandler<UnbanUserJobCommand, Unit>
        {
            private readonly DataContext context;

            public UnbanUserJobCommandHandler(DataContext context)
            {
                this.context = context;
            }

            public async Task<Unit> Handle(UnbanUserJobCommand request, CancellationToken cancellationToken)
            {
                var bannedUsers = await context.Users.Where(x => x.IsBanned && x.EndOffBan < DateTime.Now)
                    .ToListAsync(cancellationToken);

                foreach (var user in bannedUsers)
                {
                    user.IsBanned = false;
                    user.EndOffBan = null;
                }

                await context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }
        }
    }
}