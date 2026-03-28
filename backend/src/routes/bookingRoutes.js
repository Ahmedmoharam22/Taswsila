import express from 'express';
import { createBooking, getMyBookings, cancelBooking } from '../controllers/bookingController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// العميل بس هو اللي يحجز
router.post('/', protect, authorize('client'), createBooking);

// العميل يشوف رحلاته
router.get('/my-bookings', protect, getMyBookings);

// إلغاء الحجز
router.patch('/:id/cancel', protect, authorize('client'), cancelBooking);

export default router;