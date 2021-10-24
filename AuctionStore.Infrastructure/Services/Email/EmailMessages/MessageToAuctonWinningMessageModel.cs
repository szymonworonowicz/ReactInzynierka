using AuctionStore.Infrastructure.Dtos;
using Microsoft.Extensions.Options;
using MimeKit;

namespace AuctionStore.Infrastructure.Services.Email.EmailMessages
{
    public class MessageToAuctonWinningMessageModel : EmailMessageBase
    {
        public string AuctionName { get; set; }
        public string Content { get; set; }

        public MessageToAuctonWinningMessageModel(IOptions<SmtpOptions> options) : base(options.Value)
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
                    <p>Masz nową wiadomość dotyczącą wwygranej  aukcji {1}</p>
 
					<p> {2} </p>
                ", UserName, AuctionName, Content)
            };

            message.Body = builder.ToMessageBody();

            return message;
        }
    }
}