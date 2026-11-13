import React from 'react';
import { User, Award } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user } = useAuth();

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-[#287C78] text-xs font-bold uppercase tracking-wider mb-1">
          <User className="h-4 w-4" />
          <span>User Profile & Security Score</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#172B4D]">
          Security Analyst Profile
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] mt-1">
          Monitor your defense readiness, verified credentials, and digital risk profile.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 sm:p-7 shadow-xs flex flex-col sm:flex-row items-center gap-6">
        <div className="h-16 w-16 rounded-xl bg-[#EBF4F3] border border-[#DCE3EB] flex items-center justify-center text-2xl font-bold text-[#287C78] shrink-0">
          {user?.full_name ? user.full_name[0] : 'R'}
        </div>

        <div className="flex-1 text-center sm:text-left">
          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2 mb-1">
            <h2 className="text-lg font-bold text-[#172B4D]">{user?.full_name || 'Red Flag Analyst'}</h2>
            <span className="px-2 py-0.5 rounded-md bg-[#EAF5F0] text-[#26845B] text-[10px] font-semibold border border-[#B7DFCD]">
              Verified Analyst
            </span>
          </div>
          <p className="text-xs text-[#667085]">{user?.email || 'Logged In Account'}</p>
          <p className="text-[11px] text-[#667085] mt-1.5">
            Role: <span className="text-[#344054] font-semibold uppercase">{user?.role || 'Security User'}</span> • ID: #{user?.id ? `USR-${user.id}` : 'VERIFIED'}
          </p>
        </div>

        {/* Defense Readiness Meter */}
        <div className="rounded-xl border border-[#DCE3EB] bg-[#F5F7FA] px-6 py-3.5 text-center">
          <div className="text-[10px] uppercase font-bold text-[#667085] tracking-wider">
            Defense Readiness
          </div>
          <div className="text-2xl font-bold text-[#26845B] mt-0.5">
            94<span className="text-xs text-[#667085] font-normal">/100</span>
          </div>
          <span className="text-[10px] text-[#26845B] font-medium block mt-0.5">High Vigilance Level</span>
        </div>
      </div>

      {/* Security Achievements */}
      <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 shadow-xs">
        <h3 className="font-bold text-[#172B4D] text-sm mb-4 flex items-center gap-2">
          <Award className="h-4 w-4 text-[#B7791F]" />
          <span>Digital Defense Badges</span>
        </h3>
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="rounded-lg border border-[#DCE3EB] bg-[#F5F7FA] p-4">
            <div className="text-xs font-bold text-[#26845B] mb-1">Anti-Phishing Guardian</div>
            <p className="text-[11px] text-[#667085] leading-relaxed">Successfully completed URL and typosquatting inspection drills.</p>
          </div>
          <div className="rounded-lg border border-[#DCE3EB] bg-[#F5F7FA] p-4">
            <div className="text-xs font-bold text-[#287C78] mb-1">UPI Fraud Shield</div>
            <p className="text-[11px] text-[#667085] leading-relaxed">Mastered the rule: Never enter UPI PIN to receive money.</p>
          </div>
          <div className="rounded-lg border border-[#DCE3EB] bg-[#F5F7FA] p-4">
            <div className="text-xs font-bold text-[#3975A8] mb-1">Synthetic Media Scout</div>
            <p className="text-[11px] text-[#667085] leading-relaxed">Trained to detect AI voice cloning emergency calls.</p>
          </div>
        </div>
      </div>
    </div>
  );
};
