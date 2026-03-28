import { MapPin, Phone, Calendar, User, BadgeCheck } from 'lucide-react';

export const BookingCard = ({ booking }) => (
  <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-xl shadow-slate-200/40 relative overflow-hidden group">
    <div className="flex justify-between items-start mb-6">
      <div className="flex gap-4 items-center">
        <div className="bg-brand-50 p-3 rounded-2xl text-brand-600">
          <MapPin size={24} />
        </div>
        <div>
          <h3 className="text-xl font-black text-slate-900 leading-tight">
            {booking.trip.fromCity} ← {booking.trip.toCity}
          </h3>
          <p className="text-slate-400 text-sm font-bold flex items-center gap-1 mt-1">
            <Calendar size={14} /> {new Date(booking.trip.departureTime).toLocaleString('ar-EG')}
          </p>
        </div>
      </div>
      <span className="bg-green-100 text-green-600 px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-1">
        <BadgeCheck size={14} /> مؤكد
      </span>
    </div>

    <div className="bg-slate-50 p-5 rounded-3xl flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-400 border border-slate-100">
          <User size={20} />
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase">السائق</p>
          <p className="text-slate-900 font-black text-sm">{booking.driverName}</p>
        </div>
      </div>
      <a 
        href={`tel:${booking.driverPhone}`}
        className="bg-brand-600 text-white p-3 rounded-xl shadow-lg shadow-brand-200 hover:scale-110 transition-all"
      >
        <Phone size={18} />
      </a>
    </div>

    <div className="mt-4 flex justify-between items-center px-2">
      <p className="text-slate-500 font-bold text-sm">عدد الكراسي: {booking.seatsBooked}</p>
      <p className="text-brand-600 font-black text-lg">{booking.totalPrice} ج.م</p>
    </div>
  </div>
);