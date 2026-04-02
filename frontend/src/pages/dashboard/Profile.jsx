import { useForm } from 'react-hook-form';
import { User, Phone, CarFront, ShieldCheck, Save, Edit3, Mail } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useUpdateProfile } from '../../hooks/useProfile';
import { FormInput } from '../../components/ui/FormInput';
import { motion } from 'framer-motion';

const Profile = () => {
  const { user } = useAuth();
  const { mutate, isPending } = useUpdateProfile();

  const { register, handleSubmit, formState: { errors, isDirty } } = useForm({
    defaultValues: {
      fullName: user?.fullName,
      phone: user?.phone,
      bio: user?.bio || '',
      carModel: user?.carModel || '',
    }
  });

  const onUpdate = (data) => {
    mutate(data);
  };

  const isDriver = user?.role === 'driver';

  return (
    <div className="max-w-4xl mx-auto font-sans pt-10 pb-20 px-4" dir="rtl">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-[3rem] shadow-2xl shadow-slate-200/60 border border-slate-50 overflow-hidden"
      >
        {/* Banner */}
        <div className={`h-32 bg-gradient-to-r ${isDriver ? 'from-brand-600 to-brand-400' : 'from-slate-800 to-slate-600'}`} />
        
        <div className="px-6 md:px-12 pb-12 text-right">
          {/* Avatar Section */}
          <div className="relative -mt-16 mb-10 flex flex-col md:flex-row items-center md:items-end gap-6">
            <div className="w-32 h-32 bg-white rounded-[2rem] p-2 shadow-xl">
              <div className="w-full h-full bg-slate-50 rounded-[1.8rem] flex items-center justify-center text-brand-600 text-4xl font-black border-2 border-dashed border-slate-100">
                {user?.fullName?.charAt(0)}
              </div>
            </div>
            <div className="pb-4">
              <h2 className="text-2xl font-black text-slate-900">{user?.fullName}</h2>
              <p className="text-slate-400 font-bold flex items-center gap-1 justify-center md:justify-start mt-1 text-sm">
                <ShieldCheck size={16} className="text-brand-600" />
                {isDriver ? 'حساب سواق معتمد' : 'حساب عميل'}
              </p>
            </div>
          </div>

          <form onSubmit={handleSubmit(onUpdate)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              
              <FormInput 
                label="الاسم بالكامل" 
                icon={User} 
                name="fullName" 
                register={register} 
                error={errors.fullName} 
              />

              <FormInput 
                label="رقم الموبايل" 
                icon={Phone} 
                name="phone" 
                register={register} 
                error={errors.phone} 
              />

              {isDriver && (
                <FormInput 
                  label="نوع وموديل العربية" 
                  icon={CarFront} 
                  name="carModel" 
                  register={register} 
                  error={errors.carModel} 
                  placeholder="مثال: ميكروباص سقف عالي 2023"
                />
              )}

              <FormInput 
                label="البريد الإلكتروني" 
                icon={Mail} 
                name="email" 
                value={user?.email} 
                disabled={true} 
                placeholder="لا يمكن تغيير الإيميل"
              />

              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-black text-slate-500 mr-2 flex items-center gap-2">
                  <Edit3 size={14} /> نبذة قصيرة (Bio)
                </label>
                <textarea 
                  {...register("bio")}
                  className="w-full px-6 py-4 bg-slate-50 rounded-[1.5rem] border-2 border-transparent focus:border-brand-600 outline-none font-bold min-h-[100px] transition-all resize-none text-right shadow-inner"
                  placeholder="عرف نفسك للناس..."
                />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-50 flex justify-end">
              <button 
                type="submit"
                disabled={isPending || !isDirty}
                className="flex items-center gap-3 bg-slate-900 text-white px-12 py-4 rounded-2xl font-black hover:bg-brand-600 transition-all shadow-xl shadow-slate-200 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer"
              >
                {isPending ? 'جاري الحفظ...' : <><Save size={20} /> حفظ التغييرات</>}
              </button>
            </div>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default Profile;