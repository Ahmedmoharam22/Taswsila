import mongoose from 'mongoose';

const customRequestSchema = new mongoose.Schema({
  passenger: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User', 
    required: true 
  },
  fromCity: { type: String, required: true },
  toCity: { type: String, required: true },
  departureTime: { type: Date, required: true },
  seatsNeeded: { type: Number, default: 1 },
  carType: { 
    type: String, 
    enum: ['Sedan', 'SUV', 'Van'], 
    required: true 
  },
  isAirConditioned: { type: Boolean, default: true },
  status: { 
    type: String, 
    enum: ['pending', 'accepted', 'expired', 'cancelled'], 
    default: 'pending' 
  },
  acceptedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User' // السواق اللي وافق على الطلب
  },
  priceOffered: { type: Number } // السعر اللي السيستم أو السواق هيحدده
}, { timestamps: true });

export default mongoose.model('CustomRequest', customRequestSchema);