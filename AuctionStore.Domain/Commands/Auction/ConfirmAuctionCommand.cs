using System;
using System.Globalization;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AuctionStore.Domain.Repositories;
using AuctionStore.Infrastructure.DB;
using AuctionStore.Infrastructure.Dtos;
using AuctionStore.Infrastructure.Enums;
using AuctionStore.Infrastructure.ModelDtos;
using AuctionStore.Infrastructure.Models;
using AuctionStore.Infrastructure.Services;
using AuctionStore.Infrastructure.Services.Email.EmailMessages;
using AuctionStore.Infrastructure.Services.Payment.DotpayDtos;
using AutoMapper;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;

namespace AuctionStore.Domain.Commands.Auction
{
    public class ConfirmAuctionCommand : ICommand<FinishAuctionConfirmationDto>
    {
        public class AddressConfirmAuctionCommand
        {
            public Guid SelectedAddressId { get; set; }
            public string PostCode { get; set; }
            public string Street { get; set; }
            public string HouseNo { get; set; }
            public string City { get; set; }
        }

        public Guid AuctionId { get; set; }
        public PaymentTypeEnum PaymentType { get; set; }
        public Guid WinningUserId { get; set; }
        public bool SameAddress { get; set; }
        public bool Inpost { get; set; }
        public AddressConfirmAuctionCommand Address { get; set; }
        public string ParcelName { get; set; }
        public string Message { get; set; }
        public string Language { get; set; }


        public class ConfirmAuctionCommandHandler : ICommandHandler<ConfirmAuctionCommand, FinishAuctionConfirmationDto>
        {
            private readonly DataContext context;
            private readonly ISendEmailRepository emailRepository;
            private readonly IOptions<SmtpOptions> smtpOptions;
            private readonly IPaymentService paymentService;
            private readonly IMapper mapper;

            public ConfirmAuctionCommandHandler(DataContext context, ISendEmailRepository emailRepository,
                IOptions<SmtpOptions> smtpOptions, IPaymentService paymentService, IMapper mapper
            )
            {
                this.context = context;
                this.emailRepository = emailRepository;
                this.smtpOptions = smtpOptions;
                this.paymentService = paymentService;
                this.mapper = mapper;
            }

            public async Task<FinishAuctionConfirmationDto> Handle(ConfirmAuctionCommand request,
                CancellationToken cancellationToken)
            {
                var winningUser =
                    await context.Users.FirstOrDefaultAsync(x => x.Id == request.WinningUserId, cancellationToken);
                var winningAuction =
                    await context.Auctions.FirstOrDefaultAsync(x => x.Id == request.AuctionId, cancellationToken);

                if (winningAuction is null || winningUser is null)
                {
                    return null;
                }

                SendEmailToAuctionAuthor(request, winningUser, winningAuction);

                var result = new FinishAuctionConfirmationDto();

                if (request.PaymentType == PaymentTypeEnum.Dotpay)
                {
                    var maxOffer = await context.AuctionOffer.Where(x => x.AuctionId == request.AuctionId)
                        .MaxAsync(x => x.NewPrice, cancellationToken);

                    result.PaymentLink =
                        await GeneratePaymentLink(request, maxOffer, winningAuction, winningUser, cancellationToken);
                }
                else
                {
                    await SendEmailAboutPaymentAccount(winningAuction.UserId, winningUser.Email, winningUser.UserName,
                        winningAuction.Title, cancellationToken);
                }
                //TODO add DPD Inpost api 

                return result;
            }

            private async Task SendEmailAboutPaymentAccount(Guid userId, string winningUserEmail,
                string winningUserName, string auctionName, CancellationToken cancellationToken)
            {
                var auctionOwner = await context.Users.Include(x => x.BankAccount)
                    .FirstOrDefaultAsync(x => x.Id == userId, cancellationToken);
                if (auctionOwner != null)
                {
                    var bankAccount = mapper.Map<BankAccountDto>(auctionOwner.BankAccount);

                    BankAccountMessageModel message = new BankAccountMessageModel(smtpOptions)
                    {
                        To = winningUserEmail,
                        UserName = winningUserName,
                        Account = bankAccount,
                        AuctionName = auctionName
                    };
                    
                    emailRepository.AddMessage(message);
                }
            }

            private void SendEmailToAuctionAuthor(ConfirmAuctionCommand request, User winningUser,
                Infrastructure.Models.Auction winningAuction)
            {
                if (!string.IsNullOrEmpty(request.Message))
                {
                    emailRepository.AddMessage(new MessageToAuctonWinningMessageModel(smtpOptions)
                    {
                        Content = request.Message,
                        To = winningUser.Email,
                        AuctionName = winningAuction.Title,
                        UserName = winningUser.UserName
                    });
                }
            }

            private async Task<string> GeneratePaymentLink(ConfirmAuctionCommand request, decimal maxOffer,
                Infrastructure.Models.Auction winningAuction, User winningUser, CancellationToken cancellationToken)
            {
                var dotpayRequest = new DotpayRequest()
                {
                    Amount = maxOffer.ToString(CultureInfo.InvariantCulture),
                    Currency = "PLN",
                    Ignore_last_payment_channel = 1,
                    Language = request.Language,
                    ButtonText = request.Language == "pl"
                        ? $"Opłać zamowienie {winningAuction.Title}"
                        : $"Pay for auction {winningAuction.Title}",
                    Description = $"{winningAuction.Id}",
                };

                var dotpayPayer = new DotpayPayer()
                {
                    Email = winningUser.Email,
                    Name = winningUser.FirstName,
                    Surname = winningUser.LastName
                };
                dotpayRequest.Payer = dotpayPayer;

                return await paymentService.GeneratePaymentLink(dotpayRequest, cancellationToken);
            }
        }
    }
}