import { User, UserProfile } from '../types';
import pool from '../config/database';
import logger from '../utils/logger';

export class UserModel {
  static async findById(id: string): Promise<User | null> {
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE id = $1',
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Error finding user by ID', error);
      throw error;
    }
  }

  static async findByEmail(email: string): Promise<User | null> {
    try {
      const result = await pool.query(
        'SELECT * FROM users WHERE email = $1',
        [email]
      );
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Error finding user by email', error);
      throw error;
    }
  }

  static async create(userData: Partial<User>): Promise<User> {
    try {
      const result = await pool.query(
        `INSERT INTO users (id, email, password_hash, role, first_name, last_name, status, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW(), NOW())
         RETURNING *`,
        [
          userData.id,
          userData.email,
          userData.password_hash,
          userData.role,
          userData.first_name,
          userData.last_name,
          userData.status || 'active',
        ]
      );
      logger.info('New user created', { userId: userData.id, email: userData.email });
      return result.rows[0];
    } catch (error) {
      logger.error('Error creating user', error);
      throw error;
    }
  }

  static async update(id: string, userData: Partial<User>): Promise<User> {
    try {
      const allowedFields = [
        'first_name',
        'last_name',
        'phone',
        'avatar_url',
        'birth_date',
        'institution',
        'class_level',
      ];
      const fields = Object.keys(userData).filter((key) => allowedFields.includes(key));
      const values = fields.map((field) => userData[field as keyof User]);

      if (fields.length === 0) {
        return this.findById(id) as Promise<User>;
      }

      const setClause = fields.map((field, index) => `${field} = $${index + 1}`).join(', ');

      const result = await pool.query(
        `UPDATE users SET ${setClause}, updated_at = NOW() WHERE id = $${fields.length + 1} RETURNING *`,
        [...values, id]
      );
      return result.rows[0];
    } catch (error) {
      logger.error('Error updating user', error);
      throw error;
    }
  }

  static async getProfile(id: string): Promise<UserProfile | null> {
    try {
      const result = await pool.query(
        `SELECT u.*, 
                COALESCE(p.total_points, 0) as total_points,
                COALESCE(COUNT(DISTINCT b.id), 0) as badges_count,
                COALESCE(COUNT(DISTINCT e.id), 0) as courses_enrolled,
                COALESCE(COUNT(DISTINCT s.id), 0) as simulations_count
         FROM users u
         LEFT JOIN points p ON u.id = p.student_id
         LEFT JOIN badges b ON u.id = b.student_id
         LEFT JOIN enrollments e ON u.id = e.student_id AND e.status = 'active'
         LEFT JOIN simulations s ON u.id = s.student_id
         WHERE u.id = $1
         GROUP BY u.id, p.total_points`,
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Error fetching user profile', error);
      throw error;
    }
  }

  static async resetAccount(id: string): Promise<void> {
    try {
      await pool.query('BEGIN');
      // Reset all user metrics to 0
      await pool.query('DELETE FROM points WHERE student_id = $1', [id]);
      await pool.query('DELETE FROM badges WHERE student_id = $1', [id]);
      await pool.query('UPDATE enrollments SET progress_percentage = 0 WHERE student_id = $1', [id]);
      await pool.query('COMMIT');
      logger.info('User account reset', { userId: id });
    } catch (error) {
      await pool.query('ROLLBACK');
      logger.error('Error resetting user account', error);
      throw error;
    }
  }
}
