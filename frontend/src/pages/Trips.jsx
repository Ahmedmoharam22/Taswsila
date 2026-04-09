import { useState } from 'react';
import { motion } from 'framer-motion';
import { Filter, Search, MapPin, SlidersHorizontal } from 'lucide-react';
import { usePublicTrips } from '../hooks/usePublicTrips';
import { TripCard } from '../components/dashboard/TripCard';
import { useTranslation } from 'react-i18next';

const Trips = () => {
  const { t } = useTranslation();
  const [filters, setFilters] = useState({ from: '', to: '', maxPrice: '' });
  const { data: trips, isLoading } = usePublicTrips(filters);

  return (
    <div className="min-h-screen bg-slate-50/50 pt-32 pb-20 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-12">
          <motion.h1 
            initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
            className="text-4xl text-brand-600 font-black mb-2"
          >
            {t('trips.title')} 
          </motion.h1>
          <p className="text-slate-500 font-bold">{t('trips.subtitle')}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Sidebar Filters */}
          <aside className="w-full lg:w-80 shrink-0">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-xl shadow-slate-200/50 border border-slate-100 sticky top-32">
              <div className="flex items-center gap-2 mb-8 text-brand-600 font-black">
                <SlidersHorizontal size={20} />
                <span>{t('trips.filter_title')}</span>
              </div>

              <div className="space-y-6">
                <div>
                  <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-wider">{t('trips.from_city')}</label>
                  <div className="relative">
                    <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder={t('trips.cairo')} 
                      className="w-full pr-11 pl-4 py-3 bg-slate-50 rounded-xl border-2 border-transparent focus:border-brand-600 outline-none transition-all font-bold text-sm"
                      onChange={(e) => setFilters({...filters, from: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-wider">{t('trips.to_city')}</label>
                  <div className="relative">
                    <MapPin className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input 
                      type="text" 
                      placeholder={t('trips.alex')} 
                      className="w-full pr-11 pl-4 py-3 bg-slate-50 rounded-xl border-2 border-transparent focus:border-brand-600 outline-none transition-all font-bold text-sm"
                      onChange={(e) => setFilters({...filters, to: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-black text-slate-400 mb-2 uppercase tracking-wider">{t('trips.max_price')}</label>
                  <input 
                    type="range" min="50" max="1000" step="50"
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-brand-600"
                    onChange={(e) => setFilters({...filters, maxPrice: e.target.value})}
                  />
                  <div className="flex justify-between mt-2 text-xs font-black text-slate-500">
                    <span>50 {t('trips.currency')}</span>
                    <span className="text-brand-600">{filters.maxPrice || 1000} {t('trips.currency')}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content: Trips Grid */}
          <main className="flex-1">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1,2,3,4].map(i => <div key={i} className="h-64 bg-white animate-pulse rounded-[2rem] border border-slate-100"></div>)}
              </div>
            ) : (
              <>
                {trips?.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {trips.map(trip => (
                      <motion.div 
                        layout initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                        key={trip._id}
                      >
                        <TripCard trip={trip} isPublicView={true} />
                      </motion.div>
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-[3rem] p-20 text-center border border-slate-100 shadow-sm">
                    <div className="bg-slate-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                      <Search size={40} />
                    </div>
                    <h3 className="text-2xl font-black text-slate-900 mb-2">{t('trips.no_results')}</h3>
                    <p className="text-slate-500 font-bold">{t('trips.no_results_desc')}</p>
                  </div>
                )}
              </>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Trips;