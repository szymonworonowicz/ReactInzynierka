using System;
using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.ModelDtos;
using Microsoft.Extensions.Options;
using MimeKit;

namespace AuctionStore.Infrastructure.Services.Email.EmailMessages
{
    public class BankAccountMessageModel : EmailMessageBase
    {
        public BankAccountDto Account { get; set; }
        public string AuctionName{ get; set; }
        public BankAccountMessageModel(IOptions<SmtpOptions> options) : base(options.Value)
        {
        }

        public override MimeMessage GetEmailContent()
        {
            var message = new MimeMessage();

            message.From.Add(new MailboxAddress("Store", Sender));

            message.Subject = "Losing Auction";

            var builder = new BodyBuilder
            {
                HtmlBody = string.Format(@"
                    Witaj {0}
                    <p>Aukcja {1} się zakończyła</p>
                    <p>Dane do wykonaaia przelewu </p>
                     <p>Numer Konta :{2} </p>
                     <p>{3} {4} </p>
                     <p>{5} </p>
                    
                ",UserName, AuctionName, Account.AccountNr, Account.OwnerFirstName, Account.OwnerLastName, Account.OwnerAddress)
            };

            message.Body = builder.ToMessageBody();

            return message;
        }
    }
}