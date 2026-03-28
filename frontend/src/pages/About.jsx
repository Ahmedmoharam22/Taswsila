import { motion } from 'framer-motion';
import { 
  ShieldCheck, 
  Zap, 
  Users, 
  Code2, 
  Heart, 
  Globe, 
  CheckCircle2,
  ArrowRight,
  Clock
} from 'lucide-react';
import { Link } from 'react-router-dom';

const About = () => {
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true }
  };

  const features = [
    { 
      title: "أمان تام", 
      desc: "نظام تقييم دقيق للسائقين والركاب لضمان رحلة آمنة ومريحة للجميع.", 
      icon: ShieldCheck,
      color: "bg-blue-50 text-blue-600"
    },
    { 
      title: "سرعة الحجز", 
      desc: "بضغطة زر واحدة تقدر تحجز مكانك وتعرف كل تفاصيل رحلتك فوراً.", 
      icon: Zap,
      color: "bg-amber-50 text-amber-600"
    },
    { 
      title: "توفير حقيقي", 
      desc: "بنساعدك توفر أكتر من 60% من تكاليف السفر بين المحافظات.", 
      icon: Heart,
      color: "bg-red-50 text-red-600"
    }
  ];

  return (
    <div className="min-h-screen bg-white font-sans" dir="rtl">
      
      {/* 1. Hero Section: القصة بدأت من هنا */}
      <section className="relative pt-32 pb-20 px-6 overflow-hidden bg-slate-50/50">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <motion.div 
            className="flex-1 text-right"
            {...fadeIn}
          >
            <h1 className="text-5xl md:text-6xl font-black text-slate-900 mb-6 leading-[1.2]">
              إحنا مش مجرد أبلكيشن، <br/>
              <span className="text-brand-600">إحنا مجتمع بيتحرك.</span>
            </h1>
            <p className="text-slate-500 text-lg md:text-xl font-medium leading-relaxed mb-8">
              "توصيلة" بدأت بفكرة بسيطة: ليه نسافر لوحدنا وندفع كتير، لما ممكن نشارك الرحلة، نوفر مصاريف، ونبني صداقات جديدة؟ هدفنا هو تطوير منظومة النقل التشاركي في مصر بأحدث التقنيات.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-full shadow-sm">
                <CheckCircle2 className="text-green-500" size={18} />
                <span className="text-sm font-bold text-slate-700">دعم كامل للمحافظات</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-100 rounded-full shadow-sm">
                <Clock className="text-green-500" size={18} />
                <span className="text-sm font-bold text-slate-700"> 24/7 في الخدمة   </span>
              </div>
              
            </div>
          </motion.div>

          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative z-10 rounded-[3rem] overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-700 border-8 border-white">
              <img 
                src="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?q=80&w=2070&auto=format&fit=crop" 
                alt="Travel Concept"
                className="w-full h-[450px] object-cover"
              />
            </div>
            {/* زخرفة خلفية */}
            <div className="absolute -top-10 -right-10 w-64 h-64 bg-brand-200/30 rounded-full blur-3xl -z-10 animate-pulse"></div>
          </motion.div>
        </div>
      </section>

      {/* 2. Features Grid: ليه توصيلة؟ */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-black text-slate-900 mb-4">ليه تختار توصيلة؟</h2>
          <div className="w-20 h-1.5 bg-brand-600 mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((f, i) => (
            <motion.div 
              key={i}
              {...fadeIn}
              transition={{ delay: i * 0.1 }}
              className="p-10 bg-white rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/30 hover:shadow-2xl hover:translate-y-[-10px] transition-all duration-300 group"
            >
              <div className={`${f.color} w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <f.icon size={30} />
              </div>
              <h3 className="text-xl font-black text-slate-900 mb-4">{f.title}</h3>
              <p className="text-slate-500 font-medium leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 4. Call to Action: النهاية */}
      <section className="pb-24 px-6 text-center">
        <motion.div {...fadeIn} className="max-w-3xl mx-auto bg-brand-50 p-12 rounded-[3.5rem] border border-brand-100">
          <h2 className="text-3xl font-black text-slate-900 mb-4">مستعد تبدأ رحلتك؟</h2>
          <p className="text-slate-600 font-bold mb-8 italic">"انضم لآلاف الركاب والسائقين اللي غيروا مفهوم السفر في مصر"</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register" className="px-10 py-4 bg-brand-600 text-white rounded-2xl font-black shadow-xl shadow-brand-200 hover:bg-brand-700 transition-all flex items-center justify-center gap-2">
              سجل كراكب <ArrowRight size={20} />
            </Link>
            <Link to="/register" className="px-10 py-4 bg-white text-brand-600 border-2 border-brand-600 rounded-2xl font-black hover:bg-brand-50 transition-all">
              انضم كسائق
            </Link>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;