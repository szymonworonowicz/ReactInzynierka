using System;
using System.Collections.Generic;
using System.Text;

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

        public bool IsDeleted { get; set; }
        public DateTime LastLoginDateUtc { get; set; }

        public virtual UserRoles UserRoles {get;set;}
    }
}
