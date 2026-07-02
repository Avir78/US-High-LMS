import { Request, Response } from 'express';
import { CourseService } from '../services/course.service';
import { validate, validators } from '../utils/validators';
import { HTTP_STATUS, SUCCESS_MESSAGES } from '../constants/http-codes';
import { ValidationError } from '../exceptions/AppError';

export class CourseController {
  static async getAllCourses(req: Request, res: Response): Promise<void> {
    const limit = Math.min(parseInt(req.query.limit as string) || 20, 100);
    const offset = parseInt(req.query.offset as string) || 0;

    const courses = await CourseService.getAllCourses(limit, offset);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      status: HTTP_STATUS.OK,
      message: 'Courses retrieved successfully',
      data: courses,
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0.0',
        pagination: { limit, offset },
      },
    });
  }

  static async getCourseById(req: Request, res: Response): Promise<void> {
    const course = await CourseService.getCourseById(req.params.id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      status: HTTP_STATUS.OK,
      message: 'Course retrieved successfully',
      data: course,
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0.0',
      },
    });
  }

  static async createCourse(req: Request, res: Response): Promise<void> {
    const validation = validate(validators.courseValidator, req.body);
    if (!validation.isValid) {
      throw new ValidationError('Validation failed', validation.errors || {});
    }

    const course = await CourseService.createCourse({
      ...validation.value,
      instructor_id: req.user!.id,
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      status: HTTP_STATUS.CREATED,
      message: SUCCESS_MESSAGES.COURSE_CREATED,
      data: course,
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0.0',
      },
    });
  }

  static async enrollStudent(req: Request, res: Response): Promise<void> {
    const enrollment = await CourseService.enrollStudent(req.user!.id, {
      course_id: req.params.id,
    });

    res.status(HTTP_STATUS.CREATED).json({
      success: true,
      status: HTTP_STATUS.CREATED,
      message: SUCCESS_MESSAGES.ENROLLMENT_SUCCESSFUL,
      data: enrollment,
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0.0',
      },
    });
  }

  static async getMyEnrollments(req: Request, res: Response): Promise<void> {
    const enrollments = await CourseService.getStudentEnrollments(req.user!.id);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      status: HTTP_STATUS.OK,
      message: 'Enrollments retrieved successfully',
      data: enrollments,
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0.0',
      },
    });
  }

  static async updateProgress(req: Request, res: Response): Promise<void> {
    const { progress } = req.body;

    if (typeof progress !== 'number' || progress < 0 || progress > 100) {
      throw new ValidationError('Invalid progress value', { progress: 'Must be between 0 and 100' });
    }

    const enrollment = await CourseService.updateProgress(req.params.enrollmentId, progress);

    res.status(HTTP_STATUS.OK).json({
      success: true,
      status: HTTP_STATUS.OK,
      message: 'Progress updated successfully',
      data: enrollment,
      meta: {
        timestamp: new Date().toISOString(),
        version: process.env.API_VERSION || '1.0.0',
      },
    });
  }
}
