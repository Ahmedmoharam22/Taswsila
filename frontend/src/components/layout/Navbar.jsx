// import { useState, useEffect } from 'react';
// import { Link, useLocation } from 'react-router-dom';
// import { Menu, X, Car, User, LogOut, LayoutDashboard } from 'lucide-react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { useAuth } from '../../context/AuthContext'; // 👈 استيراد الـ Auth لعمل الـ Logic
// import Button from '../ui/Button';

// const Navbar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [scrolled, setScrolled] = useState(false);
//   const { user, isAuthenticated, logout } = useAuth(); // 👈 سحب بيانات اليوزر
//   const location = useLocation();

//   useEffect(() => {
//     const handleScroll = () => setScrolled(window.scrollY > 20);
//     window.addEventListener('scroll', handleScroll);
//     return () => window.removeEventListener('scroll', handleScroll);
//   }, []);

//   const navLinks = [
//     { name: 'الرئيسية', path: '/' },
//     { name: 'الرحلات', path: '/trips' },
//     { name: 'عن المشروع', path: '/about' },
//   ];

//   return (
//     <nav className={`fixed w-full z-50 transition-all duration-500 px-4 md:px-8 ${scrolled ? 'top-4' : 'top-0'}`}>
//       <div className={`max-w-7xl mx-auto transition-all duration-500 rounded-2xl ${scrolled ? 'bg-white/70 backdrop-blur-xl shadow-[0_8px_32px_0_rgba(31,38,135,0.07)] border border-white/20 px-6' : 'bg-transparent px-2'}`}>
//         <div className="flex justify-between h-20 items-center">
          
//           {/* Logo */}
//           <Link to="/" className="flex items-center gap-2 group">
//             <div className="bg-brand-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-brand-600/20">
//               <Car className="text-white w-6 h-6" />
//             </div>
//             <span className="text-2xl font-black text-brand-900 tracking-tighter">توصيلة</span>
//           </Link>

//           {/* Desktop Menu */}
//           <div className="hidden md:flex items-center space-x-1 space-x-reverse">
//             {navLinks.map((link) => (
//               <Link
//                 key={link.path}
//                 to={link.path}
//                 className={`relative px-4 py-2 text-sm font-semibold transition-colors duration-300 group ${location.pathname === link.path ? 'text-brand-600' : 'text-slate-600 hover:text-brand-600'}`}
//               >
//                 {link.name}
//                 <span className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-brand-600 transition-all duration-300 group-hover:w-1/2 ${location.pathname === link.path ? 'w-1/2' : ''}`} />
//               </Link>
//             ))}
            
//             <div className="h-6 w-[1px] bg-slate-200 mx-4" />

//             {/* 🛑 هنا الـ Logic بتاع الـ Auth */}
//             {isAuthenticated ? (
//               <div className="flex items-center gap-3">
//                 <Link to={user.role === 'driver' ? '/driver-dashboard' : '/my-bookings'} className="flex items-center gap-2 text-sm font-bold text-slate-700 hover:text-brand-600 transition-colors">
//                   <LayoutDashboard size={18} />
//                   <span>لوحة التحكم</span>
//                 </Link>
//                 <button onClick={logout} className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-all" title="تسجيل خروج">
//                   <LogOut size={20} />
//                 </button>
//               </div>
//             ) : (
//               <div className="flex items-center gap-4">
//                 <Link to="/login" className="text-sm font-bold text-slate-900 hover:text-brand-600 transition-colors">دخول</Link>
//                 <Link to="/register">
//                   <Button variant="primary" className="shadow-brand-600/20 shadow-lg py-2.5">ابدأ الآن</Button>
//                 </Link>
//               </div>
//             )}
//           </div>

//           {/* Mobile Button */}
//           <div className="md:hidden">
//             <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors">
//               {isOpen ? <X size={24} /> : <Menu size={24} />}
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Mobile Menu */}
//       <AnimatePresence>
//         {isOpen && (
//           <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="absolute top-24 left-4 right-4 bg-white/95 backdrop-blur-2xl rounded-3xl shadow-2xl border border-slate-100 p-6 md:hidden">
//             <div className="flex flex-col space-y-4">
//               {navLinks.map((link) => (
//                 <Link key={link.path} to={link.path} onClick={() => setIsOpen(false)} className="text-lg font-bold text-slate-800 hover:text-brand-600 p-2 rounded-xl hover:bg-brand-50 transition-all">
//                   {link.name}
//                 </Link>
//               ))}
//               <hr className="border-slate-100" />
//               {isAuthenticated ? (
//                 <div className="space-y-3">
//                     <Link to={user.role === 'driver' ? '/driver-dashboard' : '/my-bookings'} onClick={() => setIsOpen(false)}>
//                         <Button className="w-full">لوحة التحكم</Button>
//                     </Link>
//                     <button onClick={logout} className="w-full py-3 text-red-600 font-bold bg-red-50 rounded-2xl">تسجيل الخروج</button>
//                 </div>
//               ) : (
//                 <div className="grid grid-cols-2 gap-4 pt-2">
//                   <Link to="/login" onClick={() => setIsOpen(false)}>
//                     <Button variant="outline" className="w-full text-sm">دخول</Button>
//                   </Link>
//                   <Link to="/register" onClick={() => setIsOpen(false)}>
//                     <Button variant="primary" className="w-full text-sm">حساب جديد</Button>
//                   </Link>
//                 </div>
//               )}
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };

// export default Navbar;



import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Car, User, LogOut, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import Button from '../ui/Button';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'الرئيسية', path: '/' },
    { name: 'الرحلات', path: '/trips' },
    { name: 'عن المشروع', path: '/about' },
    { name: 'تواصل معنا', path: '/contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 px-4 md:px-8 ${scrolled ? 'top-4' : 'top-0'}`}>
      <div 
        className={`max-w-7xl mx-auto transition-all duration-500 rounded-[2rem] 
        ${scrolled 
          ? 'bg-white/80 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.05)] border border-slate-200/50 px-6 py-1' 
          : 'bg-transparent px-2 py-4'}`}
      >
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="bg-brand-600 p-2 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-lg shadow-brand-600/20">
              <Car className="text-white w-5 h-5" />
            </div>
            <span className="text-xl font-black text-slate-900 tracking-tighter">توصيلة</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-1">
            <div className="flex items-center ml-4">
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

            {/* Auth Logic */}
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <Link 
                  to={user.role === 'driver' ? '/driver-dashboard' : '/client-dashboard'} 
                  className="flex items-center gap-2 text-sm font-black text-slate-700 bg-slate-50 hover:bg-brand-50 hover:text-brand-600 px-4 py-2.5 rounded-xl transition-all"
                >
                  <LayoutDashboard size={18} />
                  <span>لوحة التحكم</span>
                </Link>
                <button 
                  onClick={logout} 
                  className="p-2.5 text-red-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                  title="تسجيل خروج"
                >
                  <LogOut size={20} />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-4 mr-2">
                <Link to="/login" className="text-sm font-black text-slate-600 hover:text-brand-600 transition-colors px-2">دخول</Link>
                <Link to="/register">
                  <Button variant="primary" className="shadow-brand-600/20 shadow-lg py-2.5 px-6 rounded-xl font-black text-sm">ابدأ الآن</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 text-slate-700 bg-slate-50 rounded-xl transition-colors">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
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
                  className="text-xl font-black text-slate-800 hover:text-brand-600 transition-all flex items-center justify-between group"
                >
                  {link.name}
                  <span className="w-2 h-2 rounded-full bg-brand-600 opacity-0 group-hover:opacity-100 transition-all" />
                </Link>
              ))}
              <div className="h-[1px] bg-slate-100 w-full" />
              {isAuthenticated ? (
                <div className="space-y-4">
                    <Link to={user.role === 'driver' ? '/driver-dashboard' : '/client-dashboard'} onClick={() => setIsOpen(false)}>
                        <Button className="w-full py-4 rounded-2xl font-black">لوحة التحكم</Button>
                    </Link>
                    <button onClick={logout} className="w-full py-4 text-red-600 font-black bg-red-50 rounded-2xl active:scale-95 transition-all">تسجيل الخروج</button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-4 pt-2">
                  <Link to="/register" onClick={() => setIsOpen(false)}>
                    <Button variant="primary" className="w-full py-4 rounded-2xl font-black">حساب جديد</Button>
                  </Link>
                  <Link to="/login" onClick={() => setIsOpen(false)} className="text-center py-2 text-slate-500 font-bold">تسجيل دخول</Link>
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