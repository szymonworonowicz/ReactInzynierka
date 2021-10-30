using MediatR;

namespace AuctionStore.Domain.Queries
{
    public interface IQueryHandler<in TCommand, TResult>
        :IRequestHandler<TCommand, TResult>
        where TCommand : IQuery<TResult>
    {
        
    }
}