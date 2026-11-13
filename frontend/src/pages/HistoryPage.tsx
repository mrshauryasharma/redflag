import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { History, Search, ArrowRight, RefreshCw } from 'lucide-react';
import { getScanHistory } from '../services/api';
import { RiskBadge } from '../components/RiskBadge';

export const HistoryPage: React.FC = () => {
  const [records, setRecords] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [scanType, setScanType] = useState('all');
  const [riskLevel, setRiskLevel] = useState('all');

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const data = await getScanHistory({
        search: search.trim() || undefined,
        scan_type: scanType !== 'all' ? scanType : undefined,
        risk_level: riskLevel !== 'all' ? riskLevel : undefined,
      });
      setRecords(data);
    } catch (err) {
      console.error('Failed to fetch history', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [scanType, riskLevel]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchHistory();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-[#287C78] text-xs font-bold uppercase tracking-wider mb-1">
            <History className="h-4 w-4" />
            <span>Audit Trail & Records</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#172B4D]">
            Security Scan History
          </h1>
          <p className="text-xs sm:text-sm text-[#667085] mt-1">
            Review past inspections, telemetry hashes, evidence markers, and risk classifications.
          </p>
        </div>

        <button
          onClick={fetchHistory}
          className="px-3.5 py-1.5 rounded-lg border border-[#DCE3EB] bg-[#FFFFFF] hover:bg-[#F5F7FA] text-[#344054] text-xs font-semibold transition flex items-center gap-1.5 shadow-2xs"
        >
          <RefreshCw className="h-3.5 w-3.5" />
          Refresh Log
        </button>
      </div>

      {/* Filters & Search */}
      <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-4 shadow-xs flex flex-wrap items-center justify-between gap-4">
        {/* Search Input */}
        <form onSubmit={handleSearchSubmit} className="flex-1 min-w-[240px]">
          <div className="relative">
            <Search className="absolute left-3.5 top-2.5 h-4 w-4 text-[#667085]" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by URL, UPI ID, or filename..."
              className="w-full rounded-lg border border-[#DCE3EB] bg-[#FFFFFF] pl-10 pr-4 py-2 text-xs text-[#172B4D] placeholder-[#667085] focus:border-[#287C78] focus:outline-none"
            />
          </div>
        </form>

        {/* Filters */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          {/* Type Filter */}
          <select
            value={scanType}
            onChange={(e) => setScanType(e.target.value)}
            className="rounded-lg border border-[#DCE3EB] bg-[#FFFFFF] px-3 py-2 text-[#344054] focus:border-[#287C78] focus:outline-none text-xs"
          >
            <option value="all">All Modules</option>
            <option value="upi">UPI Addresses</option>
            <option value="qr">QR Codes</option>
            <option value="url">Phishing URLs</option>
            <option value="deepfake">Deepfake Media</option>
            <option value="message">Messages & SMS</option>
            <option value="audio">Audio Forensics</option>
          </select>

          {/* Risk Level Filter */}
          <select
            value={riskLevel}
            onChange={(e) => setRiskLevel(e.target.value)}
            className="rounded-lg border border-[#DCE3EB] bg-[#FFFFFF] px-3 py-2 text-[#344054] focus:border-[#287C78] focus:outline-none text-xs"
          >
            <option value="all">All Risk Levels</option>
            <option value="HIGH">High Risk Only</option>
            <option value="MEDIUM">Medium Risk</option>
            <option value="LOW">Low Risk</option>
          </select>
        </div>
      </div>

      {/* Table Container */}
      <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] overflow-hidden shadow-xs">
        {loading ? (
          <div className="py-16 text-center text-xs text-[#667085]">Loading audit history...</div>
        ) : records.length === 0 ? (
          <div className="py-16 text-center text-xs text-[#667085]">
            No matching scan records found. Run a new scan from the dashboard to populate history.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-[#344054]">
              <thead className="border-b border-[#DCE3EB] bg-[#F5F7FA] text-[11px] uppercase tracking-wider text-[#667085]">
                <tr>
                  <th className="py-3 px-4 font-semibold">Asset / Target Summary</th>
                  <th className="py-3 px-4 font-semibold">Module</th>
                  <th className="py-3 px-4 font-semibold">Risk Classification</th>
                  <th className="py-3 px-4 font-semibold">Confidence</th>
                  <th className="py-3 px-4 font-semibold">Date & Time</th>
                  <th className="py-3 px-4 font-semibold text-right">Detailed Report</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#DCE3EB]">
                {records.map((r) => (
                  <tr key={r.id} className="hover:bg-[#F5F7FA] transition">
                    <td className="py-3 px-4 font-medium text-[#172B4D] max-w-[240px] truncate">
                      {r.target_summary}
                    </td>
                    <td className="py-3 px-4 uppercase text-[10px] text-[#667085] font-semibold">
                      {r.scan_type}
                    </td>
                    <td className="py-3 px-4">
                      <RiskBadge level={r.risk_level} size="sm" />
                    </td>
                    <td className="py-3 px-4 text-[#667085]">
                      {r.confidence_score ? `${Math.round(r.confidence_score * 100)}%` : 'Calibrated'}
                    </td>
                    <td className="py-3 px-4 text-[#667085] text-[11px]">
                      {r.created_at ? new Date(r.created_at).toLocaleString() : 'Recent'}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to={`/report/${r.id}`}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-[#287C78] hover:text-[#1f6360]"
                      >
                        <span>Open Report</span>
                        <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
