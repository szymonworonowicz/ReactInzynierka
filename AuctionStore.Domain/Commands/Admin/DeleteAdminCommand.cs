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
    public class DeleteAdminCommand : ICommand<bool>
    {
        public Guid Id { get; set; }

        public class DeleteAdminCommandHandler : ICommandHandler<DeleteAdminCommand, bool>
        {
            private readonly DataContext context;

            public DeleteAdminCommandHandler(DataContext context)
            {
                this.context = context;
            }

            public async Task<bool> Handle(DeleteAdminCommand request, CancellationToken cancellationToken)
            {
                var target = await context.Users.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                if(target == null)
                {
                    return false;
                }

                target.IsDeleted = !target.IsDeleted;

                await context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
