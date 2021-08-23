using System.ComponentModel;

namespace AuctionStore.Infrastructure.Enums
{
    public enum DictErrorCodes 
    {
        [Description("No Error")]
        NoneError = 0,

        [Description("Unauthorized")]
        UnAuthorize = 1000,
        
        [Description("UserNotFound")]
        UserNotFound = 1001,

        [Description("Smtp Connection Error")]
        SmtpConnectionError = 1002,

        [Description("SmtpAuthenticationError")]
        SmtpAuthenticationError = 1003,

        [Description("Error creating JwtToken")]
        ErrorWhileCreatingJWTToken = 1004,
        
        [Description("Error in send email")]
        SendEmailError = 1005
    }
}
