import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema({
  trip: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Trip', 
    required: true 
  },
  passenger: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  seatsBooked: { 
    type: Number, 
    required: true, 
    min: [1, 'يجب حجز كرسي واحد على الأقل'] 
  },
  totalPrice: { 
    type: Number, 
    required: true 
  },
  status: { 
    type: String, 
    enum: ['confirmed', 'cancelled', 'completed'], 
    default: 'confirmed' 
  }
}, { timestamps: true });

export default mongoose.model('Booking', bookingSchema);