using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Services.Email;
using MediatR;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using System;
using System.ComponentModel.DataAnnotations;
using System.Threading;
using System.Threading.Tasks;
using AuctionStore.Infrastructure.Dtos;
using Microsoft.EntityFrameworkCore;
using System.Security.Cryptography;
using AuctionStore.Infrastructure.Models;
using AuctionStore.Domain.Repositories;
using AuctionStore.Infrastructure.Services.Email.EmailMessages;

namespace AuctionStore.Domain.Commands.Auth
{
    public class ResetPasswordRequestCommand : IRequest<bool>
    {
        [Required]
        public string Email { get; set; }

        public class ResetPasswordRequestCommandHandler : IRequestHandler<ResetPasswordRequestCommand, bool>
        {
            private readonly DataContext context;
            private readonly ILogger<ResetPasswordRequestCommand> logger;
            private readonly IOptions<WebUrlOptions> urlOptions;
            private readonly ISendEmailRepository emailRepository;
            private readonly IOptions<SmtpOptions> smtpOptions;

            public ResetPasswordRequestCommandHandler(DataContext context, ILogger<ResetPasswordRequestCommand> logger,
                IOptions<WebUrlOptions> urlOptions, ISendEmailRepository emailRepository, IOptions<SmtpOptions> smtpOptions)
            {
                this.context = context;
                this.logger = logger;
                this.urlOptions = urlOptions;
                this.emailRepository = emailRepository;
                this.smtpOptions = smtpOptions;
            }

            public async Task<bool> Handle(ResetPasswordRequestCommand request, CancellationToken cancellationToken)
            {
                var user = await context.Users.FirstOrDefaultAsync(x => x.Email == request.Email && !x.IsDeleted, cancellationToken);

                if (user == null)
                    return false;

                var previousRequest = await context.UserTemporaryPasswords
                    .FirstOrDefaultAsync(x => x.UserId == user.Id && !x.IsUsed, cancellationToken);

                if (previousRequest != null)
                    previousRequest.IsUsed = true;

                var tmpPassword = GeneratePassword(12);
                var token = GenerateToken();
                var resetUrl = $"{urlOptions.Value.BaseUrl}resetpassword/{token}";

                var userTmpPwd = new UserTemporaryPassword
                {
                    Password = tmpPassword,
                    Token = token,
                    RequestDateUtc = DateTime.UtcNow,
                    UserId = user.Id,
                    IsUsed = false
                };

                await context.UserTemporaryPasswords.AddAsync(userTmpPwd, cancellationToken);
                await context.SaveChangesAsync(cancellationToken);

                emailRepository.AddMessage(new PasswordResetMessageModel(smtpOptions)
                {
                    ResetUrl = resetUrl,
                    TempPassword = tmpPassword,
                    UserName = user.UserName,
                    To = request.Email
                });

                return true;

            }

            private string GeneratePassword(int length)
            {
                using RNGCryptoServiceProvider cryptRNG = new RNGCryptoServiceProvider();
                var buffer = new byte[length];

                cryptRNG.GetBytes(buffer);

                return Convert.ToBase64String(buffer);
            }

            private string GenerateToken() => Guid.NewGuid().ToString("n");
        }
    }
}
