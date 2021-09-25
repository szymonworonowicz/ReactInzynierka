using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Services.Email.EmailMessages.NewsletterEmailBuilder;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Services.Email.EmailMessages
{
    public class NewsletterMessageModel : EmailMessageBase
    {
        public List<AuctionNewsletterDto> Auctions{ get; set; }
        private readonly INewsletterMessageBuilder builder;

        public NewsletterMessageModel(IOptions<SmtpOptions> options) : base(options.Value)
        {
            this.builder = new NewsletterMessageBuilder();
        }

        public override MimeMessage GetEmailContent()
        {
            var messageBody = BuildMessage();

            var message = new MimeMessage();

            message.From.Add(new MailboxAddress("Store", Sender));

            message.Subject = $"Newsletter {DateTime.Now.ToString("dd-MM-yyyy")}";

            var builder = new BodyBuilder
            {
                HtmlBody = messageBody
            };

            message.Body = builder.ToMessageBody();

            return message;
        }

        private string BuildMessage()
        {
            builder.CreateView();

            foreach(var auction in Auctions)
            {
                builder.AddAuction(auction);
            }
            builder.EndView();

            return builder.GetEmail();
        }
    }
}
