export class UserRegisterModel {
    constructor(
        public email: string,
        public firstName: string,
        public lastName: string,
        public password: string,
        public repeatPassword: string
    ) { }
}
export class ClinicRegisterModel {
    constructor(
        public email: string,
        public name: string,
        public county: any,
        public city: any,
        public password: string,
        public repeatPassword: string
    ) { }
}