import express from 'express';
import { SimulationController } from '../controllers/simulation.controller';
import { authMiddleware } from '../middleware/auth';
import { asyncHandler } from '../middleware/errorHandler';

const router = express.Router();

router.use(authMiddleware);

router.post('/', asyncHandler((req, res) => SimulationController.createSimulation(req, res)));
router.get('/me', asyncHandler((req, res) => SimulationController.getMySimulations(req, res)));
router.get('/:id', asyncHandler((req, res) => SimulationController.getSimulation(req, res)));
router.get('/:id/balance', asyncHandler((req, res) => SimulationController.getBalance(req, res)));
router.post('/:id/transaction', asyncHandler((req, res) => SimulationController.recordTransaction(req, res)));
router.get('/:id/history', asyncHandler((req, res) => SimulationController.getTransactionHistory(req, res)));

export default router;
