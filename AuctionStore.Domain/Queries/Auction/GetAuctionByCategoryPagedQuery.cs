using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
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
    public class GetAuctionByCategoryPagedQuery : BasePagedQuery, IRequest<BasePagedQueryResponse<AuctionDto>>
    {
        public Guid? CategoryId { get; set; }

        public class GetAuctionByCategoryPagedQueryHandler : IRequestHandler<GetAuctionByCategoryPagedQuery, BasePagedQueryResponse<AuctionDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public GetAuctionByCategoryPagedQueryHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<BasePagedQueryResponse<AuctionDto>> Handle(GetAuctionByCategoryPagedQuery request, CancellationToken cancellationToken)
            {
                var currentTime = DateTimeOffset.UtcNow.ToUnixTimeSeconds();
                var auctions = await context.Auctions
                    .Where(x => x.SubCategoryId == request.CategoryId)
                    .Where(x => x.TimeStampEnd.Value > currentTime)
                    .Skip(request.Page * request.ElemPerPage)
                    .Take(request.ElemPerPage)
                    .Include(x => x.AuctionMedias)
                    .Include(x => x.AuctionOffers)
                    .ProjectTo<AuctionDto>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                var CountOfElements = await context.Auctions
                    .Where(x => x.SubCategoryId == request.CategoryId)
                    .Where(x => x.TimeStampEnd.Value > currentTime)
                    .CountAsync(cancellationToken);

                return new BasePagedQueryResponse<AuctionDto>
                {
                    PageElements = auctions,
                    MaxPage = CountOfElements / request.ElemPerPage + 1,
                    CountOfElements = CountOfElements
                };

            }
        }
    }
}
