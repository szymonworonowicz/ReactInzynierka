using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Models;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands
{
    public class AddAuctionCommand : IRequest<bool>
    {
        public string Title { get; set; }
        public decimal Price { get; set; }
        public string Description { get; set; }
        public bool IsTimeAuction { get; set; }
        public long? TimeStampDuration { get; set; }
        public long? TimeStampEnd { get; set; }
        public long? TimeStampStart { get; set; }
        public List<AuctionAddPhotoDto> Photos { get; set; }

        public class AddAuctionCommandHandler : IRequestHandler<AddAuctionCommand, bool>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public AddAuctionCommandHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<bool> Handle(AddAuctionCommand request, CancellationToken cancellationToken)
            {
                var target = mapper.Map<Auction>(request);
                await context.Auctions.AddAsync(target, cancellationToken);
                await context.SaveChangesAsync(cancellationToken);

                var photoIds = request.Photos.Select(x => x.PhotoId);

                var photos = await context.AuctionFiles.Where(x => photoIds.Contains(x.Id)).ToListAsync(cancellationToken); 

                foreach(var photo in photos)
                {
                    photo.AuctionId = target.Id;
                    var photoInfo = request.Photos.First(x => x.PhotoId == photo.Id);
                    if(photoInfo.isMain)
                    {
                        photo.IsMain = true;
                    };
                }
                await context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
