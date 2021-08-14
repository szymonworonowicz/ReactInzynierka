using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AuctionStore.Infrastructure.Services
{
    public interface IEmailService
    {
        Task sendRegisterEmailAsync(string callbackUrl, string email);
        Task WiningEmail(AuctionOffer winingBid);
        Task sendLosesEmail(List<AuctionOffer> losesBid);
        Task SendMessageToAuthor(string email, string message);
        Task SendNewsletterEmail(string email, List<Auction> auctions);
    }
}
