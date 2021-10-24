using MediatR;

namespace AuctionStore.Domain.Commands
{
    public interface ICommand<out TResult> : IRequest<TResult>
    {
        
    }
}