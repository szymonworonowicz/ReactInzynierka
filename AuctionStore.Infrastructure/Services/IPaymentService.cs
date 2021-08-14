using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Services
{
    public interface IPaymentService
    {
        Task<string> Pay(DotpayRequest request);
    }
}
