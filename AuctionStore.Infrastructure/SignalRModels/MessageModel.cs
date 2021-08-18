using System;

namespace AuctionStore.Infrastructure.SignalRModels
{
    public class MessageModel 
    {
        public Guid MessageId { get; set; }
        public string To { get; set; }


        public MessageModel()
        {
            this.MessageId = Guid.NewGuid();
        }
    }
}
