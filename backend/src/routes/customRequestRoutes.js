import express from 'express';
import { 
  createCustomRequest, 
  getAvailableRequestsForDrivers, 
  getMyCustomRequests,
  acceptRequest 
} from '../controllers/customRequestController.js';
import { protect, authorize } from '../middlewares/authMiddleware.js';

const router = express.Router();

router.post('/', protect, authorize('client'), createCustomRequest);
router.get('/available', protect, authorize('driver'), getAvailableRequestsForDrivers);
router.patch('/:id/accept', protect, authorize('driver'), acceptRequest);
router.get('/my-requests', protect, authorize('client'), getMyCustomRequests);
export default router;