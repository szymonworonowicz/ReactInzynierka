using AuctionStore.Infrastructure.Helpers;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Dtos
{
    public  class ApiResultBase
    {
        public bool Success { get; set; }

        [JsonProperty(NullValueHandling = NullValueHandling.Ignore)]
        public List<ApiError> Errors { get; set; }

        public ApiResultBase()
        {

        }
        public ApiResultBase(bool success)
        {
            Success = success;
        }

        public ApiResultBase(ApiError error)
        {
            Errors = new List<ApiError>() { error };
        }

        public ApiResultBase(List<ApiError> errors)
        {
            Errors = errors;
        }
    }
}
