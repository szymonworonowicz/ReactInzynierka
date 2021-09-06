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

namespace AuctionStore.Domain.Commands.Users
{
    public class UpsertAddressCommand : IRequest<AddressDto>
    {

        public Guid? Id { get; set; }
        [Required]
        public string City { get; set; }
        [Required]
        public string Street { get; set; }
        [Required]
        public string HouseNo { get; set; }
        [Required]
        public string PostCode { get; set; }
        [Required]
        public Guid UserId { get; set; }

        public class UpsertAddressCommandHandler : IRequestHandler<UpsertAddressCommand, AddressDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public UpsertAddressCommandHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<AddressDto> Handle(UpsertAddressCommand request, CancellationToken cancellationToken)
            {
                var target = mapper.Map<Address>(request);
                if (request.Id == null || request.Id == Guid.Empty)
                {
                    await context.AddAsync(target, cancellationToken);
                }
                else
                {
                    context.Addresses.Update(target);
                }
                await context.SaveChangesAsync(cancellationToken);

                return mapper.Map<AddressDto>(target);

            }
        }
    }
}
