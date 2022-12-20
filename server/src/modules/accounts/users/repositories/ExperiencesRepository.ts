import { UserExperiences } from "@prisma/client";
import { prisma } from "../../../../database/prismaClient";
import { IAddExperienceDTO } from "../dtos/IAddExperienceDTO";
import { IExperiencesRepository } from "./interfaces/IExperiencesRepository";

class ExperiencesRepository implements IExperiencesRepository {
  async findExperience(experience_id: string, user_id: string): Promise<UserExperiences | null> {
    const experience = await prisma.userExperiences.findFirst({
      where: {
        id: experience_id,
        user_id,
      }
    });

    return experience;
  }

  async addExperience(data: IAddExperienceDTO, user_id: string): Promise<void> {
    await prisma.userExperiences.create({
      data: {
        user_id,
        title: data.title,
        company: data.company,
        location: data.location,
        current: data.current,
        start_month: data.start_month,
        start_year: data.start_year,
        end_month: data.end_month,
        end_year: data.end_year,
      }
    });
  }

  async removeExperience(experience_id: string): Promise<void> {
    await prisma.userExperiences.delete({
      where: {
        id: experience_id,
      }
    });
  }

  async findAllExperiences(user_id: string): Promise<UserExperiences[]> {
    const experience = await prisma.userExperiences.findMany({
      where: {
        user_id,
      }
    });

    return experience;
  }

}

export { ExperiencesRepository };