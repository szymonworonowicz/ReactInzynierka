using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.ModelDtos;
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

namespace AuctionStore.Domain.Queries.Admin
{
    public class PagedBannedWordsQuery : BasePagedQuery, IRequest<BasePagedQueryResponse<BannedWordDto>>
    {
        public class PagedBannedWordsQueryHandler : IRequestHandler<PagedBannedWordsQuery, BasePagedQueryResponse<BannedWordDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public PagedBannedWordsQueryHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }
            public async Task<BasePagedQueryResponse<BannedWordDto>> Handle(PagedBannedWordsQuery request, CancellationToken cancellationToken)
            {
                var bannedWords = context.BannedWords
                    .OrderBy(x => x.Word)
                    .ThenBy(x => x.Word)
                    .ProjectTo<BannedWordDto>(mapper.ConfigurationProvider);

                var skiped = await bannedWords.Skip(request.Page * request.ElemPerPage).Take(request.ElemPerPage).ToListAsync(cancellationToken);

                return new BasePagedQueryResponse<BannedWordDto>
                {
                    PageElements = skiped,
                    MaxPage = bannedWords.Count() / request.ElemPerPage + 1,
                    CountOfElements = bannedWords.Count()
                };
            }
        }
    }
}
