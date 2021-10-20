using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Services.Payment.DotpayDtos
{
    public class DotpayResponse
    {
        public string Href { get; set; }
        public string Payment_url { get; set; }
        public string Token { get; set; }
        public decimal Amount { get; set; }
        public string Currency { get; set; }
        public string Description { get; set; }
        public string Control { get; set; }
        public string Language { get; set; }
    }
}
