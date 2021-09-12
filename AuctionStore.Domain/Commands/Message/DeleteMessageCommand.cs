using AuctionStore.Infrastructure.DB;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Message
{
    public class DeleteMessageCommand : IRequest<bool>
    {
        public Guid MessageId { get; set; }

        public class DeleteMessageCommandHandler : IRequestHandler<DeleteMessageCommand, bool>
        {
            private readonly DataContext context;

            public DeleteMessageCommandHandler(DataContext context)
            {
                this.context = context;
            }

            public async Task<bool> Handle(DeleteMessageCommand request, CancellationToken cancellationToken)
            {
                var message = await context.Messages.FirstOrDefaultAsync(x => x.Id == request.MessageId, cancellationToken);

                if(message == null)
                {
                    return false;
                }

                context.Remove(message);
                await context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
