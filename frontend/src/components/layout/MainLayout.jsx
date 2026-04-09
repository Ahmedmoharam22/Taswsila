import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { useTranslation } from 'react-i18next';

const MainLayout = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* هنا بتظهر الصفحات (Home, Login, etc) */}
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-white text-center py-6">
        <p>{t('footer.copyright')}</p>
      </footer>
    </div>
  );
};

export default MainLayout;