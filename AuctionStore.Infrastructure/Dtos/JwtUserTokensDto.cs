using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Dtos
{
    public class JwtUserTokensDto
    {
        public string AccessToken { get; set; }
        public string RefreshToken { get; set; }
    }
}
