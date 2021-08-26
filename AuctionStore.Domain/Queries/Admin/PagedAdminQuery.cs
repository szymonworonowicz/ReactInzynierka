using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Helpers;
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
    public class PagedAdminQuery : BasePagedQuery, IRequest<BasePagedQueryResponse<AdminUserDto>>
    {
        public class PagedAdminQueryHandler : IRequestHandler<PagedAdminQuery, BasePagedQueryResponse<AdminUserDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public PagedAdminQueryHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<BasePagedQueryResponse<AdminUserDto>> Handle(PagedAdminQuery request, CancellationToken cancellationToken)
            {
                var adminIds = await context.UserRoles
                    .Include(x => x.Role)
                    .Where(x => x.Role.Name == Constants.Admin)
                    .Select(x => x.UserId)
                    .ToListAsync(cancellationToken);

                var admins = await context.Users
                    .Where(x => adminIds.Contains(x.Id))
                    .ProjectTo<AdminUserDto>(mapper.ConfigurationProvider)
                    .ToListAsync(cancellationToken);

                var skiped =  admins.Skip(request.Page * request.ElemPerPage).Take(request.ElemPerPage).ToList();

                return new BasePagedQueryResponse<AdminUserDto>
                {
                    PageElements = skiped,
                    MaxPage = admins.Count() / request.ElemPerPage + 1,
                    CountOfElements = admins.Count()
                };
            }
        }
    }
}
