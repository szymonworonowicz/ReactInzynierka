using AuctionStore.Infrastructure.Dtos;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Services.Email.EmailMessages
{
    public class MessageToAuthorMessageModel : EmailMessageBase
    {
        public string AuctionName { get; set; }
        public string Content { get; set; }

        public MessageToAuthorMessageModel(IOptions<SmtpOptions> options) : base(options.Value)
        {

        }

        public override MimeMessage GetEmailContent()
        {
            var message = new MimeMessage();

            message.From.Add(new MailboxAddress("Store", Sender));

            message.Subject = "AuctionMessage";

            var builder = new BodyBuilder
            {
                HtmlBody = string.Format(@"
                    Witaj {0}
                    <p>Masz nową wiadomość dotyczącą aukcji {1}</p>
 
					<p> {2} </p>
                ", UserName, AuctionName, Content)
            };

            message.Body = builder.ToMessageBody();

            return message;
        }
    }
}
