using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Services.ImageService;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Image
{
    public class DeleteImageCommand :IRequest<bool>
    {
        public Guid? ImageId { get; set; }

        public class DeleteImageCommandHandler : IRequestHandler<DeleteImageCommand, bool>
        {
            private readonly DataContext context;
            private readonly IImageService imageService;

            public DeleteImageCommandHandler(DataContext context, IImageService imageService)
            {
                this.context = context;
                this.imageService = imageService;
            }

            public async Task<bool> Handle(DeleteImageCommand request, CancellationToken cancellationToken)
            {
                if(request.ImageId == null)
                {
                    return false;
                }

                var image = await context.AuctionFiles.FirstOrDefaultAsync(x => x.Id == request.ImageId, cancellationToken);
                imageService.DeleteImage(image);

                return true;
            }
        }
    }
}
