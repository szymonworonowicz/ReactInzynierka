using AuctionStore.Domain.Repositories;
using AuctionStore.Infrastructure.Services.Email;
using MediatR;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Domain.Commands.Email
{
    public class SendEmailsCommand : IRequest
    {
        public class SendEmailCommandHandler : IRequestHandler<SendEmailsCommand>
        {
            private readonly IEmailService emailService;
            private readonly ISendEmailRepository emailRepository;

            public SendEmailCommandHandler(IEmailService emailService, ISendEmailRepository emailRepository )
            {
                this.emailService = emailService;
                this.emailRepository = emailRepository;
            }
            public async Task<Unit> Handle(SendEmailsCommand request, CancellationToken cancellationToken)
            {
                for (int i = 0; i < 100; i++)
                {
                    var message = emailRepository.GetMessage();
                    if(message == null)
                    {
                        break;
                    }

                    await emailService.SendEmail(message.GetEmailContent(), message.To, cancellationToken);
                }
                return Unit.Value;
            }
        }
    }
}
