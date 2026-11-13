import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  Flag,
  LayoutDashboard,
  Eye,
  CreditCard,
  Globe,
  MessageSquareWarning,
  Gamepad2,
  History,
  User,
  Settings,
  LogOut,
  Info,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const NAV_ITEMS = [
  { path: '/dashboard', label: 'Security Dashboard', icon: LayoutDashboard },
  { path: '/deepfake', label: 'Deepfake Detector', icon: Eye },
  { path: '/upi-checker', label: 'UPI Safety Checker', icon: CreditCard },
  { path: '/phishing', label: 'Phishing URL Analyzer', icon: Globe },
  { path: '/message-analyzer', label: 'Message & Voice AI', icon: MessageSquareWarning },
  { path: '/simulator', label: 'Scam Simulator', icon: Gamepad2, badge: 'Training' },
  { path: '/history', label: 'Scan History', icon: History },
  { path: '/profile', label: 'User Profile', icon: User },
  { path: '/settings', label: 'Settings & APIs', icon: Settings },
];

export const Sidebar: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <aside className="hidden lg:flex w-64 flex-col border-r border-[#DCE3EB] bg-[#FFFFFF] z-20 shrink-0 select-none">
      {/* Brand Header */}
      <div className="flex items-center gap-3 px-6 py-5 border-b border-[#DCE3EB]">
        <div className="h-9 w-9 rounded-lg bg-[#287C78] flex items-center justify-center text-[#FFFFFF] shadow-xs">
          <Flag className="h-4 w-4" />
        </div>
        <div>
          <h1 className="font-bold text-base tracking-tight text-[#172B4D]">
            RED <span className="text-[#287C78]">FLAG</span>
          </h1>
          <p className="text-[10px] text-[#667085] font-medium tracking-tight">PRE-PAYMENT VERIFICATION</p>
        </div>
      </div>

      {/* Navigation Items */}
      <nav className="flex-1 space-y-1 px-3 py-4 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-[#667085]">
          Verification Modules
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `group flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium transition ${
                  isActive
                    ? 'bg-[#EBF4F3] text-[#287C78] font-semibold'
                    : 'text-[#344054] hover:bg-[#F5F7FA] hover:text-[#172B4D]'
                }`
              }
            >
              <div className="flex items-center gap-2.5">
                <Icon className="h-4 w-4 shrink-0 transition" />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="rounded-md bg-[#F5F7FA] px-1.5 py-0.5 text-[9px] font-semibold text-[#287C78] border border-[#DCE3EB]">
                  {item.badge}
                </span>
              )}
            </NavLink>
          );
        })}
      </nav>

      {/* Philosophy Card */}
      <div className="p-3.5 m-3 rounded-lg border border-[#DCE3EB] bg-[#F5F7FA] text-xs">
        <div className="flex items-center gap-1.5 text-[#287C78] font-semibold mb-1">
          <Info className="h-3.5 w-3.5 text-[#287C78]" />
          <span>Think Before You Trust</span>
        </div>
        <p className="text-[11px] text-[#667085] leading-relaxed">
          Verify digital content, links, and payee details before making any payment.
        </p>
      </div>

      {/* User Footer */}
      <div className="p-3 border-t border-[#DCE3EB] flex items-center justify-between">
        <div className="flex items-center gap-2.5 min-w-0">
          <div className="h-8 w-8 rounded-full bg-[#EBF4F3] border border-[#DCE3EB] flex items-center justify-center text-xs font-bold text-[#287C78] shrink-0">
            {user?.full_name ? user.full_name[0].toUpperCase() : 'U'}
          </div>
          <div className="min-w-0">
            <div className="text-xs font-semibold text-[#172B4D] truncate">{user?.full_name || 'Defender'}</div>
            <div className="text-[10px] text-[#667085] truncate">{user?.email || 'Active'}</div>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="p-1.5 rounded-md text-[#667085] hover:text-[#C24141] hover:bg-[#F5F7FA] transition"
          title="Sign Out"
        >
          <LogOut className="h-4 w-4" />
        </button>
      </div>
    </aside>
  );
};
