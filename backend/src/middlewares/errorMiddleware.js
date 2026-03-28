// مديول معالجة الأخطاء الشامل
const errorHandler = (err, req, res, next) => {
  // لو السيرفر باعت Status Code معين نستخدمه، وإلا يبقى 500 (خطأ سيرفر)
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  let message = err.message;

  // معالجة خطأ Mongoose (لو الـ ID اللي مبعوث غلط)
  if (err.name === 'CastError' && err.kind === 'ObjectId') {
    statusCode = 404;
    message = 'المعرف (ID) غير موجود أو غير صالح';
  }

  // معالجة خطأ الـ Duplicate Key (مثلاً إيميل متكرر)
  if (err.code === 11000) {
    statusCode = 400;
    message = 'البيانات مكررة، هذا السجل موجود بالفعل';
  }

  res.status(statusCode).json({
    message,
    // بنظهر الـ stack trace في الـ Development فقط عشان نصلح الإيرور، ونخفيه في الـ Production
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
};

// مديول الـ 404 للروتس اللي مش موجودة أصلاً
const notFound = (req, res, next) => {
  const error = new Error(`غير موجود - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

export { errorHandler, notFound };