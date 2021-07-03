﻿using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Enums
{
    public enum AuctionStatus : byte
    {
        New = 1,
        Canceled = 2,
        Finish = 3,
        Payed = 4
    }
}
