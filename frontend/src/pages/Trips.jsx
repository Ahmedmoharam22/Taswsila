import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, 
  MapPin, 
  SlidersHorizontal, 
  Car, 
  CircleDollarSign,
  Navigation2
} from 'lucide-react';
import { usePublicTrips } from '../hooks/usePublicTrips';
import { TripCard } from '../components/dashboard/TripCard';
import Pagination from '../components/ui/Pagination';
import { useTranslation } from 'react-i18next';

const Trips = () => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';
  
  const [filters, setFilters] = useState({ from: '', to: '', maxPrice: '' });
  const [page, setPage] = useState(1);
  const { data, isLoading } = usePublicTrips({ ...filters, page, limit: 6 });

  const trips = data?.trips || [];
  const pagination = data?.pagination;

  // تحديث الفلاتر مع تصقير الصفحة
  const updateFilters = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <header className="mb-12">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 mb-4"
          >
            <span className="bg-brand-100 text-brand-600 p-2 rounded-xl">
              <Navigation2 size={24} className="fill-brand-600" />
            </span>
            <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-tight">
              {t('trips.title')}
            </h1>
          </motion.div>
          <p className="text-slate-500 font-bold text-lg max-w-2xl leading-relaxed">
            {t('trips.subtitle')}
          </p>
        </header>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-85 shrink-0">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-slate-200/60 sticky top-32">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-2 text-slate-900 font-black">
                  <SlidersHorizontal size={20} className="text-brand-600" />
                  <span>{t('trips.filter_title')}</span>
                </div>
                {Object.values(filters).some(v => v !== '') && (
                   <button 
                    onClick={() => setFilters({ from: '', to: '', maxPrice: '' })}
                    className="text-xs font-black text-brand-600 hover:underline"
                   >
                    {isRTL ? 'إعادة ضبط' : 'Reset'}
                   </button>
                )}
              </div>

              <div className="space-y-8">
                {/* From City */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                    <MapPin size={14} /> {t('trips.from_city')}
                  </label>
                  <input 
                    type="text" 
                    value={filters.from}
                    placeholder={t('trips.cairo')} 
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                    onChange={(e) => updateFilters('from', e.target.value)}
                  />
                </div>

                {/* To City */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                    <MapPin size={14} /> {t('trips.to_city')}
                  </label>
                  <input 
                    type="text" 
                    value={filters.to}
                    placeholder={t('trips.alex')} 
                    className="w-full px-5 py-4 bg-slate-50 rounded-2xl border-2 border-transparent focus:border-brand-500 focus:bg-white outline-none transition-all font-bold text-slate-700"
                    onChange={(e) => updateFilters('to', e.target.value)}
                  />
                </div>

                {/* Price Range */}
                <div className="space-y-4 pt-4 border-t border-slate-100">
                  <div className="flex justify-between items-center">
                    <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest">
                      <CircleDollarSign size={14} /> {t('trips.max_price')}
                    </label>
                    <span className="bg-brand-50 text-brand-700 px-3 py-1 rounded-lg text-sm font-black">
                      {filters.maxPrice || 1000} {t('trips.currency')}
                    </span>
                  </div>
                  <input 
                    type="range" min="50" max="1000" step="50"
                    value={filters.maxPrice || 1000}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-600"
                    onChange={(e) => updateFilters('maxPrice', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <div key="loader" className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {[1, 2, 3, 4, 5, 6].map(i => (
                    <div key={i} className="h-72 bg-white animate-pulse rounded-[2.5rem] border border-slate-100 shadow-sm"></div>
                  ))}
                </div>
              ) : trips.length > 0 ? (
                <motion.div 
                  key="content"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="space-y-12"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {trips.map((trip, index) => (
                      <motion.div 
                        key={trip._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.05 }}
                      >
                        <TripCard trip={trip} isPublicView={true} />
                      </motion.div>
                    ))}
                  </div>

                  {/* Pagination Component */}
                  {pagination?.pages > 1 && (
                    <Pagination 
                      currentPage={page} 
                      totalPages={pagination.pages} 
                      onPageChange={(newPage) => {
                        setPage(newPage);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      }} 
                    />
                  )}
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[3.5rem] p-20 text-center border border-slate-200/60 shadow-sm"
                >
                  <div className="bg-slate-50 w-28 h-28 rounded-full flex items-center justify-center mx-auto mb-8 text-slate-300">
                    <Car size={48} strokeWidth={1.5} />
                  </div>
                  <h3 className="text-3xl font-black text-slate-900 mb-4">{t('trips.no_results')}</h3>
                  <p className="text-slate-500 font-bold text-lg max-w-sm mx-auto leading-relaxed">
                    {t('trips.no_results_desc')}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </main>
        </div>
      </div>
    </div>
  );
};

export default Trips;