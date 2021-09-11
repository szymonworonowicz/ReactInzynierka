using AuctionStore.Infrastructure.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Dtos
{
    public class ImageDto
    {
        public Guid Id { get; set; }
        public string PhotoString { get; set; }
        public DictAuctionFileExtensions Extension { get; set; }
    }
}
