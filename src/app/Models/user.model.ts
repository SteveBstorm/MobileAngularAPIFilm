export class RegisterForm {
    lastName: string
    firstName: string
    email: string
    passwd: string
}

export class LoginForm {
    email : string
    passwd : string
}

export class User {
    customerId : number
    lastName : string
    firstName : string
    email : string
    token : string
}
