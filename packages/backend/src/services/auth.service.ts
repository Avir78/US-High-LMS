import { generateId, hashPassword, comparePassword } from '../utils/helpers';
import { generateToken, generateRefreshToken, verifyRefreshToken } from '../config/auth';
import { UserModel } from '../models/User';
import { User, AuthRequest, RegisterRequest, JwtPayload } from '../types';
import { UnauthorizedError, ConflictError } from '../exceptions/AppError';
import { SUCCESS_MESSAGES, ERROR_MESSAGES } from '../constants/http-codes';
import logger from '../utils/logger';

export class AuthService {
  static async login(
    credentials: AuthRequest
  ): Promise<{ user: Omit<User, 'password_hash'>; accessToken: string; refreshToken: string }> {
    const user = await UserModel.findByEmail(credentials.email);

    if (!user) {
      throw new UnauthorizedError(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    const isPasswordValid = await comparePassword(credentials.password, user.password_hash);

    if (!isPasswordValid) {
      throw new UnauthorizedError(ERROR_MESSAGES.INVALID_CREDENTIALS);
    }

    if (user.status !== 'active') {
      throw new UnauthorizedError('Account is not active');
    }

    const { password_hash, ...userWithoutPassword } = user;

    const payload = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const accessToken = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    logger.info('User logged in', { userId: user.id, email: user.email });

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  static async register(
    registerData: RegisterRequest
  ): Promise<{ user: Omit<User, 'password_hash'>; accessToken: string; refreshToken: string }> {
    const existingUser = await UserModel.findByEmail(registerData.email);

    if (existingUser) {
      throw new ConflictError(ERROR_MESSAGES.USER_ALREADY_EXISTS);
    }

    const hashedPassword = await hashPassword(registerData.password);
    const userId = generateId();

    const newUser = await UserModel.create({
      id: userId,
      email: registerData.email,
      password_hash: hashedPassword,
      role: registerData.role,
      first_name: registerData.first_name,
      last_name: registerData.last_name,
      status: 'active',
    });

    const { password_hash, ...userWithoutPassword } = newUser;

    const payload = {
      id: newUser.id,
      email: newUser.email,
      role: newUser.role,
    };

    const accessToken = generateToken(payload);
    const refreshToken = generateRefreshToken(payload);

    logger.info('New user registered', { userId: newUser.id, email: newUser.email });

    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  }

  static async refreshAccessToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      const decoded = verifyRefreshToken(refreshToken);
      const payload = {
        id: decoded.id,
        email: decoded.email,
        role: decoded.role,
      };
      const newAccessToken = generateToken(payload);
      return { accessToken: newAccessToken };
    } catch (error: any) {
      throw new UnauthorizedError(ERROR_MESSAGES.TOKEN_INVALID);
    }
  }
}
