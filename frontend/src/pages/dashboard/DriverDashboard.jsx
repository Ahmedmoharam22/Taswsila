// import { motion } from 'framer-motion';
// import { Plus, CarFront, LayoutGrid } from 'lucide-react';
// import { useDriverDashboard } from '../../hooks/useTripMutations';
// import { TripCard } from '../../components/dashboard/TripCard';
// import { Link } from 'react-router-dom';

// const DriverDashboard = () => {
//   const { data: trips, isLoading } = useDriverDashboard();

//   return (
//     <div className="min-h-screen bg-slate-50/50 pt-28 pb-12 px-4 md:px-8 font-sans" dir="rtl">
//       <div className="max-w-7xl mx-auto">
//         {/* Header Section */}
//         <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
//           <div>
//             <h1 className="text-4xl font-black text-slate-900 tracking-tight">لوحة التحكم</h1>
//             <p className="text-slate-500 font-medium mt-1">أهلاً بك يا بطل، تابع رحلاتك وأرباحك اليوم</p>
//           </div>
//           <Link to="/driver-dashboard/add-trip" className="flex items-center gap-3 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-brand-600/20 transition-all active:scale-95">
//             <Plus size={20} /> إضافة رحلة جديدة
//           </Link>
//         </div>

//         {/* Stats Grid */}
//         <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
//            {/* هنا ممكن تضيف كروت إحصائيات سريعة */}
//         </div>

//         {/* Trips Section */}
//         <div className="space-y-6">
//           <div className="flex items-center gap-2 mb-4">
//             <LayoutGrid className="text-brand-600" size={20} />
//             <h2 className="text-xl font-black text-slate-800">رحلاتك الحالية</h2>
//           </div>

//           {isLoading ? (
//             <div className="text-center py-20">جاري تحميل رحلاتك...</div>
//           ) : (
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//               {trips?.map((trip) => (
//                 <TripCard key={trip._id} trip={trip} />
//               ))}
//               {trips?.length === 0 && (
//                 <div className="col-span-full bg-white p-12 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
//                    <CarFront size={48} className="mx-auto text-slate-300 mb-4" />
//                    <p className="text-slate-500 font-bold">لا يوجد رحلات مسجلة بعد، ابدأ الآن!</p>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DriverDashboard;


import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, CarFront, LayoutGrid, Zap, ClipboardList, TrendingUp, Wallet, Users } from 'lucide-react';
import { useDriverDashboard } from '../../hooks/useTripMutations';
import { useDriverActions } from '../../hooks/useDriverActions'; // الهوك اللي عملناه للطلبات
import { TripCard } from '../../components/dashboard/TripCard';
import { Link } from 'react-router-dom';
import { DriverCustomRequestCard } from '../../components/layout/DriverRequestCard';

const DriverDashboard = () => {
  const [activeTab, setActiveTab] = useState('my-trips');
  const { data: trips, isLoading: loadingTrips } = useDriverDashboard();
  const { useAvailableRequests, acceptMutation } = useDriverActions();
  const { data: customRequests, isLoading: loadingCustom } = useAvailableRequests();

  const stats = [
    { label: 'أرباح اليوم', value: '450 ج.م', icon: Wallet, color: 'text-green-600', bg: 'bg-green-50' },
    { label: 'رحلات نشطة', value: trips?.length || 0, icon: CarFront, color: 'text-brand-600', bg: 'bg-brand-50' },
    { label: 'طلبات متاحة', value: customRequests?.length || 0, icon: Zap, color: 'text-amber-600', bg: 'bg-amber-50' },
  ];

  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-12 px-4 md:px-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto text-right">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">لوحة التحكم</h1>
            <p className="text-slate-500 font-medium mt-1">أهلاً بك يا بطل، تابع رحلاتك وأرباحك اليوم</p>
          </div>
          <Link to="/driver-dashboard/add-trip" className="flex items-center gap-3 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-brand-600/20 transition-all active:scale-95 cursor-pointer">
            <Plus size={20} /> إضافة رحلة جديدة
          </Link>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {stats.map((stat, i) => (
            <motion.div 
              key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between"
            >
              <div>
                <p className="text-slate-400 text-xs font-black mb-1">{stat.label}</p>
                <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
              </div>
              <div className={`${stat.bg} ${stat.color} p-4 rounded-2xl`}>
                <stat.icon size={24} />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tab Switcher */}
        <div className="flex gap-4 mb-8 bg-slate-200/50 p-1.5 rounded-[1.5rem] w-fit">
          <button 
            onClick={() => setActiveTab('my-trips')}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black transition-all cursor-pointer ${activeTab === 'my-trips' ? 'bg-white text-slate-900 shadow-md' : 'text-slate-500'}`}
          >
            <ClipboardList size={18} /> رحلاتي المعلنة
          </button>
          <button 
            onClick={() => setActiveTab('custom-req')}
            className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-black transition-all cursor-pointer relative ${activeTab === 'custom-req' ? 'bg-white text-brand-600 shadow-md' : 'text-slate-500'}`}
          >
            <Zap size={18} /> طلبات العملاء
            {customRequests?.length > 0 && (
              <span className="absolute -top-1 -left-1 w-5 h-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center animate-bounce">{customRequests.length}</span>
            )}
          </button>
        </div>

        {/* Content Section */}
        <AnimatePresence mode="wait">
          {activeTab === 'my-trips' ? (
            <motion.div 
              key="trips" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {loadingTrips ? (
                [1, 2, 3].map(i => <div key={i} className="h-64 bg-white animate-pulse rounded-[2.5rem]" />)
              ) : trips?.map(trip => <TripCard key={trip._id} trip={trip} />)}
              
              {trips?.length === 0 && !loadingTrips && (
                <div className="col-span-full bg-white p-20 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
                   <CarFront size={64} className="mx-auto text-slate-200 mb-6" />
                   <p className="text-slate-500 font-black">لا يوجد رحلات مسجلة، ابدأ بإضافة رحلتك الأولى!</p>
                </div>
              )}
            </motion.div>
          ) : (
            <motion.div 
              key="requests" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {loadingCustom ? (
                [1, 2, 3].map(i => <div key={i} className="h-64 bg-white animate-pulse rounded-[2.5rem]" />)
              ) : customRequests?.map(req => (
                <DriverCustomRequestCard 
                  key={req._id} 
                  request={req} 
                  onAccept={acceptMutation.mutate}
                  isPending={acceptMutation.isPending}
                />
              ))}

              {customRequests?.length === 0 && !loadingCustom && (
                <div className="col-span-full bg-white p-20 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
                   <Users size={64} className="mx-auto text-slate-200 mb-6" />
                   <h3 className="text-xl font-black text-slate-900 mb-2">لا توجد طلبات خاصة حالياً</h3>
                   <p className="text-slate-500 font-bold text-sm">تفقد هذه الصفحة لاحقاً للحصول على فرص عمل جديدة</p>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </div>
  );
};

export default DriverDashboard;