using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AuctionStore.Infrastructure.DB;
using Microsoft.EntityFrameworkCore;

namespace AuctionStore.Domain.Commands.Auction
{
    public class CheckBadWordsCommand : ICommand<bool>
    {
        public string Title { get; set; }
        public string Description { get; set; }

        public class CheckBadWordsCommandHandler : ICommandHandler<CheckBadWordsCommand, bool>
        {
            private readonly DataContext context;

            public CheckBadWordsCommandHandler(DataContext context)
            {
                this.context = context;
            }

            public async Task<bool> Handle(CheckBadWordsCommand request, CancellationToken cancellationToken)
            {
                var bannedWords = await this.context.BannedWords.Select(x => x.Word.ToLower()).ToListAsync(cancellationToken);

                var lowerTitle = request.Title.ToLower();
                var lowerDescription = request.Description.ToLower();
                foreach (var bannedWord in bannedWords)
                {
                    if (lowerTitle.Contains(bannedWord) || lowerDescription.Contains(bannedWord))
                    {
                        return false;
                    }
                }
                

                return true;
            }
        }
    }
}