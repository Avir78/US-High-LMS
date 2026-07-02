import { Request, Response } from 'express';
import { UserService } from '../services/user.service';
import { validate, validators } from '../utils/validators';
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../constants/http-codes';
import { ValidationError } from '../exceptions/AppError';

export class UserController {
  static async getProfile(req: Request, res: Response): Promise<void> {
    const profile = await UserService.getUserProfile(req.user!.id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      status: HTTP_STATUS.OK,
      message: 'Profile retrieved successfully',
      data: profile,
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0.0',
      },
    });
  }

  static async updateProfile(req: Request, res: Response): Promise<void> {
    const validation = validate(validators.profileUpdateValidator, req.body);
    if (!validation.isValid) {
      throw new ValidationError('Validation failed', validation.errors || {});
    }

    const updatedUser = await UserService.updateUserProfile(req.user!.id, validation.value);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      status: HTTP_STATUS.OK,
      message: SUCCESS_MESSAGES.PROFILE_UPDATED,
      data: updatedUser,
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0.0',
      },
    });
  }
}
