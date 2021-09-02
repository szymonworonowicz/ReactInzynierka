using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Models
{
    public class SubCategory
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public Guid? CategoryId { get; set; }

        public virtual Category Category { get; set; }
    }
}
