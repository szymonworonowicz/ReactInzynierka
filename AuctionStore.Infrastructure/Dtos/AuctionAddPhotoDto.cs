using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Dtos
{
    public class AuctionAddPhotoDto
    {
        public Guid PhotoId { get; set; }
        public bool isMain { get; set; }
    }
}
