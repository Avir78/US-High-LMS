import { UserModel } from '../models/User';
import { User, UserProfile } from '../types';
import { NotFoundError } from '../exceptions/AppError';
import logger from '../utils/logger';

export class UserService {
  static async getUserProfile(userId: string): Promise<UserProfile> {
    const profile = await UserModel.getProfile(userId);

    if (!profile) {
      throw new NotFoundError('User');
    }

    return profile;
  }

  static async updateUserProfile(
    userId: string,
    updateData: Partial<User>
  ): Promise<User> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new NotFoundError('User');
    }

    const updatedUser = await UserModel.update(userId, updateData);
    logger.info('User profile updated', { userId });
    return updatedUser;
  }

  static async resetUserAccount(userId: string): Promise<void> {
    const user = await UserModel.findById(userId);

    if (!user) {
      throw new NotFoundError('User');
    }

    await UserModel.resetAccount(userId);
    logger.info('User account reset', { userId });
  }
}
