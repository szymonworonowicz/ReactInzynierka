using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.ModelDtos;
using AutoMapper;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Category
{
    public class AddCategoryCommand : IRequest<CategoryDto>
    {
        public Guid? CategoryId { get; set; }
        public string CategoryName { get; set; }
        public string SubCategoryName { get; set; }

        public class AddCategoryCommandHandler : IRequestHandler<AddCategoryCommand, CategoryDto>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;

            public AddCategoryCommandHandler(DataContext context, IMapper mapper)
            {
                this.context = context;
                this.mapper = mapper;
            }

            public async Task<CategoryDto> Handle(AddCategoryCommand request, CancellationToken cancellationToken)
            {
                var result = new CategoryDto();
                if (request.CategoryId ==null)
                {
                    Infrastructure.Models.Category target = new Infrastructure.Models.Category
                    {
                        Name = request.SubCategoryName
                    };

                    if (!string.IsNullOrEmpty(request.SubCategoryName))
                    {
                        target.SubCategories = new List<Infrastructure.Models.SubCategory>()
                        {
                          new Infrastructure.Models.SubCategory
                          {
                              Name = request.SubCategoryName
                          }
                        };
                    }

                    await context.Categories.AddAsync(target, cancellationToken);
                    await context.SaveChangesAsync(cancellationToken);

                    result.Id = target.Id;
                    result.Name = target.Name;
                    result.SubCategories = mapper.Map<List<SubCategoryDto>>(target.SubCategories);
                }
                else
                {
                    var target = new Infrastructure.Models.SubCategory
                    {
                        Name = request.SubCategoryName,
                        CategoryId = request.CategoryId
                    };
                    await context.Subcategories.AddAsync(target, cancellationToken);
                    await context.SaveChangesAsync(cancellationToken);

                    result.SubCategories = new List<SubCategoryDto>();
                    result.SubCategories.Add(mapper.Map<SubCategoryDto>(target));
                }

                return result;
            }
        }
    }
}
