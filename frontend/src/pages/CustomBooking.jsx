import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useCustomRequest } from '../hooks/useCustomRequest';
import { customBookingSchema } from '../validations/bookingSchema';
import { FormField } from '../components/ui/FormField';
import { Car, Send, ChevronLeft, Wind, Users } from 'lucide-react';

const CustomBooking = () => {
  const [step, setStep] = useState(1);

  const { register, handleSubmit, formState: { errors }, watch, setValue, trigger } = useForm({
    resolver: zodResolver(customBookingSchema),
    mode: "onBlur",
    defaultValues: { seatsNeeded: 1, isAirConditioned: true, carType: 'Sedan' }
  });

  const { mutate, isPending } = useCustomRequest(() => setStep(4));

  // دالة الانتقال للخطوات مع عمل Validation
  const handleNext = async () => {
    const fields = step === 1 ? ['fromCity', 'toCity', 'departureTime'] : ['carType', 'seatsNeeded'];
    const isValid = await trigger(fields);
    if (isValid) setStep(prev => prev + 1);
  };

  const onSubmit = (data) => mutate(data);
  const vals = watch();

  if (step === 4) return (
    <div className="min-h-screen flex items-center justify-center bg-white font-sans" dir="rtl">
        <div className="text-center space-y-6">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto animate-bounce">✓</div>
            <h1 className="text-4xl font-black text-slate-900">وصل طلبك!</h1>
            <p className="text-slate-500 font-bold">السواقين القريبين منك هيوصلهم إشعار وهيتواصلوا معاك.</p>
        </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6 font-sans" dir="rtl">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-10 rounded-[3.5rem] shadow-2xl border border-slate-50 overflow-hidden">
          
          {/* STEP 1 */}
          {step === 1 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-3xl font-black text-slate-900 text-right">إنت رايح فين؟ 📍</h2>
              <div className="grid md:grid-cols-2 gap-6 text-right">
                <FormField label="من مدينة" error={errors.fromCity}>
                  <input {...register("fromCity")} placeholder="مثلاً: المنصورة" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-brand-600 outline-none font-bold" />
                </FormField>
                <FormField label="إلى مدينة" error={errors.toCity}>
                  <input {...register("toCity")} placeholder="مثلاً: القاهرة" className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-brand-600 outline-none font-bold" />
                </FormField>
              </div>
              <FormField label="موعد التحرك" error={errors.departureTime}>
                <input type="datetime-local" {...register("departureTime")} className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-brand-600 outline-none font-bold cursor-pointer" />
              </FormField>
              <button type="button" onClick={handleNext} className="w-full py-5 bg-brand-600 text-white rounded-2xl font-black flex items-center justify-center gap-2 hover:bg-brand-700 transition-all cursor-pointer">التالي <ChevronLeft size={20} /></button>
            </div>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <div className="space-y-8 animate-in fade-in slide-in-from-right-4">
              <h2 className="text-3xl font-black text-slate-900 text-right">مواصفات العربية 🚗</h2>
              <div className="grid grid-cols-3 gap-4">
                {['Sedan', 'SUV', 'Van'].map(t => (
                  <button key={t} type="button" onClick={() => setValue('carType', t)} className={`p-6 rounded-3xl border-2 transition-all flex flex-col items-center gap-2 cursor-pointer ${vals.carType === t ? 'border-brand-600 bg-brand-50 text-brand-600' : 'border-slate-100 text-slate-300'}`}>
                    <Car size={32} /> <span className="font-black text-xs">{t === 'Van' ? 'ميكروباص' : t}</span>
                  </button>
                ))}
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setValue('isAirConditioned', !vals.isAirConditioned)} className={`flex-1 p-6 rounded-3xl border-2 transition-all flex items-center justify-center gap-3 cursor-pointer ${vals.isAirConditioned ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-slate-100 text-slate-300'}`}>
                  <Wind size={24} /> <span className="font-black">تكييف</span>
                </button>
                <div className="flex-1 p-4 bg-slate-50 rounded-3xl flex items-center justify-between px-6 border border-slate-100">
                  <button type="button" onClick={() => setValue('seatsNeeded', vals.seatsNeeded + 1)} className="text-brand-600 font-black text-2xl cursor-pointer">+</button>
                  <span className="font-black text-lg">{vals.seatsNeeded} كراسي</span>
                  <button type="button" onClick={() => setValue('seatsNeeded', Math.max(1, vals.seatsNeeded - 1))} className="text-slate-400 font-black text-2xl cursor-pointer">-</button>
                </div>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-2xl font-black cursor-pointer">رجوع</button>
                <button type="button" onClick={handleNext} className="flex-[2] py-5 bg-brand-600 text-white rounded-2xl font-black cursor-pointer hover:bg-brand-700 transition-all">مراجعة الطلب</button>
              </div>
            </div>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <div className="space-y-8 text-right animate-in fade-in zoom-in-95">
               <h2 className="text-3xl font-black text-slate-900">مراجعة نهائية 🛡️</h2>
               <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 space-y-4">
                  <p className="font-bold">من <span className="text-brand-600">{vals.fromCity}</span> إلى <span className="text-brand-600">{vals.toCity}</span></p>
                  <p className="font-bold">نوع السيارة: <span className="text-slate-900">{vals.carType}</span> ({vals.isAirConditioned ? 'مكيفة' : 'بدون تكييف'})</p>
                  <p className="font-bold text-sm text-slate-400">عدد المقاعد: {vals.seatsNeeded}</p>
               </div>
               <div className="flex gap-4">
                  <button type="button" onClick={() => setStep(2)} className="flex-1 py-5 bg-slate-100 text-slate-500 rounded-2xl font-black cursor-pointer">تعديل</button>
                  <button type="submit" disabled={isPending} className="flex-[2] py-5 bg-slate-900 text-white rounded-2xl font-black flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed">
                    {isPending ? 'جاري الإرسال...' : <><Send size={20} className="rotate-180" /> اطلب الآن</>}
                  </button>
               </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default CustomBooking;