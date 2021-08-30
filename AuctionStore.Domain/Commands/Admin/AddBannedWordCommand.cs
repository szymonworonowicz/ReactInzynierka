using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.ModelDtos;
using AuctionStore.Infrastructure.Models;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Admin
{
    public class AddBannedWordCommand : IRequest<BannedWordDto>
    {
        public string NewWord { get; set; }

        public class AddBannedWordCommandHandler : IRequestHandler<AddBannedWordCommand, BannedWordDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public AddBannedWordCommandHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<BannedWordDto> Handle(AddBannedWordCommand request, CancellationToken cancellationToken)
            {
                var target = new BannedWord
                {
                    Word = request.NewWord,
                    Added = DateTime.Now
                };

                await context.BannedWords.AddAsync(target, cancellationToken);
                await context.SaveChangesAsync(cancellationToken);

                return mapper.Map<BannedWordDto>(target);
            }
        }
    }
}
