using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Helpers
{
    public class ApiError
    {
        public long? Code { get; set; }
        public string Message { get; set; }

        public ApiError()
        {

        }

        public ApiError(long? code, string message)
        {
            Code = code;
            Message = message;
        }
    }
}
