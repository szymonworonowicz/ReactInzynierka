using AuctionStore.Domain.Repositories;
using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Services.Email.EmailMessages;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Message
{
    public class AddMessageCommand : IRequest<bool>
    {
        public Guid AuctionId { get; set; }
        public Guid UserId { get; set; }
        public string Text { get; set; }

        public class AddMessageCommandHandler : IRequestHandler<AddMessageCommand,bool>
        {
            private readonly DataContext context;
            private readonly IMapper mapper;
            private readonly ISendEmailRepository emailRepository;
            private readonly IOptions<SmtpOptions> smtpOptions;

            public AddMessageCommandHandler(DataContext context, IMapper mapper, ISendEmailRepository emailRepository, IOptions<SmtpOptions> smtpOptions)
            {
                this.context = context;
                this.mapper = mapper;
                this.emailRepository = emailRepository;
                this.smtpOptions = smtpOptions;
            }

            public async Task<bool> Handle(AddMessageCommand request, CancellationToken cancellationToken)
            {
                var target = mapper.Map<Infrastructure.Models.Message>(request);
                target.Added = DateTimeOffset.Now.ToUnixTimeSeconds();

                await context.Messages.AddAsync(target, cancellationToken);

                var auctionName = await context.Auctions.Where(x => x.Id == request.AuctionId).Select(x => x.Title).FirstOrDefaultAsync(cancellationToken);
                var user = await context.Users.Where(x => x.Id == request.UserId).Select(x =>new { x.Email, x.FirstName }).FirstOrDefaultAsync(cancellationToken);

                emailRepository.AddMessage(new MessageToAuthorMessageModel(smtpOptions) {
                    AuctionName = auctionName,
                    Content = request.Text,
                    To = user.Email,
                    UserName = user.FirstName
                });

                await context.SaveChangesAsync(cancellationToken);

                return true;
            }
        }
    }
}
