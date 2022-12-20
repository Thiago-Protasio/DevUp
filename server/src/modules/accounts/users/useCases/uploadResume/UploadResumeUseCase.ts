import { resolve } from "path";
import fs from "fs";
import upload from "../../../../../config/upload";
import { UserRepository } from "../../repositories/UsersRepository";

class UploadResumeUseCase {
  async execute(resume: string, user_id: string): Promise<void> {
    const userRepository = new UserRepository();
    const user = await userRepository.findById(user_id);

    if (!user) {
      throw new Error("User not found!");
    }

    if (user.resume) {
      const filename = resolve(`${upload.uploadsFolder}/resumes`, user.resume);

      try {
        await fs.promises.stat(filename);
      } catch {
        return;
      }

      await fs.promises.unlink(filename);
    }

    await fs.promises.rename(
      resolve(upload.uploadsFolder, resume),
      resolve(`${upload.uploadsFolder}/resumes`, resume)
    );

    await userRepository.uploadResume(resume, user_id);
  }
}

export { UploadResumeUseCase };