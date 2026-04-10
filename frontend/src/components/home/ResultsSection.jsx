import { useTranslation } from "react-i18next";
import { usePublicTrips } from "../../hooks/usePublicTrips";
import { Search } from "lucide-react";
import { TripCard } from "../dashboard/TripCard";

const ResultsSection = () => {
    const { t } = useTranslation();
    const { data: trips, isLoading } = usePublicTrips({});
    return (
        <section className="max-w-7xl mx-auto px-6 py-20 border-t border-slate-50">
        <div className="flex items-center justify-between mb-12">
          <div>
            <h2 className="text-3xl font-black text-slate-900">{t('home.results_title')}</h2>
            <p className="text-slate-400 font-bold mt-1 text-sm">{t('home.results_subtitle')}</p>
          </div>
          <span className="bg-slate-100 text-slate-600 px-5 py-2 rounded-full font-black text-xs uppercase tracking-tighter">
            {trips?.length || 0} {t('home.trips_found')}
          </span>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-[350px] bg-slate-50 animate-pulse rounded-[2.5rem] border border-slate-100"></div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {trips?.map((trip) => (
              <TripCard key={trip._id} trip={trip} isPublicView={true} />
            ))}
          </div>
        )}

        {!isLoading && trips?.length === 0 && (
          <div className="text-center py-20">
            <div className="bg-slate-50 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
              <Search className="text-slate-300" size={32} />
            </div>
            <h3 className="text-2xl font-black text-slate-900">{t('home.no_trips')}</h3>
            <p className="text-slate-500 font-bold">{t('home.try_different')}</p>
          </div>
        )}
      </section>
    )
}
export default ResultsSection;