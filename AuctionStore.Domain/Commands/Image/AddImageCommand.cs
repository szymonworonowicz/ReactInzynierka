using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Services.ImageService;
using AutoMapper;
using MediatR;
using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Image
{
    public class AddImageCommand :IRequest<ImageDto>
    {
        public IFormFile File { get; set; }

        public class AddImageCommandHandler : IRequestHandler<AddImageCommand, ImageDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly IImageService imageService;

            public AddImageCommandHandler(DataContext context, IMapper mapper, IImageService imageService)
            {
                this.context = context;
                this.mapper = mapper;
                this.imageService = imageService;
            }

            public async Task<ImageDto> Handle(AddImageCommand request, CancellationToken cancellationToken)
            {
                var image = await imageService.AddImage(request.File);
                image.TimeStampAdded = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

                await context.AuctionFiles.AddAsync(image, cancellationToken);
                await context.SaveChangesAsync(cancellationToken);

                return new ImageDto
                {
                    Id = image.Id,
                    PhotoString = await imageService.GetImageString(image.MiniPhotoPath),
                    Extension = image.FileExtensions
                };
            }
        }
    }
}
