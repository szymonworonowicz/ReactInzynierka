using System;
using System.Threading;
using System.Threading.Tasks;
using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.ModelDtos;
using AuctionStore.Infrastructure.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AuctionStore.Domain.Queries.User
{
    public class GetBankAccountForAuctionQuery : IQuery<BankAccountDto>
    {
        public Guid AuctionId { get; set; }

        public class GetBankAccountForAuctionQueryHandler: IQueryHandler<GetBankAccountForAuctionQuery, BankAccountDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public GetBankAccountForAuctionQueryHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }


            public async Task<BankAccountDto> Handle(GetBankAccountForAuctionQuery request, CancellationToken cancellationToken)
            {
                var auction =
                    await context.Auctions.FirstOrDefaultAsync(x => x.Id == request.AuctionId, cancellationToken);
                if (auction == null)
                {
                    return null;
                }

                var bankAccount =
                    await context.BankAccounts.FirstOrDefaultAsync(x => x.UserId == auction.UserId, cancellationToken);

                return mapper.Map<BankAccountDto>(bankAccount);
            }
        }
    }
}