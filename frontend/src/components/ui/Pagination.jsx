import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  // توليد أرقام الصفحات (مثلاً: 1, 2, 3)
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex flex-col md:flex-row items-center justify-center gap-6 pt-12 border-t border-slate-100">
      
      {/* زرار الرجوع */}
      <button
        onClick={() => onPageChange(Math.max(1, currentPage - 1))}
        disabled={currentPage === 1}
        className="flex items-center gap-2 px-5 py-3 bg-white text-slate-700 rounded-2xl font-black text-sm border border-slate-200 hover:border-brand-600 hover:text-brand-600 disabled:opacity-30 disabled:cursor-not-allowed transition-all active:scale-95 shadow-sm"
      >
        {isRTL ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        <span className="hidden sm:inline">{t('pagination.prev')}</span>
      </button>

      {/* أرقام الصفحات */}
      <div className="flex items-center gap-2 bg-slate-100/50 p-1.5 rounded-2xl border border-slate-100">
        {pages.map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className={`w-10 h-10 rounded-xl flex items-center justify-center font-black text-sm transition-all ${
              currentPage === p
                ? 'bg-brand-600 text-white shadow-lg shadow-brand-600/30 scale-110'
                : 'text-slate-500 hover:bg-white hover:text-brand-600'
            }`}
          >
            {p}
          </button>
        ))}
      </div>

      {/* زرار التالي */}
      <button
        onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
        disabled={currentPage === totalPages}
        className="flex items-center gap-2 px-5 py-3 bg-brand-600 text-white rounded-2xl font-black text-sm hover:bg-brand-700 disabled:bg-slate-300 disabled:cursor-not-allowed transition-all active:scale-95 shadow-md shadow-brand-600/20"
      >
        <span className="hidden sm:inline">{t('pagination.next')}</span>
        {isRTL ? <ChevronLeft size={18} /> : <ChevronRight size={18} />}
      </button>

      {/* عداد الصفحات للموبايل */}
      <div className="md:hidden text-xs font-black text-slate-400 uppercase tracking-tighter">
        {t('pagination.page_of', { current: currentPage, total: totalPages })}
      </div>
    </div>
  );
};

export default Pagination;