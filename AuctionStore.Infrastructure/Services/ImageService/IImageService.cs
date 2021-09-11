using AuctionStore.Infrastructure.Models;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;

namespace AuctionStore.Infrastructure.Services.ImageService
{
    public interface IImageService
    {
        Task<AuctionFile> AddImage(IFormFile file);
        Task<string> GetImageString(string path);
        void DeleteImage(AuctionFile image);
    }
}
