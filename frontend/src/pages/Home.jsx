// // import Hero from '../components/layout/Hero';

// // const Home = () => {
// //   return (
// //     <div className="animate-in fade-in duration-700">
// //       <Hero />

// //       {/* قسم مميزات إضافي (اختياري للـ CV) */}
// //       <section className="py-20 bg-white border-t border-slate-100 text-center">
// //          <h3 className="text-xl font-bold text-slate-400 italic">"توصيلة.. أمان، توفير، وصحبة حلوة"</h3>
// //       </section>
// //     </div>
// //   );
// // };

// // export default Home;



// import { useState } from 'react';
// import { motion } from 'framer-motion';
// import { Search, MapPin, Car, ArrowRightLeft } from 'lucide-react';
// import { useForm } from 'react-hook-form';
// import { usePublicTrips } from '../hooks/usePublicTrips';
// import { TripCard } from '../components/dashboard/TripCard'; // هنستخدم نفس الكارت مع تعديل بسيط

// const Home = () => {
//   const [filters, setFilters] = useState({});
//   const { register, handleSubmit } = useForm();
//   const { data: trips, isLoading } = usePublicTrips(filters);

//   const onSearch = (data) => {
//     // تنظيف الفلاتر من القيم الفاضية
//     const activeFilters = Object.fromEntries(
//       Object.entries(data).filter(([_, v]) => v !== "")
//     );
//     setFilters(activeFilters);
//   };

//   return (
//     <div className="min-h-screen bg-white font-sans" dir="rtl">
//       {/* 1. Hero Section */}
//       <section className="relative pt-32 pb-20 px-4 overflow-hidden">
//         <div className="max-w-7xl mx-auto text-center relative z-10">
//           <motion.div
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             className="inline-flex items-center gap-2 bg-brand-50 text-brand-600 px-6 py-2 rounded-full font-bold text-sm mb-6"
//           >
//             <Car size={18} /> منصة التوصيل رقم #1 في مصر
//           </motion.div>

//           <motion.h1 
//             initial={{ opacity: 0, y: 30 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.1 }}
//             className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight"
//           >
//             سافر بذكاء.. <br/> <span className="text-brand-600">وفر في مشوارك</span>
//           </motion.h1>

//           <motion.p 
//             initial={{ opacity: 0 }}
//             animate={{ opacity: 1 }}
//             transition={{ delay: 0.2 }}
//             className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium mb-12"
//           >
//             احجز مكانك في رحلات السفر بين المحافظات بأسعار تبدأ من 50 جنيه. أمان، راحة، وتوفير.
//           </motion.p>

//           {/* 2. Search Bar Section */}
//           <motion.div 
//             initial={{ opacity: 0, y: 40 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3 }}
//             className="max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-[2.5rem] shadow-2xl shadow-slate-200 border border-slate-100"
//           >
//             <form onSubmit={handleSubmit(onSearch)} className="flex flex-col md:flex-row items-center gap-4">
//               <div className="flex-1 w-full relative">
//                 <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//                 <input 
//                   {...register('from')}
//                   placeholder="من مدينة..." 
//                   className="w-full pr-12 pl-4 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-brand-600 outline-none transition-all font-bold"
//                 />
//               </div>

//               <div className="bg-brand-50 p-2 rounded-full hidden md:block">
//                 <ArrowRightLeft className="text-brand-600" size={20} />
//               </div>

//               <div className="flex-1 w-full relative">
//                 <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
//                 <input 
//                   {...register('to')}
//                   placeholder="إلى مدينة..." 
//                   className="w-full pr-12 pl-4 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-brand-600 outline-none transition-all font-bold"
//                 />
//               </div>

//               <button className="w-full md:w-auto bg-brand-600 hover:bg-brand-700 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-brand-200 transition-all flex items-center justify-center gap-2">
//                 <Search size={20} /> ابحث الآن
//               </button>
//             </form>
//           </motion.div>
//         </div>

//         {/* Background Elements (Decorative) */}
//         <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-brand-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2"></div>
//       </section>

//       {/* 3. Results Section */}
//       <section className="max-w-7xl mx-auto px-4 py-20">
//         <div className="flex items-center justify-between mb-10">
//           <h2 className="text-3xl font-black text-slate-900">الرحلات المتاحة</h2>
//           <span className="text-slate-400 font-bold">{trips?.length || 0} رحلة وجدت</span>
//         </div>

//         {isLoading ? (
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
//             {[1,2,3].map(i => <div key={i} className="h-64 bg-slate-100 animate-pulse rounded-[2rem]"></div>)}
//           </div>
//         ) : (
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
//             {trips?.map((trip) => (
//               <TripCard  key={trip._id} trip={trip} isPublicView={true} />
//             ))} 
//           </div>
//         )}
//       </section>
//     </div>
//   );
// };

// export default Home;




import { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, MapPin, Car, ArrowRightLeft } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { usePublicTrips } from '../hooks/usePublicTrips';
import { TripCard } from '../components/dashboard/TripCard';

const Home = () => {
  const [filters, setFilters] = useState({});
  const { register, handleSubmit } = useForm();

  // جلب الرحلات مع تفعيل الفلاتر لحظياً
  const { data: trips, isLoading } = usePublicTrips(filters);

  const onSearch = (data) => {
    // تنظيف الفلاتر: لو الحقل فاضي مش هنبعته للباك إند
    const activeFilters = Object.fromEntries(
      Object.entries(data).filter(([_, v]) => v !== "")
    );
    setFilters(activeFilters);
  };

  return (
    <div className="min-h-screen bg-white font-sans" dir="rtl">

      {/* 1. Hero Section: الجاذبية البصرية */}
      <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10"> 
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight tracking-tighter"
          >
            سافر بذكاء.. <br /> <span className="text-brand-600">وفر في مشوارك</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium mb-12"
          >
            احجز مكانك في رحلات السفر بين المحافظات بأسعار تبدأ من 50 جنيه. أمان، راحة، وتوفير.
          </motion.p>
          {/* 2. Search Bar: محرك البحث الاحترافي */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto bg-white p-4 md:p-6 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] border border-slate-100"
          >
            <form onSubmit={handleSubmit(onSearch)} className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex-1 w-full relative">
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-600" size={20} />
                <input
                  {...register('from')}
                  placeholder="من مدينة..."
                  className="w-full pr-12 pl-4 py-5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-brand-600 focus:bg-white outline-none transition-all font-bold text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <div className="bg-brand-50 p-3 rounded-full hidden md:block border border-brand-100">
                <ArrowRightLeft className="text-brand-600" size={18} />
              </div>

              <div className="flex-1 w-full relative">
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-brand-600" size={20} />
                <input
                  {...register('to')}
                  placeholder="إلى مدينة..."
                  className="w-full pr-12 pl-4 py-5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-brand-600 focus:bg-white outline-none transition-all font-bold text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <button className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl font-black shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95">
                <Search size={20} /> ابحث الآن
              </button>
            </form>
          </motion.div>
        </div>

        {/* Decorative Background: لمسة الـ Senior */}
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-brand-100 rounded-full blur-[120px] opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-30 translate-y-1/2 -translate-x-1/2"></div>
      </section>

      {/* 3. Results Section: عرض الرحلات */}
      <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-50">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900">الرحلات المتاحة</h2>
            <p className="text-slate-400 font-bold mt-1 text-sm">استكشف أفضل العروض للمشاوير القادمة</p>
          </div>
          <span className="bg-slate-100 text-slate-600 px-5 py-2 rounded-full font-black text-xs uppercase tracking-tighter">
            {trips?.length || 0} رحلة وجدت
          </span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[350px] bg-slate-50 animate-pulse rounded-[2.5rem] border border-slate-100"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips?.map((trip) => (
              <TripCard key={trip._id} trip={trip} isPublicView={true} />
            ))}
          </div>
        )}

        {!isLoading && trips?.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-slate-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Search className="text-slate-300" size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">مفيش رحلات حالياً</h3>
            <p className="text-slate-500 font-bold">جرب تبحث بمدينة تانية أو ارجع في وقت لاحق</p>
          </div>
        )}
      </section>

      {/* Footer Quote */}
      <section className="py-20 bg-slate-50/50 border-t border-slate-100 text-center">
        <h3 className="text-xl font-black text-slate-400 italic">"توصيلة.. أمان، توفير، وصحبة حلوة"</h3>
      </section>
    </div>
  );
};

export default Home;