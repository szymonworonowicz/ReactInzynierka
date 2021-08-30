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
        }
    }
}
