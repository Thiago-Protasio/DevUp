interface ICreateCompanyDTO {
  email: string;
  password: string;
  password_confirm?: string;
  name: string;
  description: string;
}