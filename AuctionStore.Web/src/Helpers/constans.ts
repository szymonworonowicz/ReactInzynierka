export const Admin = "Admin";
export const User = "User";

export const EmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const AlphaNumeric = /(?!\s*$)^[-0-9/A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ$&+,:;=?@#_|[\]'"<>.-^*()%!\s]*$/;
export const Alphabetic = /(?!\s*$)^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s,.-]*$/;
export const PhoneNumber = /(^\+\d{2})?(\+\d{11}$)|(^\d{9}$)/;
export const Numbers = /^[0-9]*$/;
export const ZipCode = /^([0-9]{2})-([0-9]{3})$/;
export const Decimal = /^[\d]{0,6}[.,.]?[\d]{1,2}$/;
export const Password = /^(?=.{6,50}$)(?:(?=.*\d)(?=.*[A-Z]).*)$/;
export const MacAddress = /^([0-9A-Fa-f]{2}[:-]){5}([0-9A-Fa-f]{2})$/;