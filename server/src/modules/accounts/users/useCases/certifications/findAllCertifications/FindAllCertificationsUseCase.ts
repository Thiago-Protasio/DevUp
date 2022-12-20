import { CertificationsRepository } from "../../../repositories/CertificationsRepository";

class FindAllCertificationsUseCase {
  async execute(user_id: string) {
    const certificationsRepository = new CertificationsRepository();

    const certifications = await certificationsRepository.findAllCertifications(user_id);

    if (certifications.length === 0) {
      throw new Error("Could not find any education")
    }

    return certifications;
  }
}

export { FindAllCertificationsUseCase };
