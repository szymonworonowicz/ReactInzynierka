using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Dtos
{
    public class MessageDto
    {
        public Guid Id { get; set; }
        public string Text { get; set; }
        public long Added { get; set; }
    }
}
