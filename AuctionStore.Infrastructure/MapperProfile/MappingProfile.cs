using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.ModelDtos;
using AuctionStore.Infrastructure.Models;
using AutoMapper;

namespace AuctionStore.Infrastructure.MapperProfile
{
    public class MappingProfile: Profile
    {
        public MappingProfile()
        {
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<SubCategory, SubCategoryDto>().ReverseMap();
            CreateMap<User, BannedUserDto>().ReverseMap();
            CreateMap<User, AdminUserDto>().ReverseMap();
            CreateMap<BannedWord, BannedWordDto>().ReverseMap();
            CreateMap<Category, EmptyCategory>().ReverseMap();
            CreateMap<Auction, AuctionDto>().ReverseMap();
            CreateMap<AuctionOffer, AuctionOfferDto>().ReverseMap();
            CreateMap<AuctionFile, AuctionFileDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            CreateMap<Address, AddressDto>().ReverseMap();
            CreateMap<StoreConfig, StoreConfigDto>().ReverseMap();
            CreateMap<Message, MessageDto>().ReverseMap();
            CreateMap<Auction, AuctionDetailsDto>().ReverseMap();
        }
    }
}
