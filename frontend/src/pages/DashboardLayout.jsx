// src/pages/DashboardLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';

const DashboardLayout = () => {
  return (
    <div className="min-h-screen bg-base-200">
      <div className="flex pt-16"> {/* Adjust top padding for navbar height */}
        <Sidebar />
        <main className="flex-1 ml-20 md:ml-64 p-6 min-h-[calc(100vh-4rem)]">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;