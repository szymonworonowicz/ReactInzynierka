using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Image
{
    public class DeleteUnusedFilesJobCommand : IRequest
    {
        public class DeleteUnusedFilesJobCommandHandler  : IRequestHandler<DeleteUnusedFilesJobCommand>
        {
            private readonly DataContext context;

            public DeleteUnusedFilesJobCommandHandler(DataContext context)
            {
                this.context = context;
            }


            public async Task<Unit> Handle(DeleteUnusedFilesJobCommand request, CancellationToken cancellationToken)
            {
                var files = await context.AuctionFiles
                    .Where(x => x.AuctionId == null)
                    .ToListAsync(cancellationToken);

                foreach(var file in files)
                {
                    File.Delete(file.LargePhotoPath);
                    File.Delete(file.MediumPhotoPath);
                    File.Delete(file.MiniPhotoPath);
                }
                context.RemoveRange(files);
                await context.SaveChangesAsync(cancellationToken);

                return Unit.Value;

            }
        }
    }
}
