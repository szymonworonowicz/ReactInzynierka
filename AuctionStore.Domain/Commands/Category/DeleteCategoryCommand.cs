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
    public class DeleteCategoryCommand : IRequest<bool>
    {
        public Guid Id { get; set; }

        public class DeleteCategoryCommandHandler : IRequestHandler<DeleteCategoryCommand, bool>
        {
            private readonly DataContext context;

            public DeleteCategoryCommandHandler(DataContext context)
            {
                this.context = context;
            }

            public async Task<bool> Handle(DeleteCategoryCommand request, CancellationToken cancellationToken)
            {
                var category = await context.Categories.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);
                if (category == null)
                {
                    return false;
                }

                context.Categories.Remove(category);

                await context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
