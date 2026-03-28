import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, Phone, Car, UserCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { registerSchema } from '../../validations/authSchema';
import { useRegisterMutation } from '../../hooks/useAuthMutation';
import { FormInput } from '../../components/ui/FormInput';

const RegisterPage = () => {
  const { mutate, isPending } = useRegisterMutation();
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: { role: 'client' }
  });

  const selectedRole = watch('role');
  const onSubmit = (data) => mutate(data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 py-12 px-4 font-sans" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100"
      >
        <div className="text-center mb-8">
          <div className="bg-brand-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-600">
            <UserPlus size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-900">إنشاء حساب جديد</h2>
          <p className="text-slate-500 mt-2 font-medium">انضم لآلاف المستفيدين من "توصيلة"</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          {/* اختيار نوع الحساب - Role Selector */}
          <div className="flex gap-4 p-2 bg-slate-100 rounded-2xl mb-6">
            <button
              type="button"
              onClick={() => setValue('role', 'client')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-bold ${selectedRole === 'client' ? 'bg-white text-brand-600 shadow-sm scale-105' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <UserCheck size={18} /> عميل
            </button>
            <button
              type="button"
              onClick={() => setValue('role', 'driver')}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl transition-all font-bold ${selectedRole === 'driver' ? 'bg-white text-brand-600 shadow-sm scale-105' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Car size={18} /> سائق
            </button>
          </div>

          <FormInput icon={User} name="fullName" placeholder="الاسم الكامل" register={register} error={errors.fullName} />
          <FormInput icon={Mail} name="email" type="email" placeholder="البريد الإلكتروني" register={register} error={errors.email} />
          <FormInput icon={Phone} name="phone" placeholder="رقم الهاتف" register={register} error={errors.phone} />
          <FormInput icon={Lock} name="password" type="password" placeholder="كلمة المرور" register={register} error={errors.password} />

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-4 text-lg font-bold text-white rounded-2xl shadow-lg transition-all active:scale-95 mt-4
              ${isPending ? 'bg-slate-400 cursor-not-allowed' : 'bg-brand-600 hover:bg-brand-700 shadow-brand-200'}`}
          >
            {isPending ? "جارِ إنشاء الحساب..." : "إنشاء الحساب"}
          </button>
        </form>

        <p className="text-center mt-8 text-slate-600 font-medium">
          لديك حساب بالفعل؟ <Link to="/login" className="text-brand-600 font-black hover:underline">سجل دخولك</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default RegisterPage;