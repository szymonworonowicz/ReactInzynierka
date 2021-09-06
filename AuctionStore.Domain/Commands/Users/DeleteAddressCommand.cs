using AuctionStore.Infrastructure.DB;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Users
{
    public class DeleteAddressCommand : IRequest<bool>
    {
        public Guid AddressId { get; set; }

        public class DeleteAddressCommandHandler : IRequestHandler<DeleteAddressCommand, bool>
        {
            private readonly DataContext context;

            public DeleteAddressCommandHandler(DataContext context)
            {
                this.context = context;
            }

            public async Task<bool> Handle(DeleteAddressCommand request, CancellationToken cancellationToken)
            {
                var target = await context.Addresses.FirstOrDefaultAsync(x => x.Id == request.AddressId, cancellationToken);
                if (target == null)
                {
                    return false;
                }

                target.IsDeleted = true;
                await context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}