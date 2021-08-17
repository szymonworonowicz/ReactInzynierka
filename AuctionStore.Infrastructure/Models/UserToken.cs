using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Models
{
    public class UserToken
    {
        public Guid Id { get; set; }

        public Guid UserID { get; set; }

        public string Name { get; set; }

        public string TokenProvider { get; set; }

        public string Value { get; set; }

        public DateTime ExpirationTimeUtc { get; set; }


    }
}
