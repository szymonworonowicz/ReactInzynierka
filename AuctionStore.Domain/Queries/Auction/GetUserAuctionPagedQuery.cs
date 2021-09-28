using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Enums;
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
    public class GetUserAuctionPagedQuery : BasePagedQuery, IRequest<BasePagedQueryResponse<UserAuctionDto>>
    {
        public Guid UserId { get; set; }
        public bool IsWinning { get; set; }

        public class GetUserAuctionPagedQueryHandler : IRequestHandler<GetUserAuctionPagedQuery, BasePagedQueryResponse<UserAuctionDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public GetUserAuctionPagedQueryHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }
            public async Task<BasePagedQueryResponse<UserAuctionDto>> Handle(GetUserAuctionPagedQuery request, CancellationToken cancellationToken)
            {
                (List<UserAuctionDto> auctions, int count) auctionInfo = request.IsWinning
                    ? await GetWinningAuction(request, cancellationToken)
                    : await GetUserAuctionPagedQuery(request, cancellationToken);

                var auctions = auctionInfo.auctions
                        .Skip(request.Page * request.ElemPerPage)
                        .Take(request.ElemPerPage)
                        .ToList();


                foreach (var auction in auctions)
                {
                    try
                    {
                        auction.Price = await context.AuctionOffer.Where(x => x.AuctionId == auction.Id).MaxAsync(x => x.NewPrice, cancellationToken);
                    }
                    catch (Exception)
                    {
                        continue;
                    }
                }

                return new BasePagedQueryResponse<UserAuctionDto>
                {
                    PageElements = auctions,
                    MaxPage = auctionInfo.count / request.ElemPerPage + 1,
                    CountOfElements = auctionInfo.count
                };
            }

            private async Task<(List<UserAuctionDto>, int)> GetUserAuctionPagedQuery(GetUserAuctionPagedQuery request, CancellationToken cancellationToken)
            {
                var auctions = await context.Auctions
                    .Where(x => x.UserId == request.UserId)
                    .ProjectTo<UserAuctionDto>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                return (auctions, auctions.Count);
            }

            private async Task<(List<UserAuctionDto>, int)> GetWinningAuction(GetUserAuctionPagedQuery request, CancellationToken cancellationToken)
            {
                var auctions = await context.Auctions
                    .Include(x => x.AuctionOffers)
                    .Where(x => x.Status == AuctionStatus.Finish || x.Status == AuctionStatus.Payed)
                    .Where(x => x.AuctionOffers.Any(offer => offer.UserId == request.UserId && offer.NewPrice == x.AuctionOffers.Max(x => x.NewPrice)))
                    .ProjectTo<UserAuctionDto>(mapper.ConfigurationProvider)
                    .ToListAsync();

                return (auctions, auctions.Count);
            }
        }
    }
}
