using AuctionStore.Infrastructure.Helpers;
using System;

namespace AuctionStore.Infrastructure.Exceptions
{
    public class DomainException : Exception
    {
        public DomainException(long? ErrorCode, string message) : base(message)
        {
            this.ErrorCode = ErrorCode;
        }

        public long? ErrorCode { get; }
    }
}
