// import mongoose from 'mongoose';

// const driverSchema = new mongoose.Schema({
//   name: String,
//   currentCity: String, // مكان السواق الحالي
//   serviceCities: [String], // المحافظات اللي بيغطيها
//   carDetails: {
//     model: String,
//     type: { type: String, enum: ['Sedan', 'SUV', 'Van'] },
//     isAirConditioned: Boolean,
//     totalSeats: Number
//   },
//   isAvailable: { type: Boolean, default: true },
//   rating: { type: Number, default: 5 }
// });

// export default mongoose.model('Driver', driverSchema);


const driverSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  isAvailable: { type: Boolean, default: true },
  // المحافظات اللي السواق بيشتغل فيها
  serviceCities: [{ type: String, required: true }], 
  carDetails: {
    brand: String,        // ماركة (تويوتا، هيونداي)
    model: String,        // موديل (2024)
    type: { 
      type: String, 
      enum: ['Sedan', 'SUV', 'Van'], // سيدان، جيب، ميكروباص
      default: 'Sedan' 
    },
    isAirConditioned: { type: Boolean, default: true },
    totalSeats: { type: Number, required: true }
  },
  rating: { type: Number, default: 5 },
});


export default mongoose.model('Driver', driverSchema);