using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Enums;
using AuctionStore.Infrastructure.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Admin
{
    public class DeleteBannedWordCommand : IRequest<bool>
    {
        public Guid Id { get; set; }

        public class DeleteBannedWordCommandHandler : IRequestHandler<DeleteBannedWordCommand, bool>
        {
            private readonly DataContext context;

            public DeleteBannedWordCommandHandler(DataContext context)
            {
                this.context = context;
            }

            public async Task<bool> Handle(DeleteBannedWordCommand request, CancellationToken cancellationToken)
            {
                var bannedWord = await context.BannedWords.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                if(bannedWord == null)
                {
                    throw new DomainException((long)DictErrorCodes.BannedWordDontExist, DictErrorCodes.BannedWordDontExist.GetDescription());
                }

                context.Remove(bannedWord);
                await context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
