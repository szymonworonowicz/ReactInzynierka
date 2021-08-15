using AuctionStore.Domain.Commands.Auth;
using AuctionStore.Infrastructure.Models;
using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AuctionStore.API.MapperProfile
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateUserCommand, User>();
        }
    }
}
