import { CertificationsRepository } from "../../../repositories/CertificationsRepository";

class RemoveCertificationUseCase {
  async execute(certification_id: string, user_id: string): Promise<void> {
    const certificationsRepository = new CertificationsRepository();

    const certification = await certificationsRepository.findCertification(certification_id, user_id);

    if (!certification) {
      throw new Error("Certificaiton not found!");
    }

    await certificationsRepository.removeCertification(certification_id);
  }
}

export { RemoveCertificationUseCase };