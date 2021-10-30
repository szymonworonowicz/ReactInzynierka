using System;

namespace AuctionStore.Infrastructure.ModelDtos
{
    public class BankAccountDto
    {
        public Guid Id { get; set; }
        public string AccountNr { get; set; }
        public string OwnerFirstName { get; set; }
        public string OwnerLastName { get; set; }
        public string OwnerAddress { get; set; }
        
    }
}