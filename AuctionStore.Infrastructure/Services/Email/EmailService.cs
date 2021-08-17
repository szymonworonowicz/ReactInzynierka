using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Enums;
using AuctionStore.Infrastructure.Exceptions;
using MailKit.Net.Smtp;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using MimeKit;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace AuctionStore.Infrastructure.Services.Email
{
    public class EmailService : IEmailService
    {
        private readonly SmtpOptions smtpOptions;
        private readonly ILogger<EmailService> logger;

        public EmailService(IOptions<SmtpOptions> smtpOptions, ILogger<EmailService> logger)
        {
            this.smtpOptions = smtpOptions.Value;
            this.logger = logger;
        }

        public async Task SendEmail(MimeMessage mail, string to, CancellationToken cancellationToken)
        {
            using var client = new SmtpClient();

            mail.To.Add(new MailboxAddress(to, to));
            await SmtpConnectAsync(client, cancellationToken);
            await SmtpAuthenticateAsync(client, cancellationToken);

        }

        private async Task SmtpConnectAsync(SmtpClient client, CancellationToken ct)
        {
            try
            {
                await client.ConnectAsync(
                    smtpOptions.SmtpClient,
                    smtpOptions.Port,
                    smtpOptions.UseSsl,
                    ct);
            }
            catch (Exception e)
            {
                logger.LogError(e, e.Message);
                throw new DomainException((int)DictErrorCodes.SmtpConnectionError, DictErrorCodes.SmtpConnectionError.GetDescription());
            }
        }

        private async Task SmtpAuthenticateAsync(SmtpClient client , CancellationToken ct)
        {
            try
            {
                await client.AuthenticateAsync(
                    smtpOptions.UserName,
                    smtpOptions.Password,
                    ct);
            }
            catch (Exception e)
            {
                logger.LogError(e, e.Message);
                throw new DomainException((int)DictErrorCodes.SmtpAuthenticationError, DictErrorCodes.SmtpAuthenticationError.GetDescription());
            }
        }

        public MimeMessage CreatePasswordResetEmail(string userName, string resetUrl, string tmpPassword)
        {
            var message = new MimeMessage();

            message.From.Add(new MailboxAddress("Store", smtpOptions.Sender));

            message.Subject = "Reset Password";

            var builder = new BodyBuilder
            {
                HtmlBody = string.Format(@"
                    Witaj {0}
                    <p>Otrzymaliśmy prośbę o zresetowanie Twojego hasła.</p>
 
					<p>Kliknij <a href={1}>tutaj</a> lub skopiuj ten link {2} <br> a następnie wpisz tymczasowe hasło: <b>{3}</b></p>
					<p>Link jest ważny 1 godzinę.</p>
 
					<p>Jeżeli nie prosiłeś o zresetowanie hasła, zignoruj tą wiadomość.</p>
                ", userName, resetUrl, resetUrl, tmpPassword)
            };

            message.Body = builder.ToMessageBody();

            return message;
        }
    }
}
