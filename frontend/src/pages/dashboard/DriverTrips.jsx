import { useState } from 'react';
import { motion } from 'framer-motion';
import { Car, Clock, CheckCircle, ChevronLeft } from 'lucide-react';
import { useDriverDashboard } from '../../hooks/useTripMutations';
import { TripCard } from '../../components/dashboard/TripCard';

const DriverTrips = () => {
  const [activeTab, setActiveTab] = useState('upcoming');
  const { data: trips, isLoading } = useDriverDashboard();

  // فلترة الرحلات بناءً على الوقت (وهمي حالياً بناءً على تاريخ اليوم)
  const filteredTrips = trips?.filter(trip => {
    const isPast = new Date(trip.departureTime) < new Date();
    return activeTab === 'upcoming' ? !isPast : isPast;
  });

  return (
    <div className="max-w-6xl mx-auto space-y-8 font-sans" dir="rtl">
      <div className="flex justify-between items-end">
        <div>
          <h1 className="text-3xl font-black text-slate-900">سجل الرحلات</h1>
          <p className="text-slate-500 font-medium">إدارة ومتابعة جميع تحركاتك</p>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 p-1.5 bg-slate-100 rounded-2xl w-fit">
        <button 
          onClick={() => setActiveTab('upcoming')}
          className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'upcoming' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          الرحلات القادمة
        </button>
        <button 
          onClick={() => setActiveTab('past')}
          className={`px-8 py-3 rounded-xl font-bold transition-all ${activeTab === 'past' ? 'bg-white text-brand-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
        >
          الرحلات المنتهية
        </button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map(i => <div key={i} className="h-48 bg-slate-200 animate-pulse rounded-3xl" />)}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTrips?.map((trip) => (
            <TripCard key={trip._id} trip={trip} />
          ))}
          {filteredTrips?.length === 0 && (
            <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
              <p className="text-slate-400 font-bold text-lg">لا يوجد رحلات في هذا القسم حالياً</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default DriverTrips;