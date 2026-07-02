import { Request, Response } from 'express';
import { SimulationService } from '../services/simulation.service';
import { validate, validators } from '../utils/validators';
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../constants/http-codes';
import { ValidationError } from '../exceptions/AppError';

export class SimulationController {
  static async createSimulation(req: Request, res: Response): Promise<void> {
    const validation = validate(validators.simulationValidator, req.body);
    if (!validation.isValid) {
      throw new ValidationError('Validation failed', validation.errors || {});
    }

    const simulation = await SimulationService.createSimulation(req.user!.id, validation.value);

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      status: HTTP_STATUS.CREATED,
      message: SUCCESS_MESSAGES.SIMULATION_CREATED,
      data: simulation,
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0.0',
      },
    });
  }

  static async getSimulation(req: Request, res: Response): Promise<void> {
    const simulation = await SimulationService.getSimulation(req.params.id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      status: HTTP_STATUS.OK,
      message: 'Simulation retrieved successfully',
      data: simulation,
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0.0',
      },
    });
  }

  static async getMySimulations(req: Request, res: Response): Promise<void> {
    const simulations = await SimulationService.getStudentSimulations(req.user!.id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      status: HTTP_STATUS.OK,
      message: 'Simulations retrieved successfully',
      data: simulations,
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0.0',
      },
    });
  }

  static async recordTransaction(req: Request, res: Response): Promise<void> {
    const { transaction_type, amount, description } = req.body;

    const transaction = await SimulationService.recordTransaction(req.params.id, {
      transaction_type,
      amount,
      description,
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      status: HTTP_STATUS.CREATED,
      message: SUCCESS_MESSAGES.DECISION_RECORDED,
      data: transaction,
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0.0',
      },
    });
  }

  static async getBalance(req: Request, res: Response): Promise<void> {
    const balance = await SimulationService.getBalance(req.params.id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      status: HTTP_STATUS.OK,
      message: 'Balance retrieved successfully',
      data: { balance },
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0.0',
      },
    });
  }

  static async getTransactionHistory(req: Request, res: Response): Promise<void> {
    const transactions = await SimulationService.getTransactionHistory(req.params.id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      status: HTTP_STATUS.OK,
      message: 'Transaction history retrieved successfully',
      data: transactions,
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0.0',
      },
    });
  }
}
