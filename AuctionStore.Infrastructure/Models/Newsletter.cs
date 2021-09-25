using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Models
{
    public class Newsletter
    {
        public Guid Id { get; set; }
        public string Email { get; set; }
        public long LastNewsletterTimeStamp { get; set; }

        public virtual IEnumerable<NewsletterSubCategory> Subcategories { get; set; }
    }
}
