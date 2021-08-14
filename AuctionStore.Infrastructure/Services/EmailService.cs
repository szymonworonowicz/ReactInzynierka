using AutoMapper.Configuration;
using System;
using System.Collections.Generic;
using System.IO;
using System.Net;
using System.Net.Mail;
using System.Text;
using System.Threading.Tasks;

namespace AuctionStore.Infrastructure.Services
{
    public class EmailService : IEmailService
    {
        //private readonly MessageRequest messageRequest;
        //public EmailService(IConfiguration config)
        //{
        //    this.messageRequest = config.GetSection("MessageRequest").Get<MessageRequest>();
        //}

        public async Task sendRegisterEmailAsync(string callbackUrl, string email)
        {

            MailMessage message = new MailMessage(new MailAddress(messageRequest.UserName), new MailAddress(email));
            message.Subject = "Potwierdzenie rejestracji";
            message.IsBodyHtml = true;
            message.BodyEncoding = Encoding.UTF8;

            using (StreamReader str = new StreamReader("Services/EmailTemplate/template.html"))
            {
                string html = str.ReadToEnd();

                StringBuilder builder = new StringBuilder();
                builder.Append(html);
                builder.Replace("[emailaddress]", callbackUrl);

                message.Body = builder.ToString();
            }

            using (SmtpClient client = new SmtpClient())
            {
                int.TryParse(messageRequest.Port, out int port);
                client.Host = messageRequest.SmtpClient;
                client.Port = port;
                client.Credentials = new NetworkCredential(messageRequest.UserName, messageRequest.Password);
                client.EnableSsl = true;

                try
                {
                    await client.SendMailAsync(message);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }

        public Task WiningEmail(AuctionOffer winingBid)
        {
            return Task.CompletedTask;
        }

        public Task sendLosesEmail(List<AuctionOffer> losesBid)
        {
            throw new NotImplementedException();
        }

        public Task SendMessageToAuthor(string email, string message)
        {
            return Task.CompletedTask;
        }

        public async Task SendNewsletterEmail(string email, List<Auction> auctions)
        {
            MailMessage message = new MailMessage(new MailAddress(messageRequest.UserName), new MailAddress(email));
            message.Subject = $"Newsletter {DateTime.Now.ToShortDateString()}";
            message.IsBodyHtml = true;
            message.BodyEncoding = Encoding.UTF8;

            var builder = new StringBuilder();
            using (var reader = new StreamReader("Services/EmailTemplate/newsletter.html"))
            {
                string html = await reader.ReadToEndAsync();
                builder.Append(html);
            }

            var links = "";
            foreach (var auction in auctions)
            {
                links += $"<a href={$"link/auctions/details/${auction.AuctionId}"}>${auction.Name}<a/> </br>";
            }

            builder.Replace("[Value]", links);
            message.Body = builder.ToString();


            using (SmtpClient client = new SmtpClient())
            {
                int.TryParse(messageRequest.Port, out int port);
                client.Host = messageRequest.SmtpClient;
                client.Port = port;
                client.Credentials = new NetworkCredential(messageRequest.UserName, messageRequest.Password);
                client.EnableSsl = true;

                try
                {
                    await client.SendMailAsync(message);
                }
                catch (Exception ex)
                {
                    throw ex;
                }
            }
        }
    }
}
