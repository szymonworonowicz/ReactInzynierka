using MimeKit;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Infrastructure.Services.Email
{
    public interface IEmailService
    {
        //Task SendNewsletterEmail(string email, List<Auction> auctions);
        Task SendEmail(MimeMessage message, string email, CancellationToken cancellationToken);
    }
}
