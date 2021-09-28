using AuctionStore.Domain.Repositories;
using AuctionStore.Infrastructure.CollectionExtensions;
using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Enums;
using AuctionStore.Infrastructure.Services.Email.EmailMessages;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Auction
{
    public class DeleteAuctionCommand : IRequest<bool>
    {
        public Guid AuctionId { get; set; }

        public class DeleteAuctionCommandHandler : IRequestHandler<DeleteAuctionCommand, bool>
        {
            private readonly DataContext context;
            private readonly ISendEmailRepository emailRepository;
            private readonly IOptions<SmtpOptions> smtpOptions;

            public DeleteAuctionCommandHandler(DataContext context, ISendEmailRepository emailRepository, IOptions<SmtpOptions> smtpOptions)
            {
                this.context = context;
                this.emailRepository = emailRepository;
                this.smtpOptions = smtpOptions;
            }

            public async Task<bool> Handle(DeleteAuctionCommand request, CancellationToken cancellationToken)
            {
                var target = await context.Auctions.FirstOrDefaultAsync(x => x.Id == request.AuctionId, cancellationToken);

                if (target == null)
                {
                    return false;
                }
                target.Status = AuctionStatus.Canceled;

                var users = await context.AuctionOffer
                    .Include(x => x.user)
                    .Where(x => x.AuctionId == request.AuctionId)
                    .Select(x => new
                    {
                        userId = x.user.Id,
                        name = x.user.UserName,
                        email = x.user.Email
                    }).ToListAsync(cancellationToken);

                var distinctUser = users.DistinctBy(x => x.userId);


                foreach (var user in distinctUser)
                {
                    emailRepository.AddMessage(new CancelAuctionMessageModel(smtpOptions)
                    {
                        AuctionName = target.Title,
                        To = user.email,
                        UserName = user.name
                    });
                }


                await context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
