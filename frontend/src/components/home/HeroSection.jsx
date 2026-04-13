import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import { usePublicTrips } from "../../hooks/usePublicTrips";
import { motion } from "framer-motion";
import { MapPin, ArrowRightLeft, Search } from "lucide-react";


const HeroSection = () => { 
    const { t } = useTranslation();
  const { register, handleSubmit } = useForm();
  const { data, isLoading } = usePublicTrips({ limit: 1 });

  const onSearch = (data) => {
    console.log(data);
  };
  return (
 <section className="relative pt-32 pb-20 px-4 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10"> 
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black text-slate-900 mb-6 leading-tight tracking-tighter"
          >
            {t('hero.title_part1')} <br /> <span className="text-brand-600">{t('hero.title_part2')}</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-slate-500 text-lg md:text-xl max-w-2xl mx-auto font-medium mb-12"
          >
            {t('hero.description')}
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
                  placeholder={t('hero.from_placeholder')}
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
                  placeholder={t('hero.to_placeholder')}
                  className="w-full pr-12 pl-4 py-5 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-brand-600 focus:bg-white outline-none transition-all font-bold text-slate-900 placeholder:text-slate-400"
                />
              </div>

              <button className="w-full md:w-auto bg-slate-900 hover:bg-slate-800 text-white px-10 py-5 rounded-2xl font-black shadow-xl transition-all flex items-center justify-center gap-2 active:scale-95">
                <Search size={20} /> {t('hero.search_btn')}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Decorative Background: لمسة الـ Senior */}
        <div className="absolute top-0 right-0 -z-10 w-96 h-96 bg-brand-100 rounded-full blur-[120px] opacity-30 -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 -z-10 w-96 h-96 bg-blue-100 rounded-full blur-[120px] opacity-30 translate-y-1/2 -translate-x-1/2"></div>
      </section>


)
} 
export default HeroSection;