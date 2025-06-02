import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Loader } from 'lucide-react';
import { Toaster } from 'react-hot-toast';

import Navbar from './components/Navbar';
import DashboardLayout from './pages/Dashboardlayout'; // New layout component
import DashboardHome from './pages/DashboardHome';
import ClassesPage from './pages/ClassesPage';
import LandPage from './pages/LandPage';
import DrivingPage from './pages/DrivingPage';
import BusinessPage from './pages/BussinesPage';
import SettingsPage from './pages/SettingsPage';
import LoginPage from './pages/LoginPage';
import { useAuthStore } from './store/auth.store';

const App = () => {
  const { authUser, checkAuth, isCheckingAuth } = useAuthStore();

  // Check authentication status on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Show loader while checking auth status
  if (isCheckingAuth && !authUser) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div>
      {authUser && <Navbar />}
      <Routes>
        <Route
          path="/"
          element={authUser ? <DashboardLayout /> : <Navigate to="/login" replace />}
        >
          <Route index element={<DashboardHome />} />
          <Route path="classes" element={<ClassesPage />} />
          <Route path="land" element={<LandPage />} />
          <Route path="driving" element={<DrivingPage />} />
          <Route path="business" element={<BusinessPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
        <Route
          path="/login"
          element={!authUser ? <LoginPage /> : <Navigate to="/" replace />}
        />
      </Routes>

      <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
    </div>
  );
};

export default App;