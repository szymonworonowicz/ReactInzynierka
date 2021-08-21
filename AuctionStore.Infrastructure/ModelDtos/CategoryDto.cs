using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.ModelDtos
{
    public class CategoryDto
    {
        public Guid Id { get; set; }
        public string Name { get; set; }

        public virtual List<SubCategoryDto> SubCategories { get; set; }
    }
}
