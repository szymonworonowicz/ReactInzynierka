export const EmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@(([[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const AlphaNumeric = /(?!\s*$)^[-0-9/A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ$&+,:;=?@#_|[\]'"<>.-^*()%!\s]*$/;
export const Alphabetic = /(?!\s*$)^[A-Za-zżźćńółęąśŻŹĆĄŚĘŁÓŃ\s,.-]*$/;
export const PhoneNumber = /(^\+\d{2})?(\+\d{11}$)|(^\d{9}$)/;
export const Numbers = /^[0-9]*$/;
export const ZipCode = /^([0-9]{2})-([0-9]{3})$/;
export const Decimal = /^[\d]{0,6}[.,.]?[\d]{1,2}$/;
export const Password = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

export enum ValidatorType {
    Email,
    AlphaNumeric,
    Alphabetic,
    PhoneNumber,
    Numbers,
    ZipCode,
    Decimal,
    Password
}
export const getValidators = () => {
    return new Map<ValidatorType, RegExp>([
        [ValidatorType.Email, EmailRegex],
        [ValidatorType.Alphabetic, Alphabetic],
        [ValidatorType.AlphaNumeric, AlphaNumeric],
        [ValidatorType.PhoneNumber, PhoneNumber],
        [ValidatorType.Numbers, Numbers],
        [ValidatorType.ZipCode, ZipCode],
        [ValidatorType.Decimal, Decimal],
        [ValidatorType.Password, Password],

    ])
}

export const UserRoles = {
    Admin : 'Admin',
    User : "User",
    Both: ["Admin","User"]
}

export const GuidEmpty = '00000000-0000-0000-0000-000000000000';