interface ICreateUserDTO {
  email: string;
  password: string;
  password_confirm?: string;
  name: string;
  birthday: string;
}

export { ICreateUserDTO };