import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, CircleDollarSign, Send, Car, Wind } from 'lucide-react';
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

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             <div className="space-y-2 text-right">
              <label className="text-sm font-black text-slate-500 mr-2 uppercase tracking-wide flex items-center gap-2">
                <Car size={14} /> نوع السيارة
              </label>
              <select
                {...register('carType')}
                className={`w-full px-6 py-4 bg-slate-50 border-2 rounded-[1.5rem] outline-none transition-all font-bold ${
                  errors.carType ? 'border-red-400 focus:border-red-500 text-red-900 bg-red-50' : 'border-transparent focus:border-brand-600 text-slate-900'
                }`}
              >
                <option value="">اختر نوع السيارة...</option>
                <option value="Sedan">سيدان (عادي)</option>
                <option value="SUV">عائلية (SUV)</option>
                <option value="Van">ميكروباص صغير (Van)</option>
              </select>
              {errors.carType && (
                <span className="text-red-500 text-xs font-bold px-2 block mt-1">{errors.carType.message}</span>
              )}
            </div>

            <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-[1.5rem] border-2 border-transparent mt-8 md:mt-0">
              <input
                type="checkbox"
                id="isAirConditioned"
                {...register('isAirConditioned')}
                defaultChecked
                className="w-5 h-5 rounded border-slate-300 text-brand-600 focus:ring-brand-500"
              />
              <label htmlFor="isAirConditioned" className="text-sm font-black text-slate-700 cursor-pointer flex items-center gap-2">
                <Wind size={16} className="text-brand-600" /> السيارة مكيفة
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={isPending}
            className={`w-full py-4 text-lg cursor-pointer font-bold text-white rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2
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