using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Queries.Auction
{
    public class GetAuctionInfoQuery : IRequest<StoreConfigDto>
    {
        public class GetStoreConfigQueryHandler : IRequestHandler<GetAuctionInfoQuery, StoreConfigDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public GetStoreConfigQueryHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<StoreConfigDto> Handle(GetAuctionInfoQuery request, CancellationToken cancellationToken)
            {
                var target = await context.StoreConfig.FirstOrDefaultAsync(cancellationToken);

                if (target != null)
                {
                    return mapper.Map<StoreConfigDto>(target);
                }
                return null;
            }
        }
    }

}
