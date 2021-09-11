using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Dtos
{
    public class StoreConfigDto
    {
        public decimal MaxPhotoSize { get; set; }
        public int MaxPhotos { get; set; }

    }
}
