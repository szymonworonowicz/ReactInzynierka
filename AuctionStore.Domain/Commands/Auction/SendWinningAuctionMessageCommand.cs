using AuctionStore.Domain.Repositories;
using AuctionStore.Infrastructure.CollectionExtensions;
using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Enums;
using AuctionStore.Infrastructure.Services.Email;
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
    public class SendWinningAuctionMessageCommand : IRequest
    {
        public class SendWinningAuctionMessageCommandHandler : IRequestHandler<SendWinningAuctionMessageCommand>
        {
            private readonly DataContext context;
            private readonly ISendEmailRepository emailRepository;
            private readonly IOptions<SmtpOptions> smtpOptions;

            public SendWinningAuctionMessageCommandHandler(DataContext context, ISendEmailRepository emailRepository, IOptions<SmtpOptions> smtpOptions)
            {
                this.context = context;
                this.emailRepository = emailRepository;
                this.smtpOptions = smtpOptions;
            }

            public async Task<Unit> Handle(SendWinningAuctionMessageCommand request, CancellationToken cancellationToken)
            {
                var auctions = await context.Auctions
                    .Where(x => x.Status == AuctionStatus.New)
                    .Where(x => x.TimeStampEnd < DateTimeOffset.Now.ToUnixTimeSeconds())
                    .ToListAsync(cancellationToken);

                foreach (var auctionInfo in auctions)
                {
                    auctionInfo.Status = AuctionStatus.Finish;

                    var maxOffer = await context.AuctionOffer
                        .Where(x => x.AuctionId == auctionInfo.Id)
                        .Include(x => x.user)
                        .OrderByDescending(x => x.NewPrice)
                        .FirstOrDefaultAsync(cancellationToken);

                    var emailModel = new WinningAuctionMessageModel(smtpOptions)
                    {
                        AuctionName = auctionInfo.Title,
                        Price = maxOffer.NewPrice,
                        To = maxOffer.user.Email,
                        UserName= maxOffer.user.FirstName
                    };


                    emailRepository.AddMessage(emailModel);

                    await AddMessage(auctionInfo, cancellationToken, true);
                    await AddLosingEmails(auctionInfo, maxOffer.UserId, cancellationToken);
                }
                await context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }

            private async Task AddLosingEmails(Infrastructure.Models.Auction auction, Guid maxOfferUserId, CancellationToken cancellationToken)
            {
                var losingOfferts = await context.AuctionOffer
                    .Where(x => x.AuctionId == auction.Id)
                    .Where(x => x.UserId != maxOfferUserId)
                    .Include(x => x.user)
                    .ToListAsync(cancellationToken);

                var distincts = losingOfferts.DistinctBy(x => x.UserId);

                foreach (var losing in distincts)
                {
                    var emailModel = new LosingAuctionMessageModel(smtpOptions)
                    {
                        AuctionName = auction.Title,
                        To = losing.user.Email,
                        UserName = losing.user.FirstName
                    };
                    emailRepository.AddMessage(emailModel);
                    await AddMessage(auction, cancellationToken);
                }

            }

            private async Task AddMessage(Infrastructure.Models.Auction auction, CancellationToken cancellationToken, bool isWinning = false)
            {
                await context.Messages.AddAsync(new Infrastructure.Models.Message
                {
                    Added = DateTimeOffset.UtcNow.ToUnixTimeSeconds(),
                    AuctionId = auction.Id,
                    Text = auction.Title,
                    MessageType = isWinning ? DictMessageType.Winning : DictMessageType.Lose,
                    UserId = auction.UserId
                }, cancellationToken);
            }
        }
    }
}
