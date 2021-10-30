using MediatR;

namespace AuctionStore.Domain.Queries
{
    public interface IQuery<out TResult> : IRequest<TResult>

    {
        
    }
}