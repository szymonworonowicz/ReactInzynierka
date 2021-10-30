using System;
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
    public class GetTrendingAuctionsQuery : IQuery<List<AuctionDto>>
    {
        public class GetTrendingAuctionsQueryHandler : IQueryHandler<GetTrendingAuctionsQuery, List<AuctionDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public GetTrendingAuctionsQueryHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<List<AuctionDto>> Handle(GetTrendingAuctionsQuery request, CancellationToken cancellationToken)
            {
                var currentTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();

                var trendings = await context.Auctions
                    .Where(x => x.TimeStampStart < currentTime && x.TimeStampEnd > currentTime)
                    .Where(x => x.Status == AuctionStatus.New)
                    .OrderByDescending(x => x.CountOfEntries)
                    .Take(3)
                    .ProjectTo<AuctionDto>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return trendings;
            }
        }
    }
}