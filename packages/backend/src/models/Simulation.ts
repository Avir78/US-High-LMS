import { Simulation, Transaction } from '../types';
import pool from '../config/database';
import logger from '../utils/logger';

export class SimulationModel {
  static async create(simulationData: Partial<Simulation>): Promise<Simulation> {
    try {
      const result = await pool.query(
        `INSERT INTO simulations (id, student_id, business_type, business_name, capital, is_active, year_simulated, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, true, 1, NOW(), NOW())
         RETURNING *`,
        [
          simulationData.id,
          simulationData.student_id,
          simulationData.business_type,
          simulationData.business_name,
          simulationData.capital || 0,
        ]
      );
      logger.info('Simulation created', { simulationId: simulationData.id });
      return result.rows[0];
    } catch (error) {
      logger.error('Error creating simulation', error);
      throw error;
    }
  }

  static async findById(id: string): Promise<Simulation | null> {
    try {
      const result = await pool.query(
        'SELECT * FROM simulations WHERE id = $1',
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Error finding simulation', error);
      throw error;
    }
  }

  static async getStudentSimulations(studentId: string): Promise<Simulation[]> {
    try {
      const result = await pool.query(
        'SELECT * FROM simulations WHERE student_id = $1 ORDER BY created_at DESC',
        [studentId]
      );
      return result.rows;
    } catch (error) {
      logger.error('Error fetching student simulations', error);
      throw error;
    }
  }

  static async recordTransaction(transactionData: Partial<Transaction>): Promise<Transaction> {
    try {
      const result = await pool.query(
        `INSERT INTO transactions (id, simulation_id, transaction_type, amount, description, created_at)
         VALUES ($1, $2, $3, $4, $5, NOW())
         RETURNING *`,
        [
          transactionData.id,
          transactionData.simulation_id,
          transactionData.transaction_type,
          transactionData.amount,
          transactionData.description,
        ]
      );
      return result.rows[0];
    } catch (error) {
      logger.error('Error recording transaction', error);
      throw error;
    }
  }

  static async getSimulationBalance(simulationId: string): Promise<number> {
    try {
      const result = await pool.query(
        `SELECT s.capital +
                COALESCE(SUM(CASE WHEN t.transaction_type = 'income' THEN t.amount ELSE -t.amount END), 0) as balance
         FROM simulations s
         LEFT JOIN transactions t ON s.id = t.simulation_id
         WHERE s.id = $1
         GROUP BY s.id, s.capital`,
        [simulationId]
      );
      return result.rows[0]?.balance || 0;
    } catch (error) {
      logger.error('Error calculating simulation balance', error);
      throw error;
    }
  }

  static async getTransactionHistory(simulationId: string): Promise<Transaction[]> {
    try {
      const result = await pool.query(
        'SELECT * FROM transactions WHERE simulation_id = $1 ORDER BY created_at DESC',
        [simulationId]
      );
      return result.rows;
    } catch (error) {
      logger.error('Error fetching transaction history', error);
      throw error;
    }
  }
}
