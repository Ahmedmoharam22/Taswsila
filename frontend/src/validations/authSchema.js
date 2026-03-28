import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string().email('بريد إلكتروني غير صالح'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
});



export const registerSchema = z.object({
  fullName: z.string().min(3, 'الاسم يجب أن يكون 3 أحرف على الأقل'),
  email: z.string().email('بريد إلكتروني غير صالح'),
  phone: z.string().min(11, 'رقم الهاتف غير صحيح (11 رقم)'),
  password: z.string().min(6, 'كلمة المرور يجب أن تكون 6 أحرف على الأقل'),
  role: z.enum(['client', 'driver'], {
    required_error: 'يرجى اختيار نوع الحساب',
  }),
});