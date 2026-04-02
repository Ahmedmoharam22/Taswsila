// import { ShoppingBag, Search } from 'lucide-react';
// import { Link } from 'react-router-dom';
// import { useClientBookings } from '../../hooks/useClientBookings';
// import { BookingCard } from '../../components/dashboard/BookingCard';

// const ClientDashboard = () => {
//   const { data: bookings, isLoading } = useClientBookings();

//   return (
//     <div className="max-w-6xl mx-auto font-sans" dir="rtl">
//       <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
//         <div>
//           <h1 className="text-4xl font-black text-slate-900 tracking-tight text-right">رحلاتي المحجوزة</h1>
//           <p className="text-slate-500 font-medium mt-1 text-right">تابع مواعيد تحركك وتواصل مع السائقين</p>
//         </div>
//         <Link to="/" className="flex items-center gap-2 bg-white border-2 border-slate-100 px-6 py-3 rounded-2xl font-bold text-slate-600 hover:border-brand-600 hover:text-brand-600 transition-all">
//           <Search size={20} /> ابحث عن رحلة جديدة
//         </Link>
//       </div>

//       {isLoading ? (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {[1, 2].map(i => <div key={i} className="h-64 bg-white animate-pulse rounded-[2.5rem]" />)}
//         </div>
//       ) : (
//         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
//           {bookings?.map((booking) => (
//             <BookingCard key={booking._id} booking={booking} />
//           ))}

//           {bookings?.length === 0 && (
//             <div className="col-span-full bg-white p-20 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
//               <ShoppingBag size={64} className="mx-auto text-slate-200 mb-6" />
//               <h3 className="text-2xl font-black text-slate-900 mb-2">لا يوجد حجوزات حالياً</h3>
//               <p className="text-slate-500 font-medium mb-8">ابدأ رحلتك الأولى الآن ووفر في مصاريف المواصلات</p>
//               <Link to="/" className="bg-brand-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-brand-200 inline-block">
//                 تصفح الرحلات المتاحة
//               </Link>
//             </div>
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default ClientDashboard;


import { useState } from 'react';
import { ShoppingBag, Search, ClipboardList, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useClientBookings } from '../../hooks/useClientBookings';
import { useMyCustomRequests } from '../../hooks/useMyCustomRequests'; // الهوك الجديد
import { BookingCard } from '../../components/dashboard/BookingCard';
import { CustomRequestCard } from '../../components/dashboard/CustomRequestCard';

const ClientDashboard = () => {
  const [activeTab, setActiveTab] = useState('bookings');
  const { data: bookings, isLoading: loadingBookings } = useClientBookings();
  const { data: customRequests, isLoading: loadingCustom } = useMyCustomRequests();

  const isLoading = loadingBookings || loadingCustom;

  return (
    <div className="max-w-6xl mx-auto font-sans pt-10" dir="rtl">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 px-4">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight text-right">لوحة التحكم</h1>
          <p className="text-slate-500 font-medium mt-1 text-right">أهلاً بك، تابع رحلاتك وطلباتك الخاصة من هنا</p>
        </div>
        <Link to="/custom-booking" className="flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-black hover:bg-slate-800 transition-all cursor-pointer shadow-lg shadow-slate-200">
          <Zap size={20} className="fill-brand-400 text-brand-400" /> اطلب رحلة خاصة
        </Link>
      </div>

      {/* Tabs Switcher */}
      <div className="flex gap-4 mb-8 bg-slate-100 p-2 rounded-2xl w-fit mx-4 md:mx-0">
        <button 
          onClick={() => setActiveTab('bookings')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black transition-all cursor-pointer ${activeTab === 'bookings' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <ClipboardList size={18} /> حجوزاتي المؤكدة
        </button>
        <button 
          onClick={() => setActiveTab('custom')}
          className={`flex items-center gap-2 px-6 py-3 rounded-xl font-black transition-all cursor-pointer ${activeTab === 'custom' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          <Zap size={18} /> طلباتي الخاصة
          {customRequests?.filter(r => r.status === 'pending').length > 0 && (
            <span className="w-2 h-2 bg-brand-500 rounded-full animate-pulse"></span>
          )}
        </button>
      </div>

      {/* Content Area */}
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          {[1, 2].map(i => <div key={i} className="h-64 bg-white animate-pulse rounded-[2.5rem]" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 px-4">
          
          {/* Tab 1: المؤكدة */}
          {activeTab === 'bookings' && bookings?.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}

          {/* Tab 2: الخاصة */}
          {activeTab === 'custom' && customRequests?.map((request) => (
            <CustomRequestCard key={request._id} request={request} />
          ))}

          {/* Empty State */}
          {((activeTab === 'bookings' && bookings?.length === 0) || (activeTab === 'custom' && customRequests?.length === 0)) && (
            <div className="col-span-full bg-white p-20 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
              <ShoppingBag size={64} className="mx-auto text-slate-200 mb-6" />
              <h3 className="text-2xl font-black text-slate-900 mb-2">لا يوجد داتا حالياً</h3>
              <p className="text-slate-500 font-medium">ابدأ الآن وقم بحجز رحلتك القادمة</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;