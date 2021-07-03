using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Dtos
{
    public class ApiResultGeneric<T> : ApiResultBase
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public T Data { get; set; }
    }
}
