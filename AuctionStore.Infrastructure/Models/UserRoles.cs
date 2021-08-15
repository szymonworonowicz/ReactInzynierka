using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Models
{
    public class UserRoles
    {
        public Guid UserId { get; set; }
        public Guid RoleId { get; set; }

        public virtual Role Role { get; set; }
    }
}
