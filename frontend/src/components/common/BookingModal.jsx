import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Users, CreditCard, Calendar, MapPin, CheckCircle } from 'lucide-react';
import { useCreateBooking } from '../../hooks/useBookingMutations';

const BookingModal = ({ trip, isOpen, onClose }) => {
  const [seats, setSeats] = useState(1);
  const { mutate, isPending } = useCreateBooking();

  if (!isOpen) return null;

  const totalPrice = seats * trip.price;

  const handleBooking = () => {
    mutate({
      tripId: trip._id,
      seatsBooked: seats
    }, {
      onSuccess: () => onClose()
    });
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
        {/* Overlay */}
        <motion.div 
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
        />

        {/* Modal Content */}
        <motion.div 
          initial={{ scale: 0.9, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          exit={{ scale: 0.9, opacity: 0, y: 20 }}
          className="bg-white w-full max-w-lg rounded-[3rem] shadow-2xl overflow-hidden relative z-10 font-sans"
          dir="rtl"
        >
          {/* Header Section */}
          <div className="bg-brand-600 p-8 text-white relative">
            <button onClick={onClose} className="absolute left-6 top-6 p-2 bg-white/20 rounded-full hover:bg-white/30 transition-all">
              <X size={20} />
            </button>
            <h2 className="text-2xl font-black mb-2">تأكيد الحجز</h2>
            <div className="flex items-center gap-2 opacity-90 font-bold">
              <MapPin size={16} />
              <span>{trip.fromCity} ← {trip.toCity}</span>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Trip Brief */}
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-400 font-bold mb-1 uppercase">موعد التحرك</p>
                <p className="text-slate-900 font-black flex items-center gap-2">
                  <Calendar size={16} className="text-brand-600" />
                  {new Date(trip.departureTime).toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
              <div className="bg-slate-50 p-4 rounded-2xl border border-slate-100">
                <p className="text-xs text-slate-400 font-bold mb-1 uppercase">المقاعد المتاحة</p>
                <p className="text-slate-900 font-black flex items-center gap-2">
                  <Users size={16} className="text-brand-600" />
                  {trip.availableSeats} مقعد
                </p>
              </div>
            </div>

            {/* Seat Selector */}
            <div>
              <label className="block text-slate-700 font-black mb-4">كم عدد الكراسي التي تريد حجزها؟</label>
              <div className="flex items-center gap-4">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    disabled={num > trip.availableSeats}
                    onClick={() => setSeats(num)}
                    className={`flex-1 py-4 rounded-2xl font-black transition-all border-2 
                    ${seats === num 
                      ? 'bg-brand-600 border-brand-600 text-white shadow-lg shadow-brand-200 scale-105' 
                      : 'bg-white border-slate-100 text-slate-400 hover:border-brand-200'}
                    ${num > trip.availableSeats ? 'opacity-20 cursor-not-allowed' : ''}`}
                  >
                    {num}
                  </button>
                ))}
              </div>
            </div>

            {/* Price Summary */}
            <div className="bg-brand-50 p-6 rounded-[2rem] border border-brand-100 flex justify-between items-center">
              <div>
                <p className="text-brand-900 font-black text-xl">إجمالي المبلغ</p>
                <p className="text-brand-600 font-bold text-sm">الدفع كاش للسائق عند الركوب</p>
              </div>
              <div className="text-left">
                <span className="text-3xl font-black text-brand-600">{totalPrice}</span>
                <span className="text-brand-900 font-bold mr-1 text-sm">ج.م</span>
              </div>
            </div>

            {/* Confirm Button */}
            <button
              onClick={handleBooking}
              disabled={isPending}
              className={`w-full py-5 rounded-2xl font-black text-lg shadow-xl transition-all active:scale-95 flex items-center justify-center gap-3
              ${isPending ? 'bg-slate-300' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-slate-200'}`}
            >
              {isPending ? "جاري التأكيد..." : <><CheckCircle size={22} /> تأكيد الحجز الآن</>}
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default BookingModal;