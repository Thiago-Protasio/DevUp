import { UserExperiences } from "@prisma/client";
import { IAddExperienceDTO } from "../../dtos/IAddExperienceDTO";

interface IExperiencesRepository {
  addExperience(data: IAddExperienceDTO, user_id: string): Promise<void>;
  removeExperience(experience_id: string): Promise<void>;
  findExperience(experience_id: string, user_id: string): Promise<UserExperiences | null>;
  findAllExperiences(user_id: string): Promise<UserExperiences[]>;
}

export { IExperiencesRepository };