using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Enums
{
    public enum DictMessageType : byte
    {
        Normal =1,
        Winning =2,
        Lose = 3,
    }
}
