using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.CollectionExtensions
{
    public static class IEnumerableExtensions
    {
        public static IEnumerable<TSource> DistinctBy<TSource, TKey> (this IEnumerable<TSource> source, Func<TSource,TKey> keySelector)
        {
            HashSet<TKey> seenKeys = new HashSet<TKey>();

            foreach (TSource item in source)
            {
                if(seenKeys.Add(keySelector(item)))
                {
                    yield return item;
                }
            }
        }
    }
}
