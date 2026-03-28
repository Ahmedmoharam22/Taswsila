import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, CircleDollarSign, Send } from 'lucide-react';
import { tripSchema } from '../../validations/tripSchema';
import { useCreateTrip } from '../../hooks/useTripMutations';
import { FormInput } from '../../components/ui/FormInput';

const AddTrip = () => {
  const { mutate, isPending } = useCreateTrip();
  
  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: zodResolver(tripSchema)
  });

  const onSubmit = (data) => {
    mutate(data, {
      onSuccess: () => reset() // تصفير الفورم بعد النجاح
    });
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="max-w-3xl mx-auto"
    >
      <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl shadow-slate-200/50 border border-slate-100">
        <div className="mb-10">
          <h2 className="text-3xl font-black text-slate-900">إضافة رحلة جديدة</h2>
          <p className="text-slate-500 mt-2 font-medium">املأ البيانات بدقة ليجدك الركاب بسهولة</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FormInput 
              label="من مدينة" icon={MapPin} name="fromCity" 
              placeholder="مثلاً: بورسعيد" register={register} error={errors.fromCity} 
            />
            <FormInput 
              label="إلى مدينة" icon={MapPin} name="toCity" 
              placeholder="مثلاً: القاهرة" register={register} error={errors.toCity} 
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FormInput 
              label="موعد التحرك" icon={Calendar} name="departureTime" type="datetime-local"
              register={register} error={errors.departureTime} 
            />
            <FormInput 
              label="عدد الكراسي" icon={Users} name="totalSeats" type="number"
              placeholder="4" register={register} error={errors.totalSeats} 
            />
            <FormInput 
              label="سعر الكرسي" icon={CircleDollarSign} name="price" type="number"
              placeholder="150" register={register} error={errors.price} 
            />
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-4 text-lg font-bold text-white rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2
              ${isPending ? 'bg-slate-400 cursor-not-allowed' : 'bg-brand-600 hover:bg-brand-700 shadow-brand-200'}`}
          >
            {isPending ? "جاري الحفظ..." : <><Send size={20} /> اعتماد الرحلة ونشرها</>}
          </button>
        </form>
      </div>
    </motion.div>
  );
};

export default AddTrip;