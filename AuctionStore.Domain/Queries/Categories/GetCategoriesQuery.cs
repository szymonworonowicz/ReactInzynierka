using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Queries.Categories
{
    public class GetCategoriesQuery :IRequest<List<EmptyCategory>>
    {
        public class GetCategoriesQueryHandler : IRequestHandler<GetCategoriesQuery, List<EmptyCategory>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public GetCategoriesQueryHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }
            public async Task<List<EmptyCategory>> Handle(GetCategoriesQuery request, CancellationToken cancellationToken)
            {
                var list = await context.Categories.ProjectTo<EmptyCategory>(mapper.ConfigurationProvider).ToListAsync(cancellationToken);

                return list;
            }
        }
    }
}
