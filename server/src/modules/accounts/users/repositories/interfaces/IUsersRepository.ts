import { User } from "@prisma/client";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";

interface IUsersRepository {
  create(data: ICreateUserDTO): Promise<User>;
  update(data: IUpdateUserDTO, user_id: string): Promise<User>;
  uploadAvatar(avatar: string, user_id: string): Promise<void>;
  uploadResume(resume: string, user_id: string): Promise<void>;
  findByEmail(email: string): Promise<User | null>;
  findById(user_id: string): Promise<User | null>;
}

export { IUsersRepository };