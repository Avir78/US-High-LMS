import { Request, Response } from 'express';
import { AuthService } from '../services/auth.service';
import { validate, validators } from '../utils/validators';
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../constants/http-codes';
import { ValidationError } from '../exceptions/AppError';

export class AuthController {
  static async register(req: Request, res: Response): Promise<void> {
    const validation = validate(validators.registerValidator, req.body);
    if (!validation.isValid) {
      throw new ValidationError('Validation failed', validation.errors || {});
    }

    const result = await AuthService.register(validation.value);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      status: HTTP_STATUS.CREATED,
      message: SUCCESS_MESSAGES.REGISTER_SUCCESS,
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0.0',
      },
    });
  }

  static async login(req: Request, res: Response): Promise<void> {
    const validation = validate(validators.loginValidator, req.body);
    if (!validation.isValid) {
      throw new ValidationError('Validation failed', validation.errors || {});
    }

    const result = await AuthService.login(validation.value);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      status: HTTP_STATUS.OK,
      message: SUCCESS_MESSAGES.LOGIN_SUCCESS,
      data: {
        user: result.user,
        accessToken: result.accessToken,
        refreshToken: result.refreshToken,
      },
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0.0',
      },
    });
  }

  static async refreshToken(req: Request, res: Response): Promise<void> {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      throw new ValidationError('Refresh token is required', { refreshToken: 'Required' });
    }

    const result = await AuthService.refreshAccessToken(refreshToken);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      status: HTTP_STATUS.OK,
      message: SUCCESS_MESSAGES.TOKEN_REFRESHED,
      data: result,
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0.0',
      },
    });
  }
}
