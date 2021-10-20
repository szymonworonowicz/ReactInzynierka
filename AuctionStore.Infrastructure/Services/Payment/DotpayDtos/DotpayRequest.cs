using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Services.Payment.DotpayDtos
{
    public class DotpayRequest
    {
        [JsonProperty("amount")]
        public string Amount { get; set; }

        [JsonProperty("currency")]
        public string Currency { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("control")]
        public string Control { get; set; }

        [JsonProperty("url")]
        public string Url { get; set; }

        [JsonProperty("urlc")]
        public string Urlc { get; set; }

        [JsonProperty("ignore_last_payment_channel")]
        public int Ignore_last_payment_channel { get; set; }

        [JsonProperty("language")]
        public string Language { get; set; }

        [JsonProperty("buttontext")]
        public string ButtonText { get; set; } = "Wróć do sklepu";

        [JsonProperty("payer")]
        public DotpayPayer Payer { get; set; }

    }
}
