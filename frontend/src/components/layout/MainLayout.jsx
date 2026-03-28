import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans" dir="rtl">
      <Navbar />
      <main className="flex-grow pt-16">
        {/* هنا بتظهر الصفحات (Home, Login, etc) */}
        <Outlet />
      </main>
      <footer className="bg-gray-900 text-white text-center py-6">
        <p>© 2026 مشروع توصيلة - لخدمة شباب قريتنا ❤️</p>
      </footer>
    </div>
  );
};

export default MainLayout;