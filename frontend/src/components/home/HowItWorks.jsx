import { Search, CalendarCheck, MapPinned, ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const HowItWorks = () => {
  const { t, i18n } = useTranslation();
  const isRtl = i18n.language === 'ar';

  const steps = [
    { id: '01', title: 'how_it_works.step1_title', desc: 'how_it_works.step1_desc', icon: Search, color: "text-blue-600", bg: "bg-blue-50" },
    { id: '02', title: 'how_it_works.step2_title', desc: 'how_it_works.step2_desc', icon: CalendarCheck, color: "text-brand-600", bg: "bg-brand-50" },
    { id: '03', title: 'how_it_works.step3_title', desc: 'how_it_works.step3_desc', icon: MapPinned, color: "text-emerald-600", bg: "bg-emerald-50" },
  ];

  return (
    <section className="py-32 bg-white relative overflow-hidden">
      {/* لمسة خلفية خفيفة */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-slate-50 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-brand-600 font-black tracking-[0.2em] uppercase text-sm"
          >
            {isRtl ? "دليلك السريع" : "Quick Guide"}
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mt-4"
          >
            {t('how_it_works.title')}
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 relative">
          {/* الخط الواصل بين الخطوات (Desktop Only) */}
          <div className="hidden md:block absolute top-1/4 left-1/2 -translate-x-1/2 w-3/4 h-[2px] bg-slate-100">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-200 to-transparent"></div>
          </div>

          {steps.map((step, index) => (
            <motion.div 
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              viewport={{ once: true }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* رقم الخطوة في الخلفية */}
              <span className="absolute -top-10 text-8xl font-black text-slate-50 select-none group-hover:text-brand-50 transition-colors duration-500">
                {step.id}
              </span>

              {/* Icon Container */}
              <div className={`relative z-10 w-24 h-24 ${step.bg} ${step.color} rounded-[2.5rem] flex items-center justify-center mb-8 shadow-sm group-hover:shadow-xl group-hover:-translate-y-2 transition-all duration-500 border border-white`}>
                <step.icon size={40} strokeWidth={1.5} />
                
                {/* Arrow (Desktop Only) */}
                {index < 2 && (
                  <div className={`hidden lg:block absolute -right-12 top-1/2 -translate-y-1/2 text-slate-200 ${isRtl ? 'rotate-180' : ''}`}>
                    <ArrowRight size={24} />
                  </div>
                )}
              </div>

              <h3 className="text-2xl font-black text-slate-800 mb-4 group-hover:text-brand-600 transition-colors">
                {t(step.title)}
              </h3>
              <p className="text-slate-500 font-bold leading-relaxed max-w-[280px]">
                {t(step.desc)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;