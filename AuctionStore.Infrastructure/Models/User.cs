using System;
using System.Collections.Generic;

namespace AuctionStore.Infrastructure.Models
{
    public class User
    {
        public Guid Id { get; set; }

        public string UserName { get; set; }

        public string FirstName { get; set; }

        public string LastName { get; set; }

        public string PasswordHash { get; set; }

        public string Email { get; set; }

        public bool IsDisabled { get; set; }

        public bool IsBanned { get; set; }
        public DateTime? EndOffBan { get; set; }

        public bool IsDeleted { get; set; }
        public DateTime LastLoginDateUtc { get; set; }
        public DateTime CreatedDateUtc { get; set; }

        public virtual UserRoles UserRoles {get;set;}
        public virtual IEnumerable<Address> Addresses { get; set; }
        public virtual BankAccount BankAccount { get; set; }
        public virtual IEnumerable<UserToken> UserTokens { get; set; }
    }
}
