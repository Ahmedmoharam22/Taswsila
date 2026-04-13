import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTripSocket } from '../hooks/useTripSocket';
import LiveTrackingMap from '../components/trips/LiveTrackingMap';
import api from '../api/axios';
import { useTripDetails } from '../hooks/useTripMutations';

const TripDetails = () => {
  const { id } = useParams();
  const { data: trip, isLoading } = useTripDetails(id);

  // 2. تشغيل السوكيت لتحديث نفس الـ Query Key أعلاه
  useTripSocket(id);

  if (isLoading) return <div className="text-center pt-20 font-black">جاري تحميل الرحلة...</div>;

  return (
    <div className="max-w-6xl mx-auto pt-32 px-4">
      <div className="grid lg:grid-cols-3 gap-8">
        {/* تفاصيل الرحلة */}
        <div className="lg:col-span-1 bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-100">
          <h2 className="text-2xl font-black text-slate-900 mb-6">تتبع السائق</h2>
          <div className="space-y-4">
            <div className="flex justify-between font-bold">
              <span className="text-slate-400 text-sm">السائق:</span>
              <span className="text-brand-600">{trip?.driverName}</span>
            </div>
            {/* عرض السرعة لو السوكيت بعتها */}
            {trip?.currentLocation?.speed && (
              <div className="flex justify-between font-bold">
                <span className="text-slate-400 text-sm">السرعة الحالية:</span>
                <span className="text-green-500">{Math.round(trip.currentLocation.speed)} كم/س</span>
              </div>
            )}
          </div>
        </div>

        {/* الخريطة لايف */}
        <div className="lg:col-span-2">
          <LiveTrackingMap location={trip?.currentLocation} />
        </div>
      </div>
    </div>
  );
};

export default TripDetails;