using Newtonsoft.Json;

namespace AuctionStore.Infrastructure.Dtos
{
    public class ApiResultGeneric<T> : ApiResultBase
    {
        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public T Data { get; set; }
    }
}
