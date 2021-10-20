using AuctionStore.Infrastructure.Services.Payment.DotpayDtos;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Infrastructure.Services
{
    public interface IPaymentService
    {
        Task<string> GeneratePaymentLink(DotpayRequest request, CancellationToken cancellationToken);
    }
}
