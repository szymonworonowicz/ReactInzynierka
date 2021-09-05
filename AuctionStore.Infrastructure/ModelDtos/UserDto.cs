using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.ModelDtos
{
    public class UserDto
    {
        public string UserName { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Email { get; set; }
        public string LastLoginDateUtc { get; set; }
    }
}
