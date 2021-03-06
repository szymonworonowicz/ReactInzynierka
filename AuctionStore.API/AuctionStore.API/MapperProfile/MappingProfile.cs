using AuctionStore.Domain.Commands;
using AuctionStore.Domain.Commands.Admin;
using AuctionStore.Domain.Commands.Auction;
using AuctionStore.Domain.Commands.Auth;
using AuctionStore.Domain.Commands.Message;
using AuctionStore.Domain.Commands.Users;
using AuctionStore.Infrastructure.Models;
using AutoMapper;

namespace AuctionStore.API.MapperProfile
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<CreateUserCommand, User>();
            CreateMap<UpsertAddressCommand, Address>();
            CreateMap<UpsertStoreConfigCommand, StoreConfig>();
            CreateMap<AddAuctionCommand, Auction>();
            CreateMap<AddMessageCommand, Message>();
            CreateMap<UpsertBankAccountCommand, BankAccount>();
        }
    }
}
