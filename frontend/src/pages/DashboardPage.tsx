import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldAlert,
  ShieldCheck,
  AlertTriangle,
  Eye,
  CreditCard,
  Globe,
  MessageSquareWarning,
  Clock,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { getDashboardStats } from '../services/api';
import { RiskBadge } from '../components/RiskBadge';

export const DashboardPage: React.FC = () => {
  const [stats, setStats] = useState<any>({
    total_scans: 0,
    high_risk_scans: 0,
    medium_risk_scans: 0,
    low_risk_scans: 0,
    threat_interception_rate: 0,
    recent_scans: [],
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const data = await getDashboardStats();
        setStats(data);
      } catch (err) {
        console.error('Failed to load stats', err);
      }
    };
    fetchStats();
  }, []);

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 sm:p-7 shadow-xs">
        <div className="max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#EAF5F0] border border-[#B7DFCD] text-[#26845B] text-xs font-semibold mb-2.5">
            <Sparkles className="h-3 w-3" />
            Active Threat Mitigation Engine
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-[#172B4D] tracking-tight">
            Security Dashboard
          </h1>
          <p className="mt-1.5 text-xs sm:text-sm text-[#344054] leading-relaxed">
            Verify any link, QR code, UPI ID, deepfake video, or suspicious message before engaging or sending money.
          </p>
        </div>
      </div>

      {/* Telemetry Metrics Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {/* Total Scans */}
        <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-5 shadow-xs">
          <div className="flex items-center justify-between text-[#667085] text-xs font-semibold uppercase tracking-wider mb-1.5">
            <span>Total Inspected</span>
            <Clock className="h-4 w-4 text-[#3975A8]" />
          </div>
          <div className="text-2xl font-bold text-[#172B4D]">{stats.total_scans}</div>
          <p className="text-[11px] text-[#667085] mt-1">Digital assets verified</p>
        </div>

        {/* High Risk Intercepted */}
        <div className="rounded-xl border border-[#F4C4C4] bg-[#FDF1F1] p-5 shadow-xs">
          <div className="flex items-center justify-between text-[#C24141] text-xs font-semibold uppercase tracking-wider mb-1.5">
            <span>High Risk Intercepted</span>
            <ShieldAlert className="h-4 w-4 text-[#C24141]" />
          </div>
          <div className="text-2xl font-bold text-[#C24141]">{stats.high_risk_scans}</div>
          <p className="text-[11px] text-[#667085] mt-1">Severe fraud indicators detected</p>
        </div>

        {/* Medium Risk */}
        <div className="rounded-xl border border-[#F3DCB5] bg-[#FDF6EC] p-5 shadow-xs">
          <div className="flex items-center justify-between text-[#B7791F] text-xs font-semibold uppercase tracking-wider mb-1.5">
            <span>Medium Caution</span>
            <AlertTriangle className="h-4 w-4 text-[#B7791F]" />
          </div>
          <div className="text-2xl font-bold text-[#B7791F]">{stats.medium_risk_scans}</div>
          <p className="text-[11px] text-[#667085] mt-1">Cautionary flags detected</p>
        </div>

        {/* Low Risk / Clean */}
        <div className="rounded-xl border border-[#B7DFCD] bg-[#EAF5F0] p-5 shadow-xs">
          <div className="flex items-center justify-between text-[#26845B] text-xs font-semibold uppercase tracking-wider mb-1.5">
            <span>Verified Safe</span>
            <ShieldCheck className="h-4 w-4 text-[#26845B]" />
          </div>
          <div className="text-2xl font-bold text-[#26845B]">{stats.low_risk_scans}</div>
          <p className="text-[11px] text-[#667085] mt-1">Clean telemetry matches</p>
        </div>
      </div>

      {/* Quick Launch Scanner Tools */}
      <div>
        <h3 className="text-xs font-bold uppercase tracking-wider text-[#344054] mb-3">
          Verification Modules
        </h3>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link
            to="/upi-checker"
            className="group rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-5 hover:border-[#287C78] transition shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="h-9 w-9 rounded-lg bg-[#EBF4F3] border border-[#DCE3EB] text-[#287C78] flex items-center justify-center mb-3">
                <CreditCard className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-[#172B4D] text-sm mb-1">UPI & QR Checker</h4>
              <p className="text-xs text-[#667085]">Validate payee VPA, handle legitimacy, and scan QR codes.</p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#287C78]">
              <span>Check Payment</span> <ArrowRight className="h-3 w-3" />
            </div>
          </Link>

          <Link
            to="/deepfake"
            className="group rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-5 hover:border-[#287C78] transition shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="h-9 w-9 rounded-lg bg-[#EBF4F3] border border-[#DCE3EB] text-[#287C78] flex items-center justify-center mb-3">
                <Eye className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-[#172B4D] text-sm mb-1">Deepfake Detector</h4>
              <p className="text-xs text-[#667085]">Forensic media analysis for videos, images, and voice notes.</p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#287C78]">
              <span>Inspect Media</span> <ArrowRight className="h-3 w-3" />
            </div>
          </Link>

          <Link
            to="/phishing"
            className="group rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-5 hover:border-[#287C78] transition shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="h-9 w-9 rounded-lg bg-[#EBF4F3] border border-[#DCE3EB] text-[#287C78] flex items-center justify-center mb-3">
                <Globe className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-[#172B4D] text-sm mb-1">Phishing URL Analyzer</h4>
              <p className="text-xs text-[#667085]">Inspect links, domain typosquatting, and certificate safety.</p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#287C78]">
              <span>Check URL</span> <ArrowRight className="h-3 w-3" />
            </div>
          </Link>

          <Link
            to="/message-analyzer"
            className="group rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-5 hover:border-[#287C78] transition shadow-xs flex flex-col justify-between"
          >
            <div>
              <div className="h-9 w-9 rounded-lg bg-[#EBF4F3] border border-[#DCE3EB] text-[#287C78] flex items-center justify-center mb-3">
                <MessageSquareWarning className="h-4 w-4" />
              </div>
              <h4 className="font-bold text-[#172B4D] text-sm mb-1">Message & Voice NLP</h4>
              <p className="text-xs text-[#667085]">Evaluate WhatsApp scams, fake KYC SMS, and screenshot OCR.</p>
            </div>
            <div className="mt-4 flex items-center gap-1 text-xs font-semibold text-[#287C78]">
              <span>Analyze Text</span> <ArrowRight className="h-3 w-3" />
            </div>
          </Link>
        </div>
      </div>

      {/* Recent Activity Table */}
      <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 shadow-xs">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-[#172B4D] text-sm sm:text-base">Recent Threat Intelligence Logs</h3>
            <p className="text-xs text-[#667085]">Live log of verified assets and risk classifications</p>
          </div>
          <Link to="/history" className="text-xs text-[#287C78] hover:text-[#1f6360] font-semibold flex items-center gap-1">
            <span>View All</span> <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        {stats.recent_scans && stats.recent_scans.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#344054]">
              <thead className="border-b border-[#DCE3EB] text-[11px] uppercase tracking-wider text-[#667085]">
                <tr>
                  <th className="pb-3 font-semibold">Asset / Target</th>
                  <th className="pb-3 font-semibold">Module</th>
                  <th className="pb-3 font-semibold">Risk Level</th>
                  <th className="pb-3 font-semibold">Confidence</th>
                  <th className="pb-3 font-semibold text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE3EB]">
                {stats.recent_scans.map((r: any) => (
                  <tr key={r.id} className="hover:bg-[#F5F7FA] transition">
                    <td className="py-3 font-medium text-[#172B4D] max-w-[200px] truncate">{r.target_summary}</td>
                    <td className="py-3 uppercase text-[10px] text-[#667085] font-semibold">{r.scan_type}</td>
                    <td className="py-3">
                      <RiskBadge level={r.risk_level} size="sm" />
                    </td>
                    <td className="py-3 text-[#667085]">
                      {r.confidence_score ? `${Math.round(r.confidence_score * 100)}%` : 'Calibrated'}
                    </td>
                    <td className="py-3 text-right">
                      <Link
                        to={`/report/${r.id}`}
                        className="text-xs font-semibold text-[#287C78] hover:text-[#1f6360] transition"
                      >
                        Inspect Report
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-8 text-center text-xs text-[#667085]">
            No scans recorded yet. Use any of the verification modules above to run your first inspection.
          </div>
        )}
      </div>
    </div>
  );
};
