import express from 'express';
import { register, getUserProfile, updateUserProfile, login, getMe } from '../controllers/authController.js';
import { protect } from '../middlewares/authMiddleware.js';

const router = express.Router();

// @desc    تسجيل مستخدم جديد (سائق أو عميل)
// @route   POST /api/auth/register
router.post('/register', register);

// @route   POST /api/auth/login
router.post('/login', login);
router.route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);
// @desc    جلب بيانات المستخدم الحالي (عشان الـ Auth Persistence في الفرونت)
// @route   GET /api/auth/me
router.get('/me', protect, getMe);

export default router;