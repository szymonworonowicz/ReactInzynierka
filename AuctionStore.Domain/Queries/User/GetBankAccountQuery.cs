using System;
using System.Threading;
using System.Threading.Tasks;
using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.ModelDtos;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AuctionStore.Domain.Queries.User
{
    public class GetBankAccountQuery : IQuery<BankAccountDto>
    {
        public Guid UserId { get; set; }

        public class GetBankAccountQueryHandler : IQueryHandler<GetBankAccountQuery, BankAccountDto>
        {
            private readonly DataContext dataContext;
            private readonly IMapper mapper;

            public GetBankAccountQueryHandler(DataContext dataContext, IMapper mapper)
            {
                this.dataContext = dataContext;
                this.mapper = mapper;
            }

            public async Task<BankAccountDto> Handle(GetBankAccountQuery request, CancellationToken cancellationToken)
            {
                var account =
                    await dataContext.BankAccounts.FirstOrDefaultAsync(x => x.UserId == request.UserId,
                        cancellationToken);

                return mapper.Map<BankAccountDto>(account);
            }
        }
    }
}