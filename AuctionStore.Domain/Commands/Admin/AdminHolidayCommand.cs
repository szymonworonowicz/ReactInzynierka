using AuctionStore.Infrastructure.DB;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Admin
{
    public class AdminHolidayCommand  :IRequest<bool>
    {
        public Guid Id { get; set; }

        public class AdminHolidaysCommandHandler : IRequestHandler<AdminHolidayCommand, bool>
        {
            private readonly DataContext context;

            public AdminHolidaysCommandHandler(DataContext context)
            {
                this.context = context;
            }

            public async Task<bool> Handle(AdminHolidayCommand request, CancellationToken cancellationToken)
            {
                var target = await context.Users.FirstOrDefaultAsync(x => x.Id == request.Id, cancellationToken);

                if(target == null)
                {
                    return false;
                }

                target.IsDisabled = !target.IsDisabled;

                await context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
