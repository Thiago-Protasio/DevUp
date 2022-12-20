import { UserCertifications } from "@prisma/client";

interface ICertificationsRepository {
  addCertification(data: IAddCertificationDTO, user_id: string): Promise<void>;
  removeCertification(certification_id: string): Promise<void>;
  findCertification(certification_id: string, user_id: string): Promise<UserCertifications | null>;
  findAllCertifications(user_id: string): Promise<UserCertifications[]>;
}

export { ICertificationsRepository };