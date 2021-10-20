using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Services.Payment
{
    public class DotpayOptions
    {
        public string Pin { get; set; }
        public int Id { get; set; }
        public string Url { get; set; }
        public string Urlc { get; set; }

    }
}
