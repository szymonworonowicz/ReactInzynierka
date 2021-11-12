using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using Microsoft.EntityFrameworkCore;

namespace AuctionStore.Domain.Commands.Message
{
    public class UpdateMessageStateCommand : ICommand<bool>
    {
        public List<UpdateMessageStateDto> Messages { get; set; }

        public class UpdateMessageStateCommanHandler : ICommandHandler<UpdateMessageStateCommand, bool>
        {
            private readonly DataContext context;

            public UpdateMessageStateCommanHandler(DataContext context)
            {
                this.context = context;
            }

            public async Task<bool> Handle(UpdateMessageStateCommand request, CancellationToken cancellationToken)
            {
                var ids = request.Messages.Select(x => x.MessageId);
                var messages = await context.Messages.Where(x => ids.Contains(x.Id)).ToListAsync(cancellationToken);

                foreach (var message in messages)
                {
                    var messageStateIsReaded =
                        request.Messages.FirstOrDefault(x => x.MessageId == message.Id)?.IsReaded ?? message.IsReaded;

                    message.IsReaded = messageStateIsReaded;
                }

                await context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}