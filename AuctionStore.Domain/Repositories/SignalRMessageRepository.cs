using AuctionStore.Infrastructure.SignalRModels;
using System.Collections.Concurrent;

namespace AuctionStore.Domain.Repositories
{
    public class SignalRMessageRepository : ISignalRMessageRepository
    {
        private readonly ConcurrentQueue<MessageModel> messageQueue;

        public SignalRMessageRepository()
        {
            messageQueue = new ConcurrentQueue<MessageModel>();
        }

        public void AddMessage(MessageModel message)
        {
            if (message == null)
                return;

            this.messageQueue.Enqueue(message);
        }

        public MessageModel DeleteMessage()
        {
            if (this.messageQueue.Count == 0)
                return null;

            this.messageQueue.TryDequeue(out var message);

            return message;
        }

        public MessageModel GetMessage()
        {
            if (this.messageQueue.Count == 0)
                return null;

            this.messageQueue.TryPeek(out var message);
            return message;
        }

        public int NumberOfMessages()
        {
            return this.messageQueue.Count;
        }
    }
}
