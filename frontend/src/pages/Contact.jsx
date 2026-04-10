import { motion } from 'framer-motion';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Send, 
  MessageSquare, 
  Clock,
Share2, // أيقونة مشاركة (بدل فيسبوك لو مش موجودة)
  Globe,  // أيقونة شبكة (بدل إنستجرام)
  MessageCircle // أيقونة رسائل
} from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useTranslation } from 'react-i18next';

const Contact = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm();

  const onSubmit = async (data) => {
    // هنا ممكن نربط مع EmailJS أو الـ API بتاعك
    console.log("Contact Data:", data);
    await new Promise(resolve => setTimeout(resolve, 1500)); // Simulate API call
    toast.success(t('contact.success'));
    reset();
  };

  const contactInfo = [
    { icon: Phone, label: t('contact.call_us'), value: t('contact.phone_val'), color: "text-blue-600", bg: "bg-blue-50" },
    { icon: Mail, label: t('contact.email_us'), value: "support@tawsila.com", color: "text-brand-600", bg: "bg-brand-50" },
    { icon: Clock, label: t('contact.hours'), value: t('contact.hours_val'), color: "text-green-600", bg: "bg-green-50" }
  ];

  return (
    <div className="min-h-screen bg-white pt-32 pb-20 px-6 font-sans">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-black text-slate-900 mb-4"
          >
            {t('contact.hero_title')} <span className="text-brand-600">{t('contact.hero_highlight')}</span>
          </motion.h1>
          <p className="text-slate-500 font-bold text-lg max-w-2xl mx-auto">
            {t('contact.hero_desc')}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          
          {/* 1. Contact Info Cards */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((item, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100 flex items-start gap-6 group hover:bg-white hover:shadow-xl hover:shadow-slate-200/50 transition-all duration-300"
              >
                <div className={`${item.bg} ${item.color} p-4 rounded-2xl group-hover:scale-110 transition-transform`}>
                  <item.icon size={24} />
                </div>
                <div>
                  <h3 className="font-black text-slate-900 mb-1">{item.label}</h3>
                  <p className="text-slate-500 font-bold text-sm leading-relaxed">{item.value}</p>
                </div>
              </motion.div>
            ))}

            {/* Social Media Links */}
            <div className="p-8 bg-brand-600 rounded-[2.5rem] text-white">
              <h3 className="font-black mb-4">{t('contact.social')}</h3>
              <div className="flex gap-4">
                {[Share2, Globe, MessageCircle].map((Icon, idx) => (
                  <a key={idx} href="#" className="p-3 bg-white/10 rounded-xl hover:bg-white/20 transition-all">
                    <Icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* 2. Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-white p-8 md:p-12 rounded-[3.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50"
          >
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 mr-2 uppercase">{t('contact.form_name')}</label>
                  <input 
                    {...register("name", { required: t('contact.req_name') })}
                    placeholder={t('contact.form_name_placeholder')}
                    className={`w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 outline-none transition-all font-bold ${errors.name ? 'border-red-100 focus:border-red-400' : 'border-transparent focus:border-brand-600 focus:bg-white'}`}
                  />
                  {errors.name && <span className="text-red-500 text-xs font-bold mr-2">{errors.name.message}</span>}
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-black text-slate-700 mr-2 uppercase">{t('contact.form_email')}</label>
                  <input 
                    {...register("email", { 
                      required: t('contact.req_email'),
                      pattern: { value: /^\S+@\S+$/i, message: t('contact.invalid_email') }
                    })}
                    placeholder="name@example.com"
                    className={`w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 outline-none transition-all font-bold ${errors.email ? 'border-red-100 focus:border-red-400' : 'border-transparent focus:border-brand-600 focus:bg-white'}`}
                  />
                  {errors.email && <span className="text-red-500 text-xs font-bold mr-2">{errors.email.message}</span>}
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700 mr-2 uppercase">{t('contact.form_subject')}</label>
                <input 
                  {...register("subject", { required: t('contact.req_subject') })}
                  placeholder={t('contact.form_subject_placeholder')}
                  className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-brand-600 focus:bg-white outline-none transition-all font-bold"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-black text-slate-700 mr-2 uppercase">{t('contact.form_message')}</label>
                <textarea 
                  {...register("message", { required: t('contact.req_message'), minLength: { value: 10, message: t('contact.short_message') } })}
                  rows="5"
                  placeholder={t('contact.form_message_placeholder')}
                  className="w-full px-6 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-brand-600 focus:bg-white outline-none transition-all font-bold resize-none"
                ></textarea>
                {errors.message && <span className="text-red-500 text-xs font-bold mr-2">{errors.message.message}</span>}
              </div>

              <button 
                disabled={isSubmitting}
                className="w-full cursor-pointer bg-slate-900 text-white py-5 rounded-2xl font-black text-lg shadow-xl hover:bg-slate-800 transition-all active:scale-[0.98] flex items-center justify-center gap-3 disabled:opacity-70"
              >
                {isSubmitting ? (
                  t('contact.sending')
                ) : (
                  <>{t('contact.send_btn')} <Send size={20} className="rotate-180" /></>
                )}
              </button>
            </form>
          </motion.div>
        </div>

        {/* Decorative Background Elements */}
        <div className="fixed top-1/4 -right-20 w-96 h-96 bg-brand-50 rounded-full blur-[120px] -z-10 opacity-60"></div>
        <div className="fixed bottom-0 -left-20 w-96 h-96 bg-blue-50 rounded-full blur-[120px] -z-10 opacity-60"></div>
      </div>
    </div>
  );
};

export default Contact;