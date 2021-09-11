using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Models
{
    public class StoreConfig
    {
        public Guid Id { get; set; }
        public decimal MaxPhotoSize { get; set; }
        public int MaxPhotos { get; set; }
    }
}
