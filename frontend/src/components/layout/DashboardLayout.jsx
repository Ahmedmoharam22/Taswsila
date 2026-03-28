import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import { Menu } from 'lucide-react';

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 flex font-sans" dir="rtl">
      {/* Sidebar */}
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Mobile Header */}
        <header className="md:hidden bg-white border-b border-slate-100 p-4 flex justify-between items-center">
          <span className="font-black text-brand-900 text-xl">توصيلة</span>
          <button 
            onClick={() => setIsSidebarOpen(true)}
            className="p-2 bg-slate-50 rounded-xl text-slate-600"
          >
            <Menu size={24} />
          </button>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;