﻿using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Models
{
    public class UserTemporaryPassword
    {
        public Guid Id { get; set; }

        public string Password { get; set; }

        public string Token { get; set; }

        public DateTime RequestDateUtc { get; set; }

        public Guid UserId { get; set; }

        public bool IsUsed { get; set; }
    }
}
