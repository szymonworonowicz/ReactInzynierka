using AuctionStore.Infrastructure.SignalRModels;

namespace AuctionStore.Domain.Repositories
{
    public interface ISignalRMessageRepository
    {
        void AddMessage(MessageModel message);
        MessageModel DeleteMessage();
        MessageModel GetMessage();
        int NumberOfMessages();
    }
}