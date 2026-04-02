import { Clock, MapPin, Car, CheckCircle, Loader2 } from 'lucide-react';

export const CustomRequestCard = ({ request }) => {
  const statusStyles = {
    pending: "bg-amber-50 text-amber-600 border-amber-100",
    accepted: "bg-green-50 text-green-600 border-green-100",
    expired: "bg-slate-50 text-slate-400 border-slate-100"
  };

  return (
    <div className="bg-white p-6 rounded-[2.5rem] border-2 border-slate-50 shadow-sm hover:shadow-md transition-all">
      <div className="flex justify-between items-start mb-6">
        <span className={`px-4 py-1.5 rounded-full text-xs font-black border ${statusStyles[request.status]}`}>
          {request.status === 'pending' ? 'في انتظار سواق...' : 'تم قبول طلبك'}
        </span>
        <div className="text-left font-black text-slate-900 text-lg">
          {request.priceOffered || 'سيتم التحديد'} ج.م
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-400">
            <MapPin size={20} />
          </div>
          <div>
            <p className="text-[10px] font-black text-slate-400 uppercase">خط السير</p>
            <p className="text-sm font-black text-slate-900">{request.fromCity} ➔ {request.toCity}</p>
          </div>
        </div>

        <div className="flex items-center gap-8 mr-2">
          <div className="flex items-center gap-2 text-slate-500">
            <Car size={16} />
            <span className="text-xs font-bold">{request.carType}</span>
          </div>
          <div className="flex items-center gap-2 text-slate-500">
            <Clock size={16} />
            <span className="text-xs font-bold">{new Date(request.departureTime).toLocaleDateString('ar-EG')}</span>
          </div>
        </div>
      </div>

      {request.status === 'accepted' && (
        <button className="w-full mt-6 py-4 bg-brand-600 text-white rounded-2xl font-black text-sm hover:bg-brand-700 transition-all cursor-pointer">
          تواصل مع السائق الآن
        </button>
      )}
    </div>
  );
};