import { Course, Enrollment, EnrollmentStatus } from '../types';
import pool from '../config/database';
import logger from '../utils/logger';

export class CourseModel {
  static async findAll(limit: number = 20, offset: number = 0): Promise<Course[]> {
    try {
      const result = await pool.query(
        `SELECT c.*, COUNT(DISTINCT e.id) as students_count
         FROM courses c
         LEFT JOIN enrollments e ON c.id = e.course_id
         GROUP BY c.id
         LIMIT $1 OFFSET $2`,
        [limit, offset]
      );
      return result.rows;
    } catch (error) {
      logger.error('Error fetching courses', error);
      throw error;
    }
  }

  static async findById(id: string): Promise<Course | null> {
    try {
      const result = await pool.query(
        `SELECT c.*, COUNT(DISTINCT e.id) as students_count
         FROM courses c
         LEFT JOIN enrollments e ON c.id = e.course_id
         WHERE c.id = $1
         GROUP BY c.id`,
        [id]
      );
      return result.rows[0] || null;
    } catch (error) {
      logger.error('Error finding course', error);
      throw error;
    }
  }

  static async create(courseData: Partial<Course>): Promise<Course> {
    try {
      const result = await pool.query(
        `INSERT INTO courses (id, title, description, category, level, instructor_id, duration_hours, content_url, pdf_url, created_at, updated_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
         RETURNING *`,
        [
          courseData.id,
          courseData.title,
          courseData.description,
          courseData.category,
          courseData.level,
          courseData.instructor_id,
          courseData.duration_hours,
          courseData.content_url,
          courseData.pdf_url,
        ]
      );
      logger.info('Course created', { courseId: courseData.id });
      return result.rows[0];
    } catch (error) {
      logger.error('Error creating course', error);
      throw error;
    }
  }

  static async enrollStudent(
    enrollmentId: string,
    studentId: string,
    courseId: string
  ): Promise<Enrollment> {
    try {
      const result = await pool.query(
        `INSERT INTO enrollments (id, student_id, course_id, enrolled_at, status, progress_percentage)
         VALUES ($1, $2, $3, NOW(), 'active', 0)
         RETURNING *`,
        [enrollmentId, studentId, courseId]
      );
      logger.info('Student enrolled in course', { studentId, courseId });
      return result.rows[0];
    } catch (error) {
      logger.error('Error enrolling student', error);
      throw error;
    }
  }

  static async getStudentEnrollments(studentId: string): Promise<Enrollment[]> {
    try {
      const result = await pool.query(
        `SELECT e.* FROM enrollments e
         WHERE e.student_id = $1
         ORDER BY e.enrolled_at DESC`,
        [studentId]
      );
      return result.rows;
    } catch (error) {
      logger.error('Error fetching student enrollments', error);
      throw error;
    }
  }

  static async updateProgress(
    enrollmentId: string,
    progress: number
  ): Promise<Enrollment> {
    try {
      const status = progress === 100 ? 'completed' : 'active';
      const result = await pool.query(
        `UPDATE enrollments SET progress_percentage = $1, status = $2, completed_at = CASE WHEN $2 = 'completed' THEN NOW() ELSE NULL END WHERE id = $3 RETURNING *`,
        [progress, status, enrollmentId]
      );
      return result.rows[0];
    } catch (error) {
      logger.error('Error updating progress', error);
      throw error;
    }
  }
}
