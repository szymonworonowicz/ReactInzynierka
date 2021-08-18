using System.Threading.Tasks;

namespace AuctionStore.Domain.Services
{
    public interface IWebSocketClientService
    {
        uint TryReconnectAfterSecond { get; }

        Task StartConnection();
        Task StopConnection();
    }
}