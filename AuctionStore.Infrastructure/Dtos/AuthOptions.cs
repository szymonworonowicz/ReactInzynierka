namespace AuctionStore.Infrastructure.Dtos
{
    public class AuthOptions
    {
        public string Password_Salt { get; set; }
        public string REFRESH_TOKEN_PROVIDER { get; set; }
        public string REFRESH_TOKEN_KEY { get; set; }
        public int REFRESH_TOKEN_VALID_DAYS { get; set; }
    }
}
