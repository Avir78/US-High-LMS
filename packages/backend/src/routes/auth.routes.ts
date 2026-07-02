import express from 'express';
import { AuthController } from '../controllers/auth.controller';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();

router.post('/register', asyncHandler((req, res) => AuthController.register(req, res)));
router.post('/login', asyncHandler((req, res) => AuthController.login(req, res)));
router.post('/refresh-token', asyncHandler((req, res) => AuthController.refreshToken(req, res)));

export default router;
