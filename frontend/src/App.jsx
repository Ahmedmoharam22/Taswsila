import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './components/layout/MainLayout';

// Pages
import Home from './pages/Home';
import Login from './pages/auth/Login';
import RegisterPage from './pages/auth/Register';
import { useAuth } from './context/AuthContext';
import DriverDashboard from './pages/dashboard/DriverDashboard';
import DashboardLayout from './components/layout/DashboardLayout';
import AddTrip from './pages/dashboard/AddTrip';
import TripBookings from './pages/dashboard/TripBookings';
import Profile from './pages/dashboard/Profile';
import DriverTrips from './pages/dashboard/DriverTrips';
import ClientDashboard from './pages/dashboard/ClientDashboard';
import Trips from './pages/Trips';
import About from './pages/About';
import Contact from './pages/Contact';

// مكون حماية المسارات
const ProtectedRoute = ({ children, role }) => {
  const { user, isAuthenticated, loading } = useAuth();

  if (loading) return null; 
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  // التأكد إن اليوزر معاه الصلاحية المناسبة (سائق أو عميل)
  if (role && user.role !== role) return <Navigate to="/" />;

  return children;
};

function App() {
  return (
    <Router>
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: { borderRadius: '1rem', background: '#10b981', color: '#fff' }
        }}
      />

      <Routes>
        {/* 1. المسارات العامة (MainLayout) */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="trips" element={<Trips />} />
          <Route path="about" element={<About />} />
          <Route path="contact" element={<Contact />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>

        {/* 2. داشبورد السائق (محمية لـ driver فقط) */}
        <Route
          path="/driver-dashboard"
          element={
            <ProtectedRoute role="driver">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<DriverDashboard />} />
          <Route path="trips" element={<DriverTrips />} />
          <Route path="add-trip" element={<AddTrip />} />
          <Route path="profile" element={<Profile />} />
          <Route path="trip-details/:id" element={<TripBookings />} />
        </Route>

        {/* 3. داشبورد العميل (محمية لـ client فقط) */}
        <Route
          path="/client-dashboard"
          element={
            <ProtectedRoute role="client">
              <DashboardLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<ClientDashboard />} />
          <Route path="profile" element={<Profile />} />
        </Route>

        {/* مسار احتياطي */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;