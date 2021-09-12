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

namespace AuctionStore.Domain.Queries.Message
{
    public class PagedMessageQuery :  BasePagedQuery, IRequest<BasePagedQueryResponse<MessageDto>>
    {
        public Guid? UserId { get; set; }

        public class PagedMessageQueryHandler : IRequestHandler<PagedMessageQuery, BasePagedQueryResponse<MessageDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public PagedMessageQueryHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<BasePagedQueryResponse<MessageDto>> Handle(PagedMessageQuery request, CancellationToken cancellationToken)
            {
                var messages = await context.Messages
                    .Where(x => x.UserId == request.UserId)
                    .Skip(request.Page * request.ElemPerPage)
                    .Take(request.ElemPerPage)
                    .ProjectTo<MessageDto>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                var CountOfElements = await context.Messages.Where(x => x.UserId == request.UserId).CountAsync(cancellationToken);
                return new BasePagedQueryResponse<MessageDto>
                {
                    CountOfElements = CountOfElements,
                    MaxPage = CountOfElements / request.ElemPerPage + 1,
                    PageElements = messages
                };  
            }
        }
    }
}
