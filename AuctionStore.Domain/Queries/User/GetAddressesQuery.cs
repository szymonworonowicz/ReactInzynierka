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

namespace AuctionStore.Domain.Queries.User
{
    public class GetAddressesQuery : IRequest<List<AddressDto>>
    {
        public Guid UserId { get; set; }

        public class GetAddressQueryHandler : IRequestHandler<GetAddressesQuery,List<AddressDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public GetAddressQueryHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<List<AddressDto>> Handle(GetAddressesQuery request, CancellationToken cancellationToken)
            {
                var addresses = await context.Addresses
                    .Where(x => x.UserId == request.UserId)
                    .Where(x => !x.IsDeleted)
                    .ProjectTo<AddressDto>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);


                return addresses;
            }
        }
    }
}
