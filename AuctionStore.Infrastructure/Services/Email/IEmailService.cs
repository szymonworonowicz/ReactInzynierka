using MimeKit;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Infrastructure.Services.Email
{
    public interface IEmailService
    {
        //Task sendRegisterEmailAsync(string callbackUrl, string email);
        //Task WiningEmail(AuctionOffer winingBid);
        //Task sendLosesEmail(List<AuctionOffer> losesBid);
        //Task SendMessageToAuthor(string email, string message);
        //Task SendNewsletterEmail(string email, List<Auction> auctions);
        MimeMessage CreatePasswordResetEmail(string userName, string resetUrl, string tmpPassword);
        Task SendEmail(MimeMessage message, string email, CancellationToken cancellationToken);
    }
}
