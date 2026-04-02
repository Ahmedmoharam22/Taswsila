import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { notFound, errorHandler } from './middlewares/errorMiddleware.js';
const app = express();

// Middlewares
app.use(express.json()); // Parse JSON bodies
app.use(express.urlencoded({ extended: true }));
app.use(cors()); // Enable CORS
app.use(helmet()); // Security headers
app.use(morgan('dev')); // Logging

// Simple route for health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'success', message: 'API is running' });
});

// Import and use routes here
import authRoutes from './routes/authRoutes.js';
import tripRoutes from './routes/tripRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';
import customRequestRoutes from './routes/customRequestRoutes.js';
// Routes
app.use('/api/auth', authRoutes);
app.use('/api/trips', tripRoutes);
app.use('/api/bookings', bookingRoutes);
app.use('/api/custom-requests', customRequestRoutes);




// 🛑 لازم يتحطوا بعد الـ Routes بالترتيب ده:
app.use(notFound);      // لو المسار غلط
app.use(errorHandler);  // لو حصل Error جوه الـ Controller
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    status: 'error',
    message: err.message || 'Internal Server Error',
  });
});


export default app;
