using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Domain.Queries
{
    public class BasePagedQueryResponse<T>
    {
        public int CountOfElements { get; set; }
        public int MaxPage { get; set; }
        public List<T> PageElements { get; set; }
    }
}
