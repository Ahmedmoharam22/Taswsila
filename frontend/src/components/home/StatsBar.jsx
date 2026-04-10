import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Users, Car, MapPin  } from "lucide-react"; // ضفنا أيقونات عشان نكسر الملل

const StatsBar = () => {
  const { t } = useTranslation();
  
  const stats = [
    { id: 1, label: t('stats.trips'), value: '500+', icon: MapPin, color: "bg-blue-50 text-blue-600" },
    { id: 2, label: t('stats.drivers'), value: '50+', icon: Car, color: "bg-amber-50 text-amber-600" },
    { id: 3, label: t('stats.users'), value: '1,200+', icon: Users, color: "bg-emerald-50 text-emerald-600" },
  ];

  return (
    <div className="relative z-30 py-12 max-w-6xl mx-auto px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="bg-white/80 backdrop-blur-xl rounded-[2.5rem] shadow-[0_32px_64px_-16px_rgba(0,0,0,0.1)] border border-white p-2 md:p-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x rtl:md:divide-x-reverse divide-slate-100">
          {stats.map((stat, index) => (
            <motion.div 
              key={stat.id}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: index * 0.1 }}
              className="flex items-center justify-center md:justify-start gap-6 p-6 md:px-10 group"
            >
              {/* Icon Container */}
              <div className={`w-14 h-14 rounded-2xl ${stat.color} flex items-center justify-center transition-transform duration-500 group-hover:rotate-[10deg] group-hover:scale-110 shadow-sm`}>
                <stat.icon size={28} />
              </div>

              {/* Text Data */}
              <div className="flex flex-col">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-black text-slate-900 tracking-tight">
                    {stat.value.replace('+', '')}
                  </span>
                  <span className="text-brand-600 font-black text-xl">+</span>
                </div>
                <div className="text-slate-500 font-bold text-sm md:text-base whitespace-nowrap">
                  {stat.label}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

export default StatsBar;