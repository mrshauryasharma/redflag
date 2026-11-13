import React from 'react';
import { Outlet, Link, useLocation, Navigate } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { MobileBottomNav } from './MobileBottomNav';
import { ShieldCheck } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const DashboardLayout: React.FC = () => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const getPageTitle = (pathname: string) => {
    switch (pathname) {
      case '/dashboard': return 'Security Dashboard';
      case '/deepfake': return 'Deepfake & Media Forensic Lab';
      case '/upi-checker': return 'UPI & QR Payment Safety Checker';
      case '/phishing': return 'Phishing URL & Domain Reputation';
      case '/message-analyzer': return 'Scam Message & Audio NLP Inspector';
      case '/simulator': return 'Cyber Defense Simulator & Training';
      case '/history': return 'Threat Intelligence Scan History';
      case '/profile': return 'User Security Profile';
      case '/settings': return 'Platform Settings & Intelligence APIs';
      default: return 'Red Flag Console';
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#F5F7FA] overflow-hidden text-[#172B4D]">
      {/* Sidebar for Desktop */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top Header inside Dashboard */}
        <header className="h-16 border-b border-[#DCE3EB] bg-[#FFFFFF] px-4 sm:px-6 flex items-center justify-between shrink-0 shadow-xs">
          <div>
            <div className="text-[10px] uppercase font-bold tracking-wider text-[#287C78] flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[#26845B]"></span>
              Live Threat Engine Active
            </div>
            <h2 className="text-sm sm:text-base font-bold text-[#172B4D] tracking-tight">
              {getPageTitle(location.pathname)}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Mode Indicator */}
            <div className="hidden sm:flex items-center gap-2 rounded-lg bg-[#F5F7FA] border border-[#DCE3EB] px-3 py-1.5 text-xs text-[#344054]">
              <ShieldCheck className="h-3.5 w-3.5 text-[#287C78]" />
              <span>Offline Heuristics + Threat Intelligence</span>
            </div>

            <Link
              to="/profile"
              className="flex items-center gap-2 pl-2 border-l border-[#DCE3EB]"
            >
              <div className="h-8 w-8 rounded-full bg-[#EBF4F3] border border-[#DCE3EB] flex items-center justify-center text-xs font-bold text-[#287C78]">
                {user?.full_name ? user.full_name[0] : 'R'}
              </div>
            </Link>
          </div>
        </header>

        {/* Scrollable Page Body */}
        <main className="flex-1 overflow-y-auto px-4 sm:px-6 lg:px-8 py-6 pb-24 lg:pb-8">
          <Outlet />
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileBottomNav />
      </div>
    </div>
  );
};
