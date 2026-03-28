import jwt from 'jsonwebtoken';
import User from '../models/User.js';
// حماية الروتس (تأكد أن المستخدم مسجل دخول)
export const protect = async (req, res, next) => {
  let token;
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) return res.status(401).json({ message: 'غير مصرح لك، التوكن مفقود' });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id).select('-password');
    next();
  } catch (err) {
    res.status(401).json({ message: 'التوكن غير صالح' });
  }
};

// السماح لأدوار محددة فقط (مثلاً السواقين فقط)
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ message: `الدور ${req.user.role} غير مسموح له بهذا الإجراء` });
    }
    next();
  };
};