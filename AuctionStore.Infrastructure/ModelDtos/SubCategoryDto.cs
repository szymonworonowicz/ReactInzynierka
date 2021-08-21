using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.ModelDtos
{
    public class SubCategoryDto
    {
        public Guid Id { get; set; }

        public string Name { get; set; }
        public Guid? CategoryId { get; set; }
    }
}
