import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

// دالة مساعدة لتوليد التوكن
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

export const register = async (req, res) => {
  try {
    const { fullName, email, password, phone, role } = req.body;

    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: 'هذا البريد مسجل بالفعل' });

    const user = await User.create({
      fullName,
      email,
      password, // هيتشفّر في الـ Model pre-save
      phone,
      role
    });

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      email: user.email,
      role: user.role,
      token: generateToken(user._id)
    });
  } catch (error) {
    res.status(500).json({ message: 'خطأ في عملية التسجيل', error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      res.json({
        _id: user._id,
        fullName: user.fullName,
        email: user.email,
        role: user.role,
        token: generateToken(user._id)
      });
    } else {
      res.status(401).json({ message: 'إيميل أو كلمة مرور غير صحيحة' });
    }
  } catch (error) {
    res.status(500).json({ message: 'خطأ في عملية الدخول' });
  }
};

export const getMe = async (req, res) => {
  // المستخدم هنا بييجي من الـ protect middleware
  res.status(200).json(req.user);
};



// @desc    جلب بيانات البروفايل الحالية
// @route   GET /api/users/profile
export const getUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  if (user) {
    res.json(user);
  } else {
    res.status(404).json({ message: 'المستخدم غير موجود' });
  }
};

// @desc    تحديث بيانات البروفايل (الاسم، الموبايل، البيو، بيانات السيارة)
// @route   PUT /api/users/profile
export const updateProfile = async (req, res) => {
  try {
    const { fullName, phone, carModel, preferredCities, bio } = req.body;

    // 1. البيانات الأساسية (متاحة للكل)
    const updateData = {
      fullName: fullName || req.user.fullName,
      phone: phone || req.user.phone,
      bio: bio || req.user.bio
    };

    // 2. بيانات خاصة بالسائق فقط
    if (req.user.role === 'driver') {
      if (carModel) updateData.carModel = carModel;
      if (preferredCities) updateData.preferredCities = preferredCities;
    }

    // 3. التحديث في الداتابيز
    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      { $set: updateData },
      { new: true, runValidators: true }
    ).select('-password');

    res.status(200).json({
      success: true,
      message: "تم تحديث البيانات بنجاح ✨",
      data: updatedUser
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "فشل تحديث البيانات",
      error: error.message
    });
    console.log("DB Error:", error.message);
  }
};