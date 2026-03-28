import { motion } from 'framer-motion';
import { Plus, CarFront, LayoutGrid } from 'lucide-react';
import { useDriverDashboard } from '../../hooks/useTripMutations';
import { TripCard } from '../../components/dashboard/TripCard';
import { Link } from 'react-router-dom';

const DriverDashboard = () => {
  const { data: trips, isLoading } = useDriverDashboard();

  return (
    <div className="min-h-screen bg-slate-50/50 pt-28 pb-12 px-4 md:px-8 font-sans" dir="rtl">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-900 tracking-tight">لوحة التحكم</h1>
            <p className="text-slate-500 font-medium mt-1">أهلاً بك يا بطل، تابع رحلاتك وأرباحك اليوم</p>
          </div>
          <Link to="/driver-dashboard/add-trip" className="flex items-center gap-3 bg-brand-600 hover:bg-brand-700 text-white px-8 py-4 rounded-2xl font-bold shadow-xl shadow-brand-600/20 transition-all active:scale-95">
            <Plus size={20} /> إضافة رحلة جديدة
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
           {/* هنا ممكن تضيف كروت إحصائيات سريعة */}
        </div>

        {/* Trips Section */}
        <div className="space-y-6">
          <div className="flex items-center gap-2 mb-4">
            <LayoutGrid className="text-brand-600" size={20} />
            <h2 className="text-xl font-black text-slate-800">رحلاتك الحالية</h2>
          </div>

          {isLoading ? (
            <div className="text-center py-20">جاري تحميل رحلاتك...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips?.map((trip) => (
                <TripCard key={trip._id} trip={trip} />
              ))}
              {trips?.length === 0 && (
                <div className="col-span-full bg-white p-12 rounded-[2.5rem] border-2 border-dashed border-slate-200 text-center">
                   <CarFront size={48} className="mx-auto text-slate-300 mb-4" />
                   <p className="text-slate-500 font-bold">لا يوجد رحلات مسجلة بعد، ابدأ الآن!</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DriverDashboard;