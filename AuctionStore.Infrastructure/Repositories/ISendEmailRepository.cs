using AuctionStore.Infrastructure.Services.Email;
using AuctionStore.Infrastructure.Services.Email.EmailMessages;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Domain.Repositories
{
    public interface ISendEmailRepository
    {
        void AddMessage(EmailMessageBase model);
        EmailMessageBase GetMessage();
        EmailMessageBase PeekMessage();
        int NumberOfMessages();
    }
}
