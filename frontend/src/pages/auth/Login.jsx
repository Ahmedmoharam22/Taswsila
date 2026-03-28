// import { useForm } from 'react-hook-form';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { supabase } from '../../lib/supabase';
// import { useNavigate, Link } from 'react-router-dom';
// import { motion } from 'framer-motion';
// import { Mail, Lock, LogIn } from 'lucide-react';
// import Button from '../../components/ui/Button';
// import toast from 'react-hot-toast';
// import { loginSchema } from '../../utils/validations';

// const Login = () => {
//   const navigate = useNavigate();
  
//   const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm({
//     resolver: zodResolver(loginSchema),
//   });

//   const onSubmit = async (data) => {
//     try {
//       const { data: authData, error } = await supabase.auth.signInWithPassword({
//         email: data.email,
//         password: data.password,
//       });

//       if (error) throw error;

//       // نجيب بيانات البروفايل عشان نعرف هو سواق ولا عميل
//       const { data: profile } = await supabase
//         .from('profiles')
//         .select('role')
//         .eq('id', authData.user.id)
//         .single();

//       toast.success('مرحباً بك مجدداً!');
      
//       // التوجيه بناءً على الدور (Role)
//       if (profile?.role === 'driver') {
//         navigate('/driver/dashboard');
//       } else {
//         navigate('/client/dashboard');
//       }
//     } catch (error) {
//       toast.error(error.message || 'فشل تسجيل الدخول');
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
//       <motion.div 
//         initial={{ opacity: 0, y: 20 }}
//         animate={{ opacity: 1, y: 0 }}
//         className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100"
//       >
//         <div className="text-center mb-10">
//           <div className="bg-brand-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-600">
//             <LogIn size={32} />
//           </div>
//           <h2 className="text-3xl font-black text-slate-900">تسجيل الدخول</h2>
//           <p className="text-slate-500 mt-2 font-medium">أهلاً بك في منصة توصيلة</p>
//         </div>

//         <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
//           {/* حقل البريد الإلكتروني */}
//           <div className="space-y-1">
//             <div className="relative">
//               <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//               <input
//                 {...register("email")}
//                 placeholder="البريد الإلكتروني"
//                 className={`w-full pr-12 pl-4 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all ${errors.email ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-brand-600'}`}
//               />
//             </div>
//             {errors.email && <span className="text-red-500 text-xs font-bold px-2">{errors.email.message}</span>}
//           </div>

//           {/* حقل كلمة المرور */}
//           <div className="space-y-1">
//             <div className="relative">
//               <Lock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
//               <input
//                 {...register("password")}
//                 type="password"
//                 placeholder="كلمة المرور"
//                 className={`w-full pr-12 pl-4 py-4 bg-slate-50 border-2 rounded-2xl outline-none transition-all ${errors.password ? 'border-red-400 focus:border-red-500' : 'border-transparent focus:border-brand-600'}`}
//               />
//             </div>
//             {errors.password && <span className="text-red-500 text-xs font-bold px-2">{errors.password.message}</span>}
//           </div>

//           <Button disabled={isSubmitting} className="w-full py-4 text-lg">
//             {isSubmitting ? "جارِ التحقق..." : "دخول"}
//           </Button>
//         </form>

//         <p className="text-center mt-8 text-slate-600 font-medium">
//           ليس لديك حساب؟ <Link to="/auth/register" className="text-brand-600 font-black hover:underline">سجل الآن</Link>
//         </p>
//       </motion.div>
//     </div>
//   );
// };

// export default Login;



import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { LogIn, Mail, Lock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { loginSchema } from '../../validations/authSchema';
import { useLoginMutation } from '../../hooks/useAuthMutation';
import { FormInput } from '../../components/ui/FormInput';

const LoginPage = () => {
  const { mutate, isPending } = useLoginMutation();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data) => mutate(data);

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 font-sans" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full bg-white p-10 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100"
      >
        {/* Header القسم العلوي */}
        <div className="text-center mb-10">
          <div className="bg-brand-50 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-brand-600">
            <LogIn size={32} />
          </div>
          <h2 className="text-3xl font-black text-slate-900">تسجيل الدخول</h2>
          <p className="text-slate-500 mt-2 font-medium">أهلاً بك في منصة توصيلة</p>
        </div>

        {/* Form النموذج */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <FormInput
            icon={Mail}
            name="email"
            type="email"
            placeholder="البريد الإلكتروني"
            register={register}
            error={errors.email}
          />

          <FormInput
            icon={Lock}
            name="password"
            type="password"
            placeholder="كلمة المرور"
            register={register}
            error={errors.password}
          />

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-4 text-lg font-bold text-white rounded-2xl shadow-lg transition-all active:scale-95
              ${isPending 
                ? 'bg-slate-400 cursor-not-allowed' 
                : 'bg-brand-600 hover:bg-brand-700 shadow-brand-200'
              }`}
          >
            {isPending ? "جارِ التحقق..." : "دخول"}
          </button>
        </form>

        {/* Footer التذييل */}
        <p className="text-center mt-8 text-slate-600 font-medium">
          ليس لديك حساب؟ <Link to="/register" className="text-brand-600 font-black hover:underline">سجل الآن</Link>
        </p>
      </motion.div>
    </div>
  );
};

export default LoginPage;