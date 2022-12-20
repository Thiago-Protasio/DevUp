import { UserEducation } from "@prisma/client";
import { prisma } from "../../../../database/prismaClient";
import { IEducationRepository } from "./interfaces/IEducationRepository";

class EducationsRepository implements IEducationRepository {
  async addEducation(data: IAddEducationDTO, user_id: string): Promise<void> {
    await prisma.userEducation.create({
      data: {
        user_id,
        school: data.school,
        degree: data.degree,
        field: data.field,
        start_month: data.start_month,
        start_year: data.start_year,
        end_month: data.end_month,
        end_year: data.end_year,
        grade: data.grade,
        activities: data.activities,
        description: data.description,
      }
    });
  }

  async removeEducation(education_id: string): Promise<void> {
    await prisma.userEducation.delete({
      where: {
        id: education_id,
      }
    });
  }

  async findEducation(education_id: string, user_id: string): Promise<UserEducation | null> {
    const education = await prisma.userEducation.findFirst({
      where: {
        id: education_id,
        user_id,
      }
    });

    return education;
  }

  async findAllEducation(user_id: string): Promise<UserEducation[]> {
    const education = await prisma.userEducation.findMany({
      where: {
        user_id,
      }
    });

    return education;
  }
}

export { EducationsRepository };