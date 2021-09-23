using AuctionStore.Infrastructure.DB;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Message
{
    public class AddMessageCommand : IRequest<bool>
    {
        public Guid AuctionId { get; set; }
        public Guid UserId { get; set; }
        public string Text { get; set; }

        public class AddMessageCommandHandler : IRequestHandler<AddMessageCommand,bool>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public AddMessageCommandHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<bool> Handle(AddMessageCommand request, CancellationToken cancellationToken)
            {
                var target = mapper.Map<Infrastructure.Models.Message>(request);
                target.Added = DateTimeOffset.Now.ToUnixTimeSeconds();

                await context.Messages.AddAsync(target, cancellationToken);
                await context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
