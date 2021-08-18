using AuctionStore.Domain.Commands.Auth;
using AuctionStore.Infrastructure.Models;
using AutoMapper;

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
