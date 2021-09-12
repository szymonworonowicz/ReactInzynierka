using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Models
{
    public class Message
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }

        public string  Text { get; set; }
        public long Added { get; set; }

        public virtual User User { get; set; }
    }
}
