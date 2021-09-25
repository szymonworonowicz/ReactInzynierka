using AuctionStore.Infrastructure.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Services.Email.EmailMessages.NewsletterEmailBuilder
{
    public interface INewsletterMessageBuilder
    {
        void CreateView();
        void AddAuction(AuctionNewsletterDto auction);
        void EndView();
        string GetEmail();
    }
}
