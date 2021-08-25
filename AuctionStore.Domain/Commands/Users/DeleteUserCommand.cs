using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Enums;
using AuctionStore.Infrastructure.Exceptions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Users
{
    public class DeleteUserCommand : IRequest<bool>
    {
        [Required]
        public Guid UserId { get; set; }


        public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, bool>
        {
            private readonly DataContext context;

            public DeleteUserCommandHandler(DataContext context)
            {
                this.context = context;
            }

            public async Task<bool> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
            {
                var targetUser = await context.Users.FirstOrDefaultAsync(x => x.Id == request.UserId, cancellationToken);

                if (targetUser == null)
                    throw new DomainException((int)DictErrorCodes.UserNotFound, DictErrorCodes.UserNotFound.GetDescription());

                targetUser.IsDeleted = true;

                await context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
