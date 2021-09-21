using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Enums;
using AuctionStore.Infrastructure.Services.ImageService;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Queries.File
{
    public class GetAuctionImagesQuery : IRequest<IEnumerable<AuctionPhoto>>
    {
        public Guid? AuctionId { get; set; }

        public class GetAuctionImagesQueryHandler : IRequestHandler<GetAuctionImagesQuery, IEnumerable<AuctionPhoto>>
        {
            private readonly DataContext context;
            private readonly IImageService imageService;

            public GetAuctionImagesQueryHandler(DataContext context, IImageService imageService)
            {
                this.context = context;
                this.imageService = imageService;
            }



            public async Task<IEnumerable<AuctionPhoto>> Handle(GetAuctionImagesQuery request, CancellationToken cancellationToken)
            {
                var photos = await context.AuctionFiles
                    .Where(x => x.AuctionId == request.AuctionId)
                    .ToListAsync(cancellationToken);
                var result = new List<AuctionPhoto>();

                foreach(var photo in photos)
                {
                    var baseImage = await imageService.GetImageString(photo.MediumPhotoPath);
                    var obj = new AuctionPhoto
                    {
                        IsMain = photo.IsMain,
                        PhotoString = $"data:image/{GetType(photo.FileExtensions)};base64,{baseImage}"
                    };
                    result.Add(obj);
                }

                return result;
            }

            private string GetType(DictAuctionFileExtensions extension)
            {
                return extension.GetDescription();
            }
        }
    }
}
