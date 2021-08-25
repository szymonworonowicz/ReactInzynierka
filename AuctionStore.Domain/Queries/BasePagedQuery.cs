using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Domain.Queries
{
    public class BasePagedQuery
    {
        public int Page { get; set; }
        public int ElemPerPage { get; set; }
    }
}
