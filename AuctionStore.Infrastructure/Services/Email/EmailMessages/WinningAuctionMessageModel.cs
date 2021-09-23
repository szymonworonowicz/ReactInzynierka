using AuctionStore.Infrastructure.Dtos;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Services.Email.EmailMessages
{
    public class WinningAuctionMessageModel : EmailMessageBase
    {
        public string AuctionName { get; set; }
        public decimal Price { get; set; }

        public WinningAuctionMessageModel(IOptions<SmtpOptions> options) : base(options.Value)
        {

        }

        public override MimeMessage GetEmailContent()
        {
            var message = new MimeMessage();

            message.From.Add(new MailboxAddress("Store", Sender));

            message.Subject = "Win Auction";

            var builder = new BodyBuilder
            {
                HtmlBody = string.Format(@"
                    Witaj {0}
                    <p>Aukcja {1} się zakończyła</p>
 
					<p>Twoja oferta nie okazała się największa. Gratulacje </p>

                    <p>Aukcja została dodana do listy twoich wygranych aukcji , gdzie możesz sfinalizować transakcje </p>
                ", UserName, AuctionName)
            };

            message.Body = builder.ToMessageBody();

            return message;
        }
    }
}
