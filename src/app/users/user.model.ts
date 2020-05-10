export class UserRegisterModel {
    constructor(
        public email: string,
        public firstName: string,
        public lastName: string,
        public password: string,
        public repeatPassword: string
    ) { }
}