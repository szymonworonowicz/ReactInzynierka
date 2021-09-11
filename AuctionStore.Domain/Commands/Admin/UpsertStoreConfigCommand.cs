using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Models;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Admin
{
    public class UpsertStoreConfigCommand : IRequest<StoreConfigDto>
    {
        [Required]
        public decimal MaxPhotoSize { get; set; }

        [Required]
        public int MaxPhotos { get; set; }

        public class UpsertStoreConfigCommandHandler :IRequestHandler<UpsertStoreConfigCommand, StoreConfigDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public UpsertStoreConfigCommandHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<StoreConfigDto> Handle(UpsertStoreConfigCommand request, CancellationToken cancellationToken)
            {
                var target = await context.StoreConfig.AsNoTracking().FirstOrDefaultAsync(cancellationToken);

                var data = mapper.Map<StoreConfig>(request);

                if(target == null)
                {
                    await context.StoreConfig.AddAsync(data);
                }
                else
                {
                    data.Id = target.Id;
                    context.StoreConfig.Update(data);
                }

                await context.SaveChangesAsync(cancellationToken);

                return mapper.Map<StoreConfigDto>(data);
            }
        }

    }
}
