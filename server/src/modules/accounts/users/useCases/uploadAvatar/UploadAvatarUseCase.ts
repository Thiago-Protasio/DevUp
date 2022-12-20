import fs from "fs";
import { resolve } from "path";
import upload from "../../../../../config/upload";
import { UserRepository } from "../../repositories/UsersRepository";

class UploadAvatarUseCase {
  async execute(avatar: string, user_id: string): Promise<void> {
    const usersRepository = new UserRepository();
    const user = await usersRepository.findById(user_id);

    if (!user) {
      throw new Error("User not found!");
    }

    if (user.pic) {
      const filename = resolve(`${upload.uploadsFolder}/avatars`, user.pic);

      try {
        await fs.promises.stat(filename);
      } catch {
        return;
      }

      await fs.promises.unlink(filename);
    }

    await fs.promises.rename(
      resolve(upload.uploadsFolder, avatar),
      resolve(`${upload.uploadsFolder}/avatars`, avatar)
    );

    await usersRepository.uploadAvatar(avatar, user_id);
  }
}

export { UploadAvatarUseCase };