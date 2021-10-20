using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace AuctionStore.Infrastructure.Services.Payment.DotpayDtos
{
    public class DotpayPayer
    {
        [JsonProperty("first_name")]
        public string Name { get; set; }

        [JsonProperty("last_name")]
        public string Surname { get; set; }

        [JsonProperty("email")]
        [DataType(DataType.EmailAddress)]
        public string Email { get; set; }
    }
}
