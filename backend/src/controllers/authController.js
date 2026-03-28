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
export const updateUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      user.fullName = req.body.fullName || user.fullName;
      user.phone = req.body.phone || user.phone;
      user.bio = req.body.bio || user.bio;
      user.avatar = req.body.avatar || user.avatar;

      // تحديث بيانات السيارة لو المستخدم سواق
      if (user.role === 'driver') {
        user.carDetails = {
          model: req.body.carModel || user.carDetails?.model,
          color: req.body.carColor || user.carDetails?.color,
          plateNumber: req.body.carPlate || user.carDetails?.plateNumber,
        };
      }

      const updatedUser = await user.save();
      res.json({
        _id: updatedUser._id,
        fullName: updatedUser.fullName,
        email: updatedUser.email,
        role: updatedUser.role,
        phone: updatedUser.phone,
        avatar: updatedUser.avatar,
        carDetails: updatedUser.carDetails,
        message: 'تم تحديث البروفايل بنجاح'
      });
    }
  } catch (error) {
    res.status(500).json({ message: 'خطأ في تحديث البيانات', error: error.message });
  }
};