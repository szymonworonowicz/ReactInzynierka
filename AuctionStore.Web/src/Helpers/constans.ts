import { DictThemeTypes } from "../Enums";

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

export function convertBytesToMbsOrKbs(filesize: number) {
	var size = '';
 
	if (filesize >= 1000000) {
		size = filesize / 1000000 + ' MBs';
	} else if (filesize >= 1000) {
		size = filesize / 1000 + ' KBs';
	} else {
		size = filesize + ' Bs';
	}
 
	return size;
}

const theme = new Map<string, DictThemeTypes> ([
    ["Black", DictThemeTypes.Black],
    ["White", DictThemeTypes.White],
    ["Contrast", DictThemeTypes.Contrast],
])

export const getTheme = (themeName : string) : DictThemeTypes =>{
    return  theme.get(themeName) ?? DictThemeTypes.White;
}

export function getEnumKeys<O extends object, K extends keyof O = keyof O>(obj: O): K[] {
    return Object.keys(obj).filter(k => Number.isNaN(+k)) as K[];
}

// export const getValidator = (translation: any, max: number | null, pattern: { value: RegExp; message: string } | null, required: boolean = false, minLength: number = 2) => {
// 	const registerObject: ValidationOptions = {};
 
// 	if (max)
// 		registerObject.maxLength = {
// 			value: max,
// 			message: translation('common.validations.maxLength', { length: max }),
// 		};
 
// 	if (required) {
// 		if (max) {
// 			registerObject.minLength = {
// 				value: minLength,
// 				message: translation('common.validations.minLength', {
// 					length: minLength,
// 				}),
// 			};
// 		}
// 		registerObject.required = {
// 			value: true,
// 			message: translation('common.validations.required'),
// 		};
// 	}
 
// 	if (pattern) registerObject.pattern = pattern;
// 	return registerObject;
// };