import express from 'express';
import { CourseController } from '../controllers/course.controller';
import { authMiddleware } from '../middleware/auth';
import { rbacMiddleware } from '../middleware/rbac';
import { asyncHandler } from '../middleware/errorHandler';
import { UserRole } from '../constants/roles';

const router = express.Router();

// Public routes
router.get('/', asyncHandler((req, res) => CourseController.getAllCourses(req, res)));
router.get('/:id', asyncHandler((req, res) => CourseController.getCourseById(req, res)));

// Protected routes
router.use(authMiddleware);

// Student enrollment
router.post('/:id/enroll', asyncHandler((req, res) => CourseController.enrollStudent(req, res)));
router.get('/me/enrollments', asyncHandler((req, res) => CourseController.getMyEnrollments(req, res)));
router.put('/:enrollmentId/progress', asyncHandler((req, res) => CourseController.updateProgress(req, res)));

// Teacher routes
router.post('/', rbacMiddleware(UserRole.TEACHER), asyncHandler((req, res) => CourseController.createCourse(req, res)));

export default router;
