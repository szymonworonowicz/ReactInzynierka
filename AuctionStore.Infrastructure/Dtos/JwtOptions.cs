using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Dtos
{
    public class JwtOptions
    {
        public string JwtRefreshTokenSecretKey { get; set; }
        public string JwtTokenSecretKey { get; set; }
        public int AccessTokenExpiresInMinutes { get; set; }
        public int? RefreshTokenExpiresInMinutes { get; set; }
        public string JwtTokenIssuer { get; set; }
    }
}
