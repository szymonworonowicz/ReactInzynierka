using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Enums;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace AuctionStore.Domain.Queries.Auction
{
    public class GetNewestAuctionsQuery : IQuery<List<AuctionDto>>
    {
        public class GetNewestAuctionsQueryHandler : IQueryHandler<GetNewestAuctionsQuery, List<AuctionDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public GetNewestAuctionsQueryHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }


            public async Task<List<AuctionDto>> Handle(GetNewestAuctionsQuery request,
                CancellationToken cancellationToken)
            {
                var newestAuctions = await context.Auctions
                    .Where(x => x.Status == AuctionStatus.New)
                    .OrderByDescending(x => x.TimeStampStart).Take(3)
                    .ProjectTo<AuctionDto>(mapper.ConfigurationProvider).ToListAsync(cancellationToken);

                return newestAuctions;
            }
        }
    }
}