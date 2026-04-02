import mongoose from 'mongoose';

const tripSchema = new mongoose.Schema({
  driver: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  fromCity: { type: String, required: true },
  toCity: { type: String, required: true },
  departureTime: { type: Date, required: true },
  price: { type: Number, required: true },
  totalSeats: { type: Number, required: true },
  availableSeats: { type: Number, required: true },
  status: { 
    type: String, 
    enum: ['active', 'completed', 'cancelled'], 
    default: 'active' 
  },
  passengers: [{
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    seatsBooked: { type: Number, default: 1 },
    bookedAt: { type: Date, default: Date.now }
  }],
carType: { type: String, enum: ['Sedan', 'SUV', 'Van'], required: true },
isAirConditioned: { type: Boolean, default: true },
}, { timestamps: true });

// Indexing للبحث السريع بالمدن (Performance Optimization)
tripSchema.index({ fromCity: 1, toCity: 1 });

export default mongoose.model('Trip', tripSchema);