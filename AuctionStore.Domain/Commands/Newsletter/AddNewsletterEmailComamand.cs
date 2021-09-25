using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Models;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Newsletter
{
    public partial class AddNewsletterEmailComamand : IRequest<bool>
    {
        public string Email { get; set; }
        public List<Guid> Subcategories { get; set; }

        public class AddNewsletterEmailCommandHandler : IRequestHandler<AddNewsletterEmailComamand, bool>
        {
            private readonly DataContext context;

            public AddNewsletterEmailCommandHandler(DataContext context)
            {
                this.context = context;
            }
            public async Task<bool> Handle(AddNewsletterEmailComamand request, CancellationToken cancellationToken)
            {
                var newsletterCategory = new List<NewsletterSubCategory>();
                foreach (var subcategory in request.Subcategories)
                {
                    newsletterCategory.Add(new NewsletterSubCategory { SubCategoryId = subcategory});
                }

                var fromDb = await context.Newsletters.FirstOrDefaultAsync(x => x.Email == request.Email,cancellationToken);

                if(fromDb == null)
                {
                    var newsletter = new Infrastructure.Models.Newsletter
                    {
                        Email = request.Email,
                        LastNewsletterTimeStamp = DateTimeOffset.Now.ToUnixTimeSeconds(),
                        Subcategories = newsletterCategory
                    };
                    await context.Newsletters.AddAsync(newsletter, cancellationToken);

                }
                else
                {
                    fromDb.Subcategories = newsletterCategory;
                }

                await context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
