import { User } from "@prisma/client";
import { IUserResponseDTO } from "../dtos/IUserResponseDTO";

class UserInfoMap {
  static toDTO({
    email,
    name,
    birthday,
    pic,
    about,
    salary_pretension,
    github,
    linkedin,
    phone,
    headline,
    country,
    city,
    level,
    resume,
    languages,
    skills,
    created_at,
  }: User): IUserResponseDTO {
    const user = {
      email,
      name,
      birthday,
      pic,
      about,
      salary_pretension,
      github,
      linkedin,
      phone,
      headline,
      country,
      city,
      level,
      resume,
      languages,
      skills,
      created_at,
    }

    return user;
  }
}

export { UserInfoMap };