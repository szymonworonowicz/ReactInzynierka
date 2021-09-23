using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Enums;
using AuctionStore.Infrastructure.Exceptions;
using MailKit.Net.Smtp;
using MailKit.Security;
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

            try
            {
                await client.SendAsync(mail, cancellationToken);
            }
            catch (Exception e)
            {
                logger.LogError(e, e.Message);
                throw new DomainException((int)DictErrorCodes.SendEmailError, DictErrorCodes.SendEmailError.GetDescription());
            }
            finally
            {
                await client.DisconnectAsync(true, cancellationToken);
            }

        }

        private async Task SmtpConnectAsync(SmtpClient client, CancellationToken ct)
        {
            try
            {
                client.ServerCertificateValidationCallback = (s, c, h, e) => true;
                await client.ConnectAsync(
                    smtpOptions.SmtpClient,
                    smtpOptions.Port,
                    SecureSocketOptions.Auto,
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
    }
}
