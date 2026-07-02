import { generateId } from '../utils/helpers';
import { CourseModel } from '../models/Course';
import { Course, Enrollment, EnrollmentRequest } from '../types';
import { NotFoundError, ConflictError } from '../exceptions/AppError';
import logger from '../utils/logger';

export class CourseService {
  static async getAllCourses(limit: number = 20, offset: number = 0): Promise<Course[]> {
    return CourseModel.findAll(limit, offset);
  }

  static async getCourseById(courseId: string): Promise<Course> {
    const course = await CourseModel.findById(courseId);

    if (!course) {
      throw new NotFoundError('Course');
    }

    return course;
  }

  static async createCourse(courseData: Partial<Course>): Promise<Course> {
    const courseId = generateId();
    return CourseModel.create({ ...courseData, id: courseId });
  }

  static async enrollStudent(
    studentId: string,
    enrollmentRequest: EnrollmentRequest
  ): Promise<Enrollment> {
    // Check if course exists
    const course = await CourseModel.findById(enrollmentRequest.course_id);
    if (!course) {
      throw new NotFoundError('Course');
    }

    // Check if already enrolled
    const existingEnrollments = await CourseModel.getStudentEnrollments(studentId);
    const isAlreadyEnrolled = existingEnrollments.some(
      (e) => e.course_id === enrollmentRequest.course_id && e.status === 'active'
    );

    if (isAlreadyEnrolled) {
      throw new ConflictError('Student is already enrolled in this course');
    }

    const enrollmentId = generateId();
    const enrollment = await CourseModel.enrollStudent(
      enrollmentId,
      studentId,
      enrollmentRequest.course_id
    );

    logger.info('Student enrolled in course', { studentId, courseId: enrollmentRequest.course_id });
    return enrollment;
  }

  static async getStudentEnrollments(studentId: string): Promise<Enrollment[]> {
    return CourseModel.getStudentEnrollments(studentId);
  }

  static async updateProgress(enrollmentId: string, progress: number): Promise<Enrollment> {
    if (progress < 0 || progress > 100) {
      throw new Error('Progress must be between 0 and 100');
    }

    return CourseModel.updateProgress(enrollmentId, progress);
  }
}
