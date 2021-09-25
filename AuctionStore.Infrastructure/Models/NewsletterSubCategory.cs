using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Models
{
    public class NewsletterSubCategory
    {
        public Guid NewsletterId { get; set; }
        public Guid SubCategoryId { get; set; }
    }
}
