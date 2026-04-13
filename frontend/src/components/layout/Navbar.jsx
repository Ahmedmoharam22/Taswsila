import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next'; 
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';
import { Logo } from '../ui/Logo';
import LanguageSelector from '../ui/LanguageSelector';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  
  // 2. تفعيل الترجـمة
  const { t } = useTranslation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // 3. تحويل مصفوفة الروابط لتستخدم مفاتيح الترجمة
  const navLinks = [
    { name: t('navbar.home'), path: '/' },
    { name: t('navbar.trips'), path: '/trips' },
    { name: t('navbar.about'), path: '/about' },
    { name: t('navbar.contact'), path: '/contact' },
    { name: t('navbar.booking'), path: '/custom-booking' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 px-4 md:px-8 ${scrolled ? 'top-4' : 'top-0'}`}>
      <div 
        className={`max-w-7xl mx-auto transition-all duration-500 rounded-[2rem] 
        ${scrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_10px_40px_rgba(0,0,0,0.04)] border border-white/20 px-6 py-1' 
          : 'bg-transparent border border-transparent px-2 py-4'}`}
      >
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <Logo />
          </Link>
          {/* النص هو اللي هيترجم */}
     

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <div className="flex items-center ms-4"> {/* استخدمنا ms (margin-start) بدل ml */}
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`relative px-4 py-2 text-sm font-bold transition-colors duration-300 group 
                  ${location.pathname === link.path ? 'text-brand-600' : 'text-slate-500 hover:text-brand-600'}`}
                >
                  {link.name}
                  <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-1 bg-brand-600 rounded-full transition-all duration-300 
                  ${location.pathname === link.path ? 'w-4' : 'w-0 group-hover:w-4'}`} />
                </Link>
              ))}
            </div>
            
            <div className="h-4 w-[1px] bg-slate-200 mx-2" />

            {/* Language Selector */}
            <div className="mx-2">
              <LanguageSelector />
            </div>

            <div className="h-4 w-[1px] bg-slate-200 mx-2" />

            {/* Auth Logic */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link 
                  to={user.role === 'driver' ? '/driver-dashboard' : '/client-dashboard'} 
                  className="flex items-center gap-2 text-sm font-black text-slate-700 bg-slate-50 hover:bg-brand-50 hover:text-brand-600 px-4 py-2.5 rounded-xl transition-all"
                >
                  <LayoutDashboard size={18} />
                  <span>{t('navbar.dashboard')}</span>
                </Link>
                <button 
                  onClick={logout} 
                  className="p-2.5 text-red-400 cursor-pointer hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  title={t('navbar.logout')}
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 me-2"> {/* استخدمنا me (margin-end) بدل mr */}
                <Link to="/login" className="text-sm font-black text-slate-600 hover:text-brand-600 transition-colors px-2">
                  {t('navbar.login')}
                </Link>
                <Link to="/register">
                  <Button variant="primary" className="shadow-brand-600/20 shadow-lg py-2.5 px-6 rounded-xl font-black text-sm">
                    {t('navbar.register')}
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile UI */}
          <div className="md:hidden flex items-center gap-3">
            <LanguageSelector />
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-700 bg-slate-50 rounded-xl">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }} 
            animate={{ opacity: 1, scale: 1 }} 
            exit={{ opacity: 0, scale: 0.95 }} 
            className="absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-[2.5rem] shadow-2xl border border-slate-100 p-8 md:hidden"
          >
            <div className="flex flex-col space-y-5">
              {navLinks.map((link) => (
                <Link 
                  key={link.path} 
                  to={link.path} 
                  onClick={() => setIsOpen(false)} 
                  className="text-xl font-black text-slate-800 hover:text-brand-600 flex items-center justify-between group"
                >
                  {link.name}
                  <span className="w-2 h-2 rounded-full bg-brand-600 opacity-0 group-hover:opacity-100" />
                </Link>
              ))}
              <div className="h-[1px] bg-slate-100 w-full" />
              {isAuthenticated ? (
                <div className="space-y-4">
                  <Link to={user.role === 'driver' ? '/driver-dashboard' : '/client-dashboard'} onClick={() => setIsOpen(false)}>
                    <Button className="w-full py-4 rounded-2xl font-black">{t('navbar.dashboard')}</Button>
                  </Link>
                  <button onClick={logout} className="w-full cursor-pointer py-4 text-red-600 font-black bg-red-50 rounded-2xl">{t('navbar.logout')}</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 pt-2">
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" className="w-full py-4 rounded-2xl font-black">{t('navbar.new_account')}</Button>
                  </Link>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="text-center py-2 text-slate-500 font-bold">{t('navbar.login')}</Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;