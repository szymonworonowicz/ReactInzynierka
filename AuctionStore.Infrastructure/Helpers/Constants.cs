using System;
using System.Collections.Generic;
using System.Text;

namespace AuctionStore.Infrastructure.Helpers
{
    public class Constants
    {
        public const string EmailRegex = @" / ^(([^<> ()[\]\\.,;:\s@\\]+(\.[^<>()[\]\\.,;:\s@]+)*)|(.+))@(([[0 - 9]{1,3}\\.[0-9]{1,3}\\.[0-9]{ 1,3}\.[0-9]{ 1,3}])| (([a - zA - Z\-0 - 9] +\.)+[a - zA - Z]{ 2,}))$/";
        public const string AlphaNumeric = @"/ (? !\s*$)^[-0 - 9 / A - Za - zżźćńółęąśŻŹĆĄŚĘŁÓŃ$&+,:;=?@#_|[\]' <>.- ^*() % !\s]*$/";
        public const string Alphabetic = @"/ (? !\s*$)^[A - Za - zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s,.-] *$/";
        public const string PhoneNumber = @"/ (^\+\d{2})? (\+\d{ 11}$)| (^\d{ 9}$)/";
        public const string Numbers = @"/ ^[0 - 9] *$/";
        public const string ZipCode = @"/ ^([0 - 9]{2})-([0 - 9]{ 3})$/";
        public const string Decimal = @"/ ^[\d]{0,6}[.,.]?[\d]{ 1,2}$/";
        public const string Password = @"/ ^(?=.{6,50}$)(?: (?=.*\d)(?=.*[A - Z]).*)$/";
        public const string MacAddress = @"/ ^([0 - 9A - Fa - f]{2}[:-]){ 5} ([0 - 9A - Fa - f]{ 2})$/";
    }
}
