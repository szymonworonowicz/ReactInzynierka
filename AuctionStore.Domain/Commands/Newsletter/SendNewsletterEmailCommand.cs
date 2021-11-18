using AuctionStore.Domain.Repositories;
using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Enums;
using AuctionStore.Infrastructure.Helpers;
using AuctionStore.Infrastructure.Services.Email.EmailMessages;
using AuctionStore.Infrastructure.Services.ImageService;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Newsletter
{
    public class SendNewsletterEmailCommand : IRequest
    {
        public class SendNewsletterEmailCommandHandler : IRequestHandler<SendNewsletterEmailCommand>
        {
            private readonly DataContext context;
            private readonly ISendEmailRepository emailRepository;
            private readonly IOptions<SmtpOptions> smtpOptions;
            private readonly IMapper mapper;
            private readonly IImageService imageService;

            public SendNewsletterEmailCommandHandler(DataContext context, ISendEmailRepository emailRepository,
                IOptions<SmtpOptions> smtpOptions, IMapper mapper,
                IImageService imageService)
            {
                this.context = context;
                this.emailRepository = emailRepository;
                this.smtpOptions = smtpOptions;
                this.mapper = mapper;
                this.imageService = imageService;
            }

            public async Task<Unit> Handle(SendNewsletterEmailCommand request, CancellationToken cancellationToken)

            {
                var currentTime = DateTimeOffset.Now.ToUnixTimeSeconds();
                var newsletters = await context.Newsletters.Include(x => x.Subcategories)
                    .Where(x => x.LastNewsletterTimeStamp < currentTime)
                    .ToListAsync(cancellationToken);

                foreach (var newsletter in newsletters)
                {
                    newsletter.LastNewsletterTimeStamp += Constants.Secons3Days;

                    var categoriesId = newsletter.Subcategories.Select(x => x.SubCategoryId).ToList();
                    var dateTimeNowUnix = DateTimeOffset.Now.ToUnixTimeSeconds();

                    var auctions = await context.Auctions
                        .Include(x => x.AuctionOffers)
                        .Where(x => categoriesId.Contains(x.SubCategoryId.Value))
                        //.Where(x => x.TimeStampEnd > dateTimeNowUnix)
                        .Where(x => x.Status == AuctionStatus.New)
                        .OrderBy(x => x.AuctionOffers.Count())
                        .Take(8)
                        .ProjectTo<AuctionNewsletterDto>(mapper.ConfigurationProvider)
                        .ToListAsync(cancellationToken);

                    if (auctions.Count == 0)
                    {
                        continue;;
                    }
                    foreach (var auction in auctions)
                    {
                        var file = await context.AuctionFiles.FirstOrDefaultAsync(
                            x => x.AuctionId == auction.Id && x.IsMain, cancellationToken);
                        if (file == null)
                        {
                            auction.PhotoString = "";
                            continue;
                        }
                        var img = await imageService.GetImageString(file.MediumPhotoPath);
                        auction.PhotoString = $"data:image/{GetType(file.FileExtensions)};base64,{img}";
                    }

                    var newsletterMessage = new NewsletterMessageModel(smtpOptions)
                    {
                        To = newsletter.Email,
                        UserName = "",
                        Auctions = auctions
                    };

                    emailRepository.AddMessage(newsletterMessage);
                }

                await context.SaveChangesAsync(cancellationToken);

                return Unit.Value;
            }

            private string GetType(DictAuctionFileExtensions extension)
            {
                return extension.GetDescription();
            }
        }
    }
}