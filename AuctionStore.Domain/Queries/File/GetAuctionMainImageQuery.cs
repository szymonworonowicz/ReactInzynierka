using AuctionStore.Infrastructure.DB;
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
    public class GetAuctionMainImageQuery : IRequest<string>
    {
        public Guid AuctionId { get; set; }

        public class GetAuctionMainImageQueryHandler : IRequestHandler<GetAuctionMainImageQuery, string>
        {
            private readonly DataContext context;
            private readonly IImageService imageService;

            public GetAuctionMainImageQueryHandler(DataContext context, IImageService imageService)
            {
                this.context = context;
                this.imageService = imageService;
            }
            public async Task<string> Handle(GetAuctionMainImageQuery request, CancellationToken cancellationToken)
            {
                var photo = await context.AuctionFiles.FirstOrDefaultAsync(x => x.AuctionId == request.AuctionId && x.IsMain, cancellationToken);
                if(photo == null)
                {
                    return null;
                }

                var baseImage = await imageService.GetImageString(photo.MiniPhotoPath);
                return $"data:image/{GetType(photo.FileExtensions)};base64,{baseImage}";
            }

            private string GetType(DictAuctionFileExtensions extension)
            {
                return extension.GetDescription();
            }
        }
    }
}
