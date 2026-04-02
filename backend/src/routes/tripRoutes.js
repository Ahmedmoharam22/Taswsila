import express from 'express';
import { 
  createTrip, 
  getAllTrips, 
  getDriverDashboard, 
  updateTripStatus, 
  searchCustomTrips
} from '../controllers/tripController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

// العامة (للركاب)
router.get('/', getAllTrips);

// خاصة بالسواقين فقط
router.post('/', protect, authorize('driver'), createTrip);
router.get('/driver/dashboard', protect, authorize('driver'), getDriverDashboard);
router.patch('/:id/status', protect, authorize('driver'), updateTripStatus);
router.get('/search/custom', searchCustomTrips);  

export default router;