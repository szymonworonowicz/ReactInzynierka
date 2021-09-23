using AuctionStore.Infrastructure.Dtos;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Services.Email.EmailMessages
{
    public class PasswordResetMessageModel : EmailMessageBase
    {
        public string ResetUrl { get; set; }
        public string TempPassword { get; set; }

        public PasswordResetMessageModel(IOptions<SmtpOptions> options) : base(options.Value)
        {
            
        }

        public override MimeMessage GetEmailContent()
        {
            var message = new MimeMessage();

            message.From.Add(new MailboxAddress("Store", Sender));

            message.Subject = "Reset Password";

            var builder = new BodyBuilder
            {
                HtmlBody = string.Format(@"
                    Witaj {0}
                    <p>Otrzymaliśmy prośbę o zresetowanie Twojego hasła.</p>
 
					<p>Kliknij <a href={1}>tutaj</a> lub skopiuj ten link {2} <br> a następnie wpisz tymczasowe hasło: <b>{3}</b></p>
					<p>Link jest ważny 1 godzinę.</p>
 
					<p>Jeżeli nie prosiłeś o zresetowanie hasła, zignoruj tą wiadomość.</p>
                ", UserName, ResetUrl, ResetUrl, TempPassword)
            };

            message.Body = builder.ToMessageBody();

            return message;
        }
    }
}
