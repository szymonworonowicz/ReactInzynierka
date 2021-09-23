using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Queries.Auction
{
    public class GetAuctionQuery : IRequest<AuctionDetailsDto>
    {
        public Guid AuctionId { get; set; }

        public class GetAuctionQueryHandler : IRequestHandler<GetAuctionQuery, AuctionDetailsDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public GetAuctionQueryHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<AuctionDetailsDto> Handle(GetAuctionQuery request, CancellationToken cancellationToken)
            {
                var auction = await context.Auctions.FirstOrDefaultAsync(x => x.Id == request.AuctionId, cancellationToken);


                if (auction == null)
                {
                    return null;
                }

                var result = mapper.Map<AuctionDetailsDto>(auction);
                result.MaxOffer = await context.AuctionOffer.Where(x => x.AuctionId == request.AuctionId).Select(x => x.NewPrice).FirstOrDefaultAsync(cancellationToken);
                return result;
            }
        }
    }
}
