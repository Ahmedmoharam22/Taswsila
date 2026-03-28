import { motion } from 'framer-motion';
import { MapPin, Navigation, Search } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative bg-white pt-24 pb-32 overflow-hidden">
      {/* دوائر خلفية خفيفة للجمالية */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        <div className="text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-8 leading-[1.1]"
          >
            مشوارك لجامعتك <br /> 
            <span className="text-brand-600">بقى أسهل مع توصيلة</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="max-w-2xl mx-auto text-lg text-slate-600 mb-12"
          >
            احجز مكانك في ثواني، اختار سواقك المفضل، وتابع رحلتك لحظة بلحظة. أول منصة مخصصة لخدمة مغتربين قريتنا.
          </motion.p>

          {/* Search Box Card - الشغل العالي هنا */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="max-w-4xl mx-auto bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.1)] p-4 border border-slate-100"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="relative group">
                <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="منين؟ (قريتنا)" 
                  className="w-full pr-12 pl-4 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-brand-600 transition-all outline-none text-slate-700"
                />
              </div>
              
              <div className="relative group">
                <Navigation className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-brand-600 transition-colors" size={20} />
                <input 
                  type="text" 
                  placeholder="رايح فين؟ (بورسعيد، طنطا...)" 
                  className="w-full pr-12 pl-4 py-4 bg-slate-50 border-none rounded-xl focus:ring-2 focus:ring-brand-600 transition-all outline-none text-slate-700"
                />
              </div>

              <button className="bg-brand-600 hover:bg-brand-700 text-white rounded-xl py-4 px-8 font-bold flex items-center justify-center gap-2 transition-all hover:shadow-lg active:scale-95">
                <Search size={20} />
                بحث عن رحلة
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;