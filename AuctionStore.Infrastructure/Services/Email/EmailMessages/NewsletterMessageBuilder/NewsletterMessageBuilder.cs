using AuctionStore.Infrastructure.Dtos;
using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Services.Email.EmailMessages.NewsletterEmailBuilder
{
    public class NewsletterMessageBuilder : INewsletterMessageBuilder
    {
        private readonly StringBuilder stringBuilder;

        public NewsletterMessageBuilder()
        {
            this.stringBuilder = new StringBuilder();
        }
        public void AddAuction(AuctionNewsletterDto auction)
        {
            string img = $"<img alt=\"{auction.Title}\" src=\"{auction.PhotoString}\" style=\"height:150px; width:150px;\" \\>";
            string title = $"<p style=\"fontSize:16px\">{auction.Title}</p>";
            string price = $"<div style=\"display:flex; justify-content=flex-end;\"><p>{auction.Price}</p></div>";

            stringBuilder.Append($"<div style=\"display:flex; height:300px; width:200px; flex-direction:column; justify-content:center; align-items:center;\"> {img} {title} {price}</div>");
        }

        public void CreateView()
        {
            stringBuilder.Append($"<div style=\"display:grid;width:100%;height:100%;grid-template-columns:repeat(2,1fr);\">");
        }

        public void EndView()
        {
            stringBuilder.Append("</div>");
        }

        public string GetEmail()
        {
            return stringBuilder.ToString();
        }
    }
}
