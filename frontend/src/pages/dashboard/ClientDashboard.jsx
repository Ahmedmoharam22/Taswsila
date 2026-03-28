import { ShoppingBag, Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useClientBookings } from '../../hooks/useClientBookings';
import { BookingCard } from '../../components/dashboard/BookingCard';

const ClientDashboard = () => {
  const { data: bookings, isLoading } = useClientBookings();

  return (
    <div className="max-w-6xl mx-auto font-sans" dir="rtl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
        <div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight text-right">رحلاتي المحجوزة</h1>
          <p className="text-slate-500 font-medium mt-1 text-right">تابع مواعيد تحركك وتواصل مع السائقين</p>
        </div>
        <Link to="/" className="flex items-center gap-2 bg-white border-2 border-slate-100 px-6 py-3 rounded-2xl font-bold text-slate-600 hover:border-brand-600 hover:text-brand-600 transition-all">
          <Search size={20} /> ابحث عن رحلة جديدة
        </Link>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {[1, 2].map(i => <div key={i} className="h-64 bg-white animate-pulse rounded-[2.5rem]" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {bookings?.map((booking) => (
            <BookingCard key={booking._id} booking={booking} />
          ))}

          {bookings?.length === 0 && (
            <div className="col-span-full bg-white p-20 rounded-[3rem] border-2 border-dashed border-slate-200 text-center">
              <ShoppingBag size={64} className="mx-auto text-slate-200 mb-6" />
              <h3 className="text-2xl font-black text-slate-900 mb-2">لا يوجد حجوزات حالياً</h3>
              <p className="text-slate-500 font-medium mb-8">ابدأ رحلتك الأولى الآن ووفر في مصاريف المواصلات</p>
              <Link to="/" className="bg-brand-600 text-white px-10 py-4 rounded-2xl font-black shadow-xl shadow-brand-200 inline-block">
                تصفح الرحلات المتاحة
              </Link>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ClientDashboard;