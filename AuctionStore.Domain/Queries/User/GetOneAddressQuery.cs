using System;
using System.Threading;
using System.Threading.Tasks;
using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AuctionStore.Domain.Queries.User
{
    public class GetOneAddressQuery : IQuery<AddressDto>
    {
        public Guid Id { get; set; }

        public class GetOneAddressQueryHandler : IQueryHandler<GetOneAddressQuery, AddressDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public GetOneAddressQueryHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<AddressDto> Handle(GetOneAddressQuery request, CancellationToken cancellationToken)
            {
                var address = await context.Addresses.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                return mapper.Map<AddressDto>(address);
            }
        }
    }
}