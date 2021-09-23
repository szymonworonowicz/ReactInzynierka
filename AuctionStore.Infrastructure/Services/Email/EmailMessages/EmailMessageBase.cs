using AuctionStore.Infrastructure.Dtos;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Services.Email.EmailMessages
{
    public abstract class EmailMessageBase
    {
        public string To { get; set; }
        public string UserName { get; set; }

        protected string Sender { get; set; }


        public EmailMessageBase(SmtpOptions options)
        {
            this.Sender = options.Sender;
        }

        public abstract MimeMessage GetEmailContent();
    }
}
