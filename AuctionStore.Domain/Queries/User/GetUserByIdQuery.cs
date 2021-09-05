using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.ModelDtos;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Queries.User
{
    public class GetUserByIdQuery : IRequest<UserDto>
    {
        public Guid userId { get; set; }

        public class GetUserByIdQueryHandler : IRequestHandler<GetUserByIdQuery, UserDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public GetUserByIdQueryHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<UserDto> Handle(GetUserByIdQuery request, CancellationToken cancellationToken)
            {
                var target = await context.Users.FirstOrDefaultAsync(x => x.Id == request.userId, cancellationToken);

                if (target == null)
                {
                    return null;
                }

                return mapper.Map<UserDto>(target);
            }
        }
    }
}
