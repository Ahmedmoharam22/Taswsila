import { useState, useMemo } from 'react';
import { MapPin, Users, Calendar, CircleDollarSign, ArrowRight, CreditCard, CheckCircle2, Ticket } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom'; 
import { useAuth } from '../../context/AuthContext'; 
import BookingModal from '../common/BookingModal';

export const TripCard = ({ trip, isPublicView = false }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // فحص هل العميل الحالي حاجز في الرحلة دي قبل كدا؟
  const isAlreadyBooked = useMemo(() => {
    return user?.bookings?.some(booking => 
      (booking.trip?._id === trip._id || booking.trip === trip._id)
    );
  }, [user, trip._id]);

  return (
    <>
      <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group hover:shadow-2xl hover:shadow-brand-100/20 transition-all duration-500">
        
        {/* Header: Cities & Status */}
        <div className="flex justify-between items-start mb-4">
          <div className="flex gap-4 items-center">
            <div className="bg-brand-50 p-3 rounded-2xl text-brand-600 font-bold">
              <MapPin size={20} />
            </div>
            <div>
              <h3 className="text-lg font-black text-slate-900">{trip.fromCity} ← {trip.toCity}</h3>
              <p className="text-slate-400 text-xs font-medium flex items-center gap-1">
                <Calendar size={12} /> {new Date(trip.departureTime).toLocaleString('ar-EG')}
              </p>
            </div>
          </div>
          <span className={`px-4 py-1.5 rounded-full text-[10px] font-black ${
            trip.status === 'active' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
          }`}>
            {trip.status === 'active' ? 'نشطة' : 'ملغاة'}
          </span>
        </div>

        {/* Details Grid */}
        <div className="grid grid-cols-2 gap-4 mt-6">
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
            <p className="text-slate-400 text-[10px] font-bold uppercase mb-1 tracking-wider">الكراسي</p>
            <p className="text-slate-900 font-black flex items-center gap-2">
              <Users size={16} className="text-brand-600" /> {trip.availableSeats} / {trip.totalSeats}
            </p>
          </div>
          <div className="bg-slate-50 p-3 rounded-2xl border border-slate-100/50">
            <p className="text-slate-400 text-[10px] font-bold uppercase mb-1 tracking-wider">السعر</p>
            <p className="text-slate-900 font-black flex items-center gap-2">
              <CircleDollarSign size={16} className="text-brand-600" /> {trip.price} ج.م
            </p>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-6 pt-6 border-t border-slate-50 flex flex-col gap-3">
          {isPublicView ? (
            <>
              {isAlreadyBooked ? (
                /* ✅ حالة تم الحجز مسبقاً */
                <button 
                  onClick={() => navigate('/client-dashboard')}
                  className="w-full bg-green-50 text-green-600 py-4 rounded-2xl font-black text-sm border-2 border-green-100 flex items-center justify-center gap-2 hover:bg-green-100 transition-all"
                >
                  <Ticket size={18} /> عرض التذكرة في حسابك
                </button>
              ) : (
                /* 🎫 حالة طلب الحجز */
                <button 
                  onClick={() => {
                    if(!isAuthenticated) return navigate('/login');
                    setIsModalOpen(true);
                  }}
                  className="w-full bg-brand-600 text-white py-4 rounded-2xl font-black text-sm hover:bg-brand-700 transition-all shadow-lg shadow-brand-100 flex items-center justify-center gap-2 active:scale-95"
                >
                  <CreditCard size={18} /> احجز مكانك الآن
                </button>
              )}
            </>
          ) : (
            /* رابط السواق */
            <Link 
              to={`/driver-dashboard/trip-details/${trip._id}`} 
              className="flex items-center justify-between group/link text-brand-600 font-black text-sm p-2 hover:bg-brand-50 rounded-xl transition-all"
            >
              عرض الركاب والحجوزات 
              <ArrowRight size={18} className="group-hover/link:translate-x-[-4px] transition-transform" />
            </Link>
          )}
        </div>
      </div>

      <BookingModal 
        trip={trip} 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  );
};