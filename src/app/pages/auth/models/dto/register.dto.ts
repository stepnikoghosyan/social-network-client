export class RegisterDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;

  constructor(data: { email: string, password: string, firstName: string, lastName: string }) {
    this.email = data.email;
    this.password = data.password;
    this.firstName = data.firstName;
    this.lastName = data.lastName;
  }
}
