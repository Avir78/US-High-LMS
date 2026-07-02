import { generateId } from '../utils/helpers';
import { SimulationModel } from '../models/Simulation';
import { Simulation, SimulationSetupRequest, Transaction } from '../types';
import { NotFoundError } from '../exceptions/AppError';
import { INITIAL_CAPITAL } from '../constants/business-types';
import logger from '../utils/logger';

export class SimulationService {
  static async createSimulation(
    studentId: string,
    setupRequest: SimulationSetupRequest
  ): Promise<Simulation> {
    const simulationId = generateId();
    const simulation = await SimulationModel.create({
      id: simulationId,
      student_id: studentId,
      business_type: setupRequest.business_type,
      business_name: setupRequest.business_name,
      capital: INITIAL_CAPITAL,
    });

    logger.info('Simulation created', {
      studentId,
      businessType: setupRequest.business_type,
      businessName: setupRequest.business_name,
    });

    return simulation;
  }

  static async getSimulation(simulationId: string): Promise<Simulation> {
    const simulation = await SimulationModel.findById(simulationId);

    if (!simulation) {
      throw new NotFoundError('Simulation');
    }

    return simulation;
  }

  static async getStudentSimulations(studentId: string): Promise<Simulation[]> {
    return SimulationModel.getStudentSimulations(studentId);
  }

  static async recordTransaction(
    simulationId: string,
    transactionData: Partial<Transaction>
  ): Promise<Transaction> {
    // Verify simulation exists
    const simulation = await this.getSimulation(simulationId);

    const transactionId = generateId();
    const transaction = await SimulationModel.recordTransaction({
      ...transactionData,
      id: transactionId,
      simulation_id: simulationId,
    });

    logger.info('Transaction recorded', {
      simulationId,
      amount: transactionData.amount,
      type: transactionData.transaction_type,
    });

    return transaction;
  }

  static async getBalance(simulationId: string): Promise<number> {
    await this.getSimulation(simulationId); // Verify exists
    return SimulationModel.getSimulationBalance(simulationId);
  }

  static async getTransactionHistory(simulationId: string): Promise<Transaction[]> {
    await this.getSimulation(simulationId); // Verify exists
    return SimulationModel.getTransactionHistory(simulationId);
  }
}
