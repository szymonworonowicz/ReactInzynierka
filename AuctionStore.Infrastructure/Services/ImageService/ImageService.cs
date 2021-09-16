using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Enums;
using AuctionStore.Infrastructure.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.Extensions.Options;
using SixLabors.ImageSharp;
using SixLabors.ImageSharp.Formats;
using SixLabors.ImageSharp.Formats.Bmp;
using SixLabors.ImageSharp.Formats.Jpeg;
using SixLabors.ImageSharp.Formats.Png;
using SixLabors.ImageSharp.Processing;
using System;
using System.Collections.Generic;
using System.IO;
using System.Text;
using System.Threading.Tasks;

namespace AuctionStore.Infrastructure.Services.ImageService
{
    public class ImageService : IImageService
    {
        private string baseUrl;
        public ImageService(IOptions<ImageOptions> options)
        {
            baseUrl = options?.Value?.BaseUrl ?? "";
        }
        public async Task<AuctionFile> AddImage(IFormFile file)
        {

            if (!Directory.Exists(baseUrl))
            {
                Directory.CreateDirectory(baseUrl);
            }
            var auctionFile = new AuctionFile();
            var fileInfo = file.FileName.Split(".");

            IImageEncoder encoder = getImageEncoder(fileInfo[^1]);

            IImageDecoder decoder = getImageDecoder(fileInfo[^1]);
            auctionFile.FileExtensions = GetImgeDictExtension(fileInfo[^1]);

            auctionFile.MiniPhotoPath = await AddPhoto(file, decoder, encoder, 90);
            auctionFile.MediumPhotoPath = await AddPhoto(file, decoder, encoder, 300);
            auctionFile.LargePhotoPath = await AddPhoto(file, decoder, encoder);


            return auctionFile;
        }

        public void DeleteImage(AuctionFile image)
        {
            File.Delete(image.MiniPhotoPath);
            File.Delete(image.MediumPhotoPath);
            File.Delete(image.LargePhotoPath);
        }

        private DictAuctionFileExtensions GetImgeDictExtension(string extension)
        {
            return extension switch
            {
                "png" => DictAuctionFileExtensions.PNG,
                "jpeg" => DictAuctionFileExtensions.JPG,
                "bmp" => DictAuctionFileExtensions.BMP,
                _ => DictAuctionFileExtensions.JPG
            };
        }

        private async Task<string> AddPhoto(IFormFile file, IImageDecoder decoder, IImageEncoder encoder, int height = 0, int width = 0)
        {
            var imageName = $"{Guid.NewGuid()}_{file.FileName}";
            var fileName = Path.Combine(baseUrl, imageName);

            using (var image = Image.Load(file.OpenReadStream(), decoder))
            {
                using (var imageStream = new FileStream(Path.Combine(baseUrl, imageName), FileMode.Create))
                {
                    if(height != 0 || width != 0)
                    {
                        image.Mutate(x => x.Resize(width, height));
                    }
                    await image.SaveAsync(imageStream, encoder);
                }
            }

            return fileName;
        }



        private IImageDecoder getImageDecoder(string extension)
        {
            return extension switch
            {
                "png" => new PngDecoder(),
                "jpeg" => new JpegDecoder(),
                "bmp" => new BmpDecoder(),
                _ => new JpegDecoder()
            };
        }
        private IImageEncoder getImageEncoder(string extension)
        {
            return extension switch
            {
                "png" => new PngEncoder(),
                "jpeg" => new JpegEncoder(),
                "bmp" => new BmpEncoder(),
                _ => new JpegEncoder()
            };
        }

        public async Task<string> GetImageString(string path)
        {
            return Convert.ToBase64String(await File.ReadAllBytesAsync( path));
        }
    }
}
