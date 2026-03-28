import { useForm } from 'react-hook-form';
import { User, Phone, CarFront, ShieldCheck, Save } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { FormInput } from '../../components/ui/FormInput';
import toast from 'react-hot-toast';

const Profile = () => {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm({
    defaultValues: {
      fullName: user?.fullName,
      phone: user?.phone,
      carModel: user?.carModel || 'تويوتا ميكروباص 2022', // مثال
    }
  });

  const onUpdate = (data) => {
    console.log("Updating Profile:", data);
    toast.success('تم تحديث بياناتك بنجاح! ✨');
  };

  return (
    <div className="max-w-4xl mx-auto font-sans" dir="rtl">
      <div className="bg-white rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
        {/* Profile Header Background */}
        <div className="h-32 bg-gradient-to-r from-brand-600 to-brand-400" />
        
        <div className="px-8 pb-12">
          {/* Avatar Area */}
          <div className="relative -mt-16 mb-8 flex items-end gap-6">
            <div className="w-32 h-32 bg-white rounded-[2rem] p-2 shadow-xl">
              <div className="w-full h-full bg-brand-50 rounded-[1.8rem] flex items-center justify-center text-brand-600 text-4xl font-black">
                {user?.fullName?.charAt(0)}
              </div>
            </div>
            <div className="pb-4">
              <h2 className="text-2xl font-black text-slate-900">{user?.fullName}</h2>
              <p className="text-brand-600 font-bold flex items-center gap-1">
                <ShieldCheck size={16} /> حساب موثق (سائق)
              </p>
            </div>
          </div>

          {/* Settings Form */}
          <form onSubmit={handleSubmit(onUpdate)} className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <FormInput label="الاسم الكامل" icon={User} name="fullName" register={register} />
              <FormInput label="رقم الهاتف" icon={Phone} name="phone" register={register} />
              <FormInput label="نوع السيارة / الموديل" icon={CarFront} name="carModel" register={register} />
              <div className="opacity-50 pointer-events-none">
                 <FormInput label="البريد الإلكتروني (لا يمكن تغييره)" icon={ShieldCheck} name="email" value={user?.email} register={register} />
              </div>
            </div>

            <div className="pt-6 border-t border-slate-100">
              <button className="flex items-center gap-2 bg-slate-900 text-white px-10 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all shadow-xl shadow-slate-200 active:scale-95">
                <Save size={20} /> حفظ التغييرات
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Profile;