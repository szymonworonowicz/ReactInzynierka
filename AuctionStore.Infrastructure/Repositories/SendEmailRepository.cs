using AuctionStore.Infrastructure.Services.Email.EmailMessages;
using System;
using System.Collections.Concurrent;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Domain.Repositories
{
    public class SendEmailRepository : ISendEmailRepository
    {
        private readonly ConcurrentQueue<EmailMessageBase> messageQueue;

        public SendEmailRepository()
        {
            messageQueue = new ConcurrentQueue<EmailMessageBase>();
        }
        public void AddMessage(EmailMessageBase message)
        {
            if(message == null)
            {
                return;
            }

            this.messageQueue.Enqueue(message);
        }

        public EmailMessageBase GetMessage()
        {
            if(this.messageQueue.Count == 0)
            {
                return null;
            }

            this.messageQueue.TryDequeue(out EmailMessageBase message);

            return message;
        }

        public EmailMessageBase PeekMessage()
        {
            if (this.messageQueue.Count == 0)
            {
                return null;
            }

            this.messageQueue.TryPeek(out EmailMessageBase message);

            return message;
        }

        public int NumberOfMessages()
        {
            return this.messageQueue.Count;
        }
    }
}
