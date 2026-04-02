import { motion } from 'framer-motion';
import { MapPin, Calendar, Users, CheckCircle2, Zap } from 'lucide-react';

export const DriverCustomRequestCard = ({ request, onAccept, isPending }) => (
  <motion.div 
    layout
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white p-6 rounded-[2.5rem] border-2 border-slate-50 shadow-sm hover:border-brand-500/50 transition-all group relative overflow-hidden"
  >
    <div className="absolute top-0 left-0 w-16 h-16 bg-brand-50 rounded-br-[2rem] flex items-center justify-center text-brand-600">
      <Zap size={20} fill="currentColor" />
    </div>

    <div className="flex items-center gap-4 mb-6 mr-10">
      <img src={request.passenger?.avatar || '/default-avatar.png'} className="w-12 h-12 rounded-2xl object-cover shadow-md" alt="" />
      <div className="text-right">
        <h4 className="font-black text-slate-900">{request.passenger?.fullName}</h4>
        <p className="text-[10px] text-slate-400 font-black uppercase tracking-tighter">طلب خاص لمرة واحدة</p>
      </div>
    </div>

    <div className="space-y-4 mb-6 bg-slate-50/50 p-4 rounded-2xl border border-slate-100">
      <div className="flex items-center gap-3 text-slate-700 font-bold text-sm">
        <MapPin size={18} className="text-brand-600" />
        <span>{request.fromCity} ➔ {request.toCity}</span>
      </div>
      <div className="flex justify-between items-center text-[11px] text-slate-500 font-black">
        <div className="flex items-center gap-1.5"><Calendar size={14} /> {new Date(request.departureTime).toLocaleDateString('ar-EG')}</div>
        <div className="flex items-center gap-1.5"><Users size={14} /> {request.seatsNeeded} كراسي</div>
      </div>
    </div>

    <button 
      onClick={() => onAccept(request._id)}
      disabled={isPending}
      className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm hover:bg-brand-600 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 active:scale-95 shadow-lg shadow-slate-200"
    >
      {isPending ? 'جاري التأكيد...' : <><CheckCircle2 size={18} /> قبول وتأكيد الرحلة</>}
    </button>
  </motion.div>
);