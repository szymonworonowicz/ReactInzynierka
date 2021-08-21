using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.ModelDtos;
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
    public class GetAllCategoriesQuery : IRequest<IEnumerable<CategoryDto>>
    {

        public class GetAllCategoriesQueryHandler : IRequestHandler<GetAllCategoriesQuery, IEnumerable<CategoryDto>>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public GetAllCategoriesQueryHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<IEnumerable<CategoryDto>> Handle(GetAllCategoriesQuery request, CancellationToken cancellationToken)
            {
                var data =  await context.Categories.Include(x => x.SubCategories).ToListAsync(cancellationToken);

                return mapper.Map<IEnumerable<CategoryDto>>(data);

            }
        }
    }
}
