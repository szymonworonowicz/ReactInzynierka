using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Queries.User
{
    public class PagedBannedUserQuery : BasePagedQuery, IRequest<BasePagedQueryResponse<BannedUserDto>>
    {
        public class PagedBannedUserQueryHandler : IRequestHandler<PagedBannedUserQuery, BasePagedQueryResponse<BannedUserDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly ILogger<PagedBannedUserQuery> logger;

            public PagedBannedUserQueryHandler(DataContext context, IMapper mapper, ILogger<PagedBannedUserQuery> logger)
            {
                this.context = context;
                this.mapper = mapper;
                this.logger = logger;
            }

            public async Task<BasePagedQueryResponse<BannedUserDto>> Handle(PagedBannedUserQuery request, CancellationToken cancellationToken)
            {
                var bannedUsers = context.Users
                    .Where(x => x.IsBanned && x.EndOffBan > DateTime.Now)
                    .ProjectTo<BannedUserDto>(mapper.ConfigurationProvider);

                var skiped = await bannedUsers.Skip(request.Page * request.ElemPerPage).Take(request.ElemPerPage).ToListAsync(cancellationToken);

                return new BasePagedQueryResponse<BannedUserDto>
                {
                    PageElements = skiped,
                    MaxPage = bannedUsers.Count() / request.ElemPerPage + 1,
                    CountOfElements = bannedUsers.Count()
                };
            }
        }
    }
}
