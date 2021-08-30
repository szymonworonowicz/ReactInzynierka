using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Models
{
    public class BannedWord
    {
        public Guid Id { get; set; }
        public string Word { get; set; }
        public DateTime Added { get; set; }
    }
}
