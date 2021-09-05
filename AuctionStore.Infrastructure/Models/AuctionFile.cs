using AuctionStore.Infrastructure.Enums;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Models
{
    public class AuctionFile
    {
        public Guid Id { get; set; }
        public DictAuctionFileExtensions FileExtensions { get; set; }
        public string LargePhotoPath { get; set; }
        public string MediumPhotoPath { get; set; }
        public string MiniPhotoPath { get; set; }
        public long TimeStampAdded { get; set; }
    }
}
