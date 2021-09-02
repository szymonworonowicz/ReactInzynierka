using AuctionStore.Infrastructure.DB;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Category
{
    public class DeleteSubCategoryCommand : IRequest<bool>
    {
        public Guid Id { get; set; }

        public class DeleteSubCategoryCommandHandler : IRequestHandler<DeleteSubCategoryCommand, bool>
        {
            private readonly DataContext context;

            public DeleteSubCategoryCommandHandler(DataContext context)
            {
                this.context = context;
            }

            public async Task<bool> Handle(DeleteSubCategoryCommand request, CancellationToken cancellationToken)
            {
                var subcategory = await context.Subcategories.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
                if (subcategory == null)
                {
                    return false;
                }

                context.Subcategories.Remove(subcategory);

                await context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
