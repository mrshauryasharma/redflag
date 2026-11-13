import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Eye, CreditCard, MessageSquareWarning, Gamepad2 } from 'lucide-react';

export const MobileBottomNav: React.FC = () => {
  const items = [
    { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/upi-checker', label: 'UPI/QR', icon: CreditCard },
    { path: '/deepfake', label: 'Deepfake', icon: Eye },
    { path: '/message-analyzer', label: 'Message', icon: MessageSquareWarning },
    { path: '/simulator', label: 'Simulator', icon: Gamepad2 },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-40 border-t border-[#DCE3EB] bg-[#FFFFFF] px-2 py-1.5 lg:hidden shadow-md">
      <div className="flex items-center justify-around">
        {items.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center justify-center py-1 px-2.5 rounded-lg transition ${
                  isActive
                    ? 'text-[#287C78] font-bold'
                    : 'text-[#667085] hover:text-[#172B4D]'
                }`
              }
            >
              <Icon className="h-4 w-4 mb-0.5" />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </NavLink>
          );
        })}
      </div>
    </nav>
  );
};
