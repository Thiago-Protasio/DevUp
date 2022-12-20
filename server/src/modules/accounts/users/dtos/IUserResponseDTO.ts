interface IUserResponseDTO {
  email: String;
  name: String;
  birthday: String;
  pic: String | null;
  about: String | null;
  salary_pretension: number | null;
  github: String | null;
  linkedin: String | null;
  phone: String | null;
  headline: String | null;
  country: String | null;
  city: String | null;
  level: String | null;
  resume: String | null;
  languages: String[];
  skills: String[];
  created_at: Date;
}
export { IUserResponseDTO };