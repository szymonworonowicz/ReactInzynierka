namespace AuctionStore.Infrastructure.Helpers
{
    public class Constants
    {
        public const string PhoneRegex = "^[+]{0,1}([(][0-9]*[)]){0,1}[0-9]{9,20}$";
        public const string AlphaNumeric = "^[-0-9/A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ$&+,:;=?@#_|[\\]'\"<>.-^*()%!\\s]*$";
        public const string Alphabetic = "^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\\s,.-]*$";
        public const string ZipCode = "^([0-9]{2})-([0-9]{3})$";
        public const string Numbers = "^[0-9]+$";
        public const string Password = "^(?:(?=.*\\d)(?=.*[A-Z]).*)$";
        public const string MacAddress = "^[0-9A-Fa-f]{12}$";

        public const string EmailRegex =
            "^(([^<>()[\\]\\.,;:\\s@\"]+(\\.[^<>()[\\]\\.,;:\\s@\"]+)*)|(\".+\"))" +
            "@(([[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}.[0-9]{1,3}])|(([a-zA-Z-0-9]+.)+[a-zA-Z]{2,}))$";
    }
}
