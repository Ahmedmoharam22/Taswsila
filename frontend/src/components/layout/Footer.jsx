import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Logo from '../ui/Logo';
import { motion } from 'framer-motion';
import { Mail, Phone, Share2, Globe, Heart, ArrowUpRight, X } from 'lucide-react';
import i18next from 'i18next';

const Footer = () => {
  const { t } = useTranslation();
  const isAr = i18next.language === 'ar'; 
  const socialLinks = [
    { Icon: Share2, href: "#", color: "hover:bg-blue-600" },
    { Icon: Globe, href: "#", color: "hover:bg-sky-500" },  
    { Icon: X, href: "#", color: "hover:bg-blue-600" }, 
  ];

  return (
    <footer className="bg-slate-900 text-slate-300 border-t border-slate-800 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-16">
          
          {/* Column 1: Brand & Identity */}
          <div className="space-y-6">
            <div className="brightness-200"> {/* تفتيح اللوجو بما إن الخلفية غامقة */}
              <Logo />
            </div>
            <p className="text-slate-400 leading-relaxed font-medium">
              {t('footer.description')}
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ Icon, href, color }, index) => (
                <motion.a 
                  key={index}
                  href={href}
                  whileHover={{ y: -5 }}
                  className={`w-11 h-11 bg-slate-800 rounded-2xl flex items-center justify-center text-slate-400 transition-all duration-300 ${color} hover:text-white shadow-lg`}
                >
                  <Icon size={20} />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Column 2: Navigation */}
          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-widest text-xs">
              {t('footer.quick_links')}
            </h4>
            <ul className="space-y-4">
              {['home', 'trips', 'about', 'contact'].map((item) => (
                <li key={item}>
                  <Link 
                    to={item === 'home' ? '/' : `/${item}`} 
                    className="group flex items-center gap-2 text-slate-400 hover:text-brand-400 transition-colors font-bold"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-brand-400 transition-all" />
                    {t(`navbar.${item}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div>
            <h4 className="text-white font-black mb-8 uppercase tracking-wider text-xs">
              {t('footer.contact_us')}
            </h4>
            <div className="space-y-6">
              <a href="mailto:info@tawsila.com" className="group flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-brand-400 group-hover:bg-brand-400 group-hover:text-white transition-all">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-black uppercase mb-1">Email Us</p>
                  <p className="font-bold text-slate-300">info@tawsila.com</p>
                </div>
              </a>
              <a href="tel:+201234567890" className="group flex items-start gap-4">
                <div className="w-10 h-10 bg-slate-800 rounded-xl flex items-center justify-center text-brand-400 group-hover:bg-brand-400 group-hover:text-white transition-all">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-xs text-slate-500 font-black uppercase mb-1">Call Support</p>
                  <p className="font-bold text-slate-300" dir="ltr">+20 123 456 7890</p>
                </div>
              </a>
            </div>
          </div>

          {/* Column 4: Newsletter/CTA */}
          <div className="bg-slate-800/50 p-8 rounded-[2rem] border border-slate-700/50">
            <h4 className="text-white font-black mb-4">{isAr ? 'خليك متابع' : 'Stay Tuned'}</h4>
            <p className="text-sm text-slate-400 font-medium mb-6">
              {isAr ? 'اشترك عشان يوصلك أحدث الرحلات والمميزات.' : 'Subscribe to get latest trips and features.'}
            </p>
            <div className="relative">
              <input 
                type="email" 
                className="w-full bg-slate-900 border-none rounded-xl py-3 px-4 text-sm text-white focus:ring-2 focus:ring-brand-500 outline-none"
                placeholder="email@example.com"
              />
              <button className="absolute right-1 top-1 bottom-1 bg-brand-600 hover:bg-brand-700 text-white px-3 rounded-lg transition-colors">
                <ArrowUpRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="pt-8 border-t border-slate-800 flex flex-col md:row justify-between items-center gap-6">
          <p className="text-slate-500 font-bold text-sm">
            {t('footer.rights')}
          </p>
          <div className="flex items-center gap-2 text-slate-500 font-bold text-sm bg-slate-800/50 px-6 py-2 rounded-full">
            <span>{t('footer.made_with')}</span>
            <Heart size={16} className="text-red-500 fill-red-500" />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;