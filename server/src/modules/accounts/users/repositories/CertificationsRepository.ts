import { UserCertifications } from "@prisma/client";
import { prisma } from "../../../../database/prismaClient";
import { ICertificationsRepository } from "./interfaces/ICertificationsRepository";

class CertificationsRepository implements ICertificationsRepository {
  async addCertification(data: IAddCertificationDTO, user_id: string): Promise<void> {
    await prisma.userCertifications.create({
      data: {
        user_id,
        name: data.name,
        organization: data.organization,
        description: data.description,
        issued_month: data.issued_month,
        issued_year: data.issued_year
      }
    });
  }

  async removeCertification(certification_id: string): Promise<void> {
    await prisma.userCertifications.delete({
      where: {
        id: certification_id,
      }
    });
  }

  async findCertification(certification_id: string, user_id: string): Promise<UserCertifications | null> {
    const certification = await prisma.userCertifications.findFirst({
      where: {
        id: certification_id,
        user_id,
      }
    });

    return certification;
  }

  async findAllCertifications(user_id: string): Promise<UserCertifications[]> {
    const certification = await prisma.userCertifications.findMany({
      where: {
        user_id,
      }
    });

    return certification;
  }
}

export { CertificationsRepository };