import express from 'express';
import { UserController } from '../controllers/user.controller';
import { authMiddleware } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();

router.use(authMiddleware);

router.get('/profile', asyncHandler((req, res) => UserController.getProfile(req, res)));
router.put('/profile', asyncHandler((req, res) => UserController.updateProfile(req, res)));

export default router;
