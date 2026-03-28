import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema({
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: { type: String, required: true },
  role: { type: String, enum: ['client', 'driver'], default: 'client' },
  avatar: { type: String, default: 'https://cdn-icons-png.flaticon.com/512/149/149071.png' },
  bio: { type: String, maxLength: 150 },
  carDetails: {
    model: { type: String }, 
    color: { type: String }, 
    plateNumber: { type: String } 
  }
}, { timestamps: true });

userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) next();
  this.password = await bcrypt.hash(this.password, 10);
});

export default mongoose.model('User', userSchema);