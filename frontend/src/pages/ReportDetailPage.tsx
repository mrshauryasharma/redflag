import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Printer, AlertCircle } from 'lucide-react';
import { getScanReport } from '../services/api';
import type { ScanResult } from '../services/api';
import { ResultCard } from '../components/ResultCard';

export const ReportDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [report, setReport] = useState<ScanResult | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    const fetchReport = async () => {
      setLoading(true);
      try {
        const data = await getScanReport(id);
        setReport(data);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'Report not found or expired.');
      } finally {
        setLoading(false);
      }
    };
    fetchReport();
  }, [id]);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto py-20 text-center text-xs text-[#667085]">
        Loading forensic report details...
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center space-y-4">
        <div className="h-12 w-12 rounded-full bg-[#FDF1F1] text-[#C24141] flex items-center justify-center mx-auto border border-[#F4C4C4]">
          <AlertCircle className="h-6 w-6" />
        </div>
        <h2 className="text-lg font-bold text-[#172B4D]">Report Not Found</h2>
        <p className="text-xs text-[#667085]">{error || 'This report may have been purged or does not exist.'}</p>
        <Link
          to="/history"
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#287C78] text-xs font-semibold text-[#FFFFFF] hover:bg-[#1f6360]"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to Scan History
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/history"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#667085] hover:text-[#172B4D] transition"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to History
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={() => window.print()}
            className="px-3 py-1.5 rounded-lg border border-[#DCE3EB] bg-[#FFFFFF] hover:bg-[#F5F7FA] text-xs text-[#344054] font-semibold flex items-center gap-1.5 shadow-2xs"
          >
            <Printer className="h-3.5 w-3.5" />
            Print Report
          </button>
        </div>
      </div>

      {/* Target Asset Card */}
      <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 shadow-xs">
        <div className="text-[10px] uppercase font-bold tracking-wider text-[#287C78] mb-1">
          Inspected Target
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-[#172B4D] break-all">
          {report.target_summary}
        </h2>
        <div className="mt-3 flex flex-wrap items-center gap-4 text-xs text-[#667085]">
          <span>Type: <strong className="text-[#172B4D] uppercase">{report.scan_type}</strong></span>
          <span>Timestamp: <strong className="text-[#172B4D]">{report.created_at ? new Date(report.created_at).toLocaleString() : 'N/A'}</strong></span>
          <span>Audit ID: <strong className="text-[#287C78]">{report.id}</strong></span>
        </div>
      </div>

      {/* Main Result Card */}
      <ResultCard result={report} />
    </div>
  );
};
