import { UserEducation } from "@prisma/client";

interface IEducationRepository {
  addEducation(data: IAddEducationDTO, user_id: string): Promise<void>;
  removeEducation(education_id: string): Promise<void>;
  findEducation(education_id: string, user_id: string): Promise<UserEducation | null>;
  findAllEducation(user_id: string): Promise<UserEducation[]>;
}

export { IEducationRepository };