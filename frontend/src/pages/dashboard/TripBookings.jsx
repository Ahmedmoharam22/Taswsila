import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Phone, User, CheckCircle2, Clock, MapPin } from 'lucide-react';
import { useTripBookings } from '../../hooks/useBookingMutations';

const TripBookings = () => {
  const { id } = useParams();
  const { data: bookings, isLoading } = useTripBookings(id);

  if (isLoading) return <div className="p-20 text-center font-bold">جاري تحميل قائمة الركاب...</div>;

  return (
    <div className="max-w-5xl mx-auto space-y-8 font-sans" dir="rtl">
      {/* Header */}
      <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100">
        <h2 className="text-2xl font-black text-slate-900 mb-2 text-right">قائمة الحجوزات</h2>
        <p className="text-slate-500 font-medium text-right">تابع الأشخاص الذين حجزوا معك في هذه الرحلة</p>
      </div>

      {/* Bookings List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {bookings?.length > 0 ? (
          bookings.map((booking, index) => (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
              key={booking._id}
              className="bg-white p-6 rounded-3xl border border-slate-100 shadow-lg shadow-slate-200/30 flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-brand-50 rounded-2xl flex items-center justify-center text-brand-600">
                  <User size={28} />
                </div>
                <div className="text-right">
                  <h3 className="font-black text-slate-900 text-lg">{booking.passengerName}</h3>
                  <div className="flex items-center gap-1 text-slate-500 text-sm font-bold">
                    <CheckCircle2 size={14} className="text-green-500" />
                    <span>تم حجز {booking.seatsBooked} كراسي</span>
                  </div>
                </div>
              </div>

              {/* Action: Call Button */}
              <a
                href={`tel:${booking.passengerPhone}`}
                className="bg-green-50 text-green-600 p-4 rounded-2xl hover:bg-green-600 hover:text-white transition-all shadow-md active:scale-90"
              >
                <Phone size={20} />
              </a>
            </motion.div>
          ))
        ) : (
          <div className="col-span-full py-20 text-center bg-white rounded-[2.5rem] border-2 border-dashed border-slate-200">
            <Clock size={48} className="mx-auto text-slate-300 mb-4" />
            <p className="text-slate-400 font-black text-xl text-right">لا يوجد ركاب حتى الآن، رحلتك مازالت معروضة</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TripBookings;