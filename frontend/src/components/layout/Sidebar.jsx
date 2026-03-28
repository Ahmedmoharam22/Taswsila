import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuth } from '../../context/AuthContext';
import { 
  Car, 
  LayoutDashboard, 
  PlusCircle, 
  X, 
  LogOut, 
  UserCircle, 
  ShoppingBag 
} from 'lucide-react';

const Sidebar = ({ isOpen, setIsOpen }) => {
  const { logout, user } = useAuth();

  // 1. تحديد القوائم بناءً على رتبة المستخدم
  const driverLinks = [
    { name: 'الرئيسية', icon: LayoutDashboard, path: '/driver-dashboard' },
    { name: 'رحلاتي', icon: Car, path: '/driver-dashboard/trips' }, 
    { name: 'إضافة رحلة', icon: PlusCircle, path: '/driver-dashboard/add-trip' },
    { name: 'الملف الشخصي', icon: UserCircle, path: '/driver-dashboard/profile' }, 
  ];

  const clientLinks = [
    { name: 'حجوزاتي', icon: ShoppingBag, path: '/client-dashboard' },
    { name: 'الملف الشخصي', icon: UserCircle, path: '/client-dashboard/profile' },
  ];

  // اختيار القائمة المناسبة
  const menuItems = user?.role === 'driver' ? driverLinks : clientLinks;

  const sidebarContent = (
    <div className="h-full flex flex-col bg-white border-l border-slate-100 p-6 shadow-xl shadow-slate-200/50">
      {/* Logo Area */}
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="bg-brand-600 p-2 rounded-xl text-white shadow-lg shadow-brand-200">
            <Car size={24} />
          </div>
          <span className="text-2xl font-black text-slate-900 tracking-tighter">توصيلة</span>
        </div>
        <button onClick={() => setIsOpen(false)} className="md:hidden text-slate-400">
          <X size={24} />
        </button>
      </div>

      {/* Profile Card Mini */}
      <div className="mb-8 p-4 bg-slate-50 rounded-[1.5rem] border border-slate-100 flex items-center gap-3">
        <div className="w-12 h-12 bg-brand-100 rounded-2xl flex items-center justify-center text-brand-600 font-bold text-lg">
          {user?.fullName?.charAt(0)}
        </div>
        <div className="overflow-hidden">
          <p className="font-black text-slate-900 truncate">{user?.fullName}</p>
          <p className="text-xs text-slate-500 font-medium">
            {user?.role === 'driver' ? 'سائق مجتمع' : 'راكب مميز'}
          </p>
        </div>
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 space-y-2">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            onClick={() => setIsOpen(false)}
            className={({ isActive }) => `
              flex items-center gap-4 px-4 py-4 rounded-2xl font-bold transition-all duration-300
              ${isActive 
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-200 translate-x-[-8px]' 
                : 'text-slate-500 hover:bg-slate-50 hover:text-brand-600'}
            `}
          >
            <item.icon size={22} />
            <span>{item.name}</span>
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="mt-auto pt-6 border-t border-slate-100">
        <button 
          onClick={logout}
          className="flex items-center gap-4 px-4 py-4 w-full rounded-2xl font-bold text-red-500 hover:bg-red-50 transition-all"
        >
          <LogOut size={22} />
          <span>تسجيل الخروج</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      <aside className="hidden md:block w-80 h-screen sticky top-0 shrink-0">
        {sidebarContent}
      </aside>

      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-[60] md:hidden"
            />
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[280px] z-[70] md:hidden"
            >
              {sidebarContent}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Sidebar;