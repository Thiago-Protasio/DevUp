import { User } from "@prisma/client";
import { prisma } from "../../../../database/prismaClient";
import { ICreateUserDTO } from "../dtos/ICreateUserDTO";
import { IUsersRepository } from "./interfaces/IUsersRepository";

class UserRepository implements IUsersRepository {
  async create({
    email,
    password,
    name,
    birthday,
  }: ICreateUserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
        birthday,
      }
    });

    return user;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        email: {
          equals: email,
          mode: "insensitive",
        }
      }
    });

    return user;
  }

  async findById(user_id: string): Promise<User | null> {
    const user = await prisma.user.findFirst({
      where: {
        id: {
          equals: user_id,
        }
      }
    });

    return user;
  }

  async update(data: IUpdateUserDTO, user_id: string): Promise<User> {
    const user = await prisma.user.update({
      where: {
        id: user_id
      },
      data: {
        name: data.name,
        about: data.about,
        salary_pretension: data.salary_pretension,
        github: data.github,
        linkedin: data.linkedin,
        phone: data.phone,
        headline: data.headline,
        country: data.country,
        city: data.city,
        languages: data.languages,
        level: data.level,
        skills: data.skills,
      }
    });

    return user;
  }
  async uploadAvatar(avatar: string, user_id: string): Promise<void> {
    await prisma.user.update({
      where: {
        id: user_id
      },
      data: {
        pic: avatar,
      }
    });
  }

  async uploadResume(resume: string, user_id: string): Promise<void> {
    await prisma.user.update({
      where: {
        id: user_id,
      },
      data: {
        resume,
      }
    });
  }
}

export { UserRepository };