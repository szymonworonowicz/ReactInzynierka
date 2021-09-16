using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Text;

namespace AuctionStore.Infrastructure.Enums
{
    public enum DictAuctionFileExtensions : byte
    {
        [Description("png")]
        PNG = 1,
        [Description("jpg")]
        JPG,
        [Description("bmp")]
        BMP,
        [Description("gif")]
        GIF,
        [Description("mp4")]
        MP4,
    }
}
