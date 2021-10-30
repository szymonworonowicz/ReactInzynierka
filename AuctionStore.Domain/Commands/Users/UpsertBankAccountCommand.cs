using System;
using System.Threading;
using System.Threading.Tasks;
using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.ModelDtos;
using AuctionStore.Infrastructure.Models;
using AutoMapper;
using Microsoft.EntityFrameworkCore;

namespace AuctionStore.Domain.Commands.Users
{
    public class UpsertBankAccountCommand : ICommand<BankAccountDto>
    {
        public Guid Id { get; set; }
        public string AccountNr { get; set; }
        public string OwnerFirstName { get; set; }
        public string OwnerLastName { get; set; }
        public string OwnerAddress { get; set; }
        public Guid UserId { get; set; }


        public class UpsertBankAccountCommandHandler : ICommandHandler<UpsertBankAccountCommand, BankAccountDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public UpsertBankAccountCommandHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<BankAccountDto> Handle(UpsertBankAccountCommand request, CancellationToken cancellationToken)
            {
                var target = mapper.Map<BankAccount>(request);
                if (await context.BankAccounts.AnyAsync(x => x.Id == request.Id, cancellationToken))
                {
                    //update
                    context.BankAccounts.Update(target);
                }
                else
                {
                    //add
                    await context.BankAccounts.AddAsync(target, cancellationToken);
                }

                await context.SaveChangesAsync(cancellationToken);

                return mapper.Map<BankAccountDto>(target);
            }
        }
    }
}