using AuctionStore.Infrastructure.Dtos;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Services.Email.EmailMessages
{
    public class CancelAuctionMessageModel : EmailMessageBase
    {
        public string AuctionName { get; set; }
        public CancelAuctionMessageModel(IOptions<SmtpOptions> options) : base(options.Value)
        {

        }

        public override MimeMessage GetEmailContent()
        {
            var message = new MimeMessage();

            message.From.Add(new MailboxAddress("Store", Sender));

            message.Subject = "Cancel Auction";

            var builder = new BodyBuilder
            {
                HtmlBody = string.Format(@"
                    Witaj {0}
                    <p>Aukcja {1} została anulowana</p>
                ", UserName, AuctionName)
            };

            message.Body = builder.ToMessageBody();

            return message;
        }
    }
}
