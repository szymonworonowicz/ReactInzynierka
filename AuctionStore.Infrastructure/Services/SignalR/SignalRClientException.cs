using System;

namespace AuctionStore.Infrastructure.Services.SignalR
{
    public class SignalRClientException : Exception
    {
        public SignalRClientException(string message) : base(message)
        {
        }
    }
}
