using System;

namespace AuctionStore.Infrastructure.Dtos
{
    public class UpdateMessageStateDto
    {
        public Guid MessageId { get; set; }
        public bool IsReaded { get; set; }
    }
}