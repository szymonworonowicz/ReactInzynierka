using System;

namespace AuctionStore.Infrastructure.Models
{
    public class BankAccount
    {
        public Guid Id { get; set; }
        public string AccountNr { get; set; }
        public string OwnerFirstName { get; set; }
        public string OwnerLastName { get; set; }
        public string OwnerAddress { get; set; }
    }
}