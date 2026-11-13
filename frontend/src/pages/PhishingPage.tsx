import React, { useState } from 'react';
import { Globe, Loader2, AlertCircle } from 'lucide-react';
import { scanUrl } from '../services/api';
import type { ScanResult } from '../services/api';
import { ResultCard } from '../components/ResultCard';

export const PhishingPage: React.FC = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);

  const PRESET_URLS = [
    { label: 'SBI Typosquatting Phish', link: 'https://sbi-login-verify-kyc.xyz' },
    { label: 'Income Tax Refund Trap', link: 'https://incometax-efiling-refund.top' },
    { label: 'Insecure Raw IP Host', link: 'http://185.192.110.42/bank-login' },
    { label: 'Legitimate SBI Portal', link: 'https://onlinesbi.sbi' },
  ];

  const handleScan = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!url.trim()) {
      setError('Please paste a link or domain to scan.');
      return;
    }

    setError('');
    setLoading(true);
    setResult(null);

    try {
      const res = await scanUrl(url.trim());
      setResult(res);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'URL inspection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-[#287C78] text-xs font-bold uppercase tracking-wider mb-1">
          <Globe className="h-4 w-4" />
          <span>Module 03: URL & Domain Intelligence</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#172B4D]">
          Phishing Link & Domain Analyzer
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] mt-1">
          Server-side safe reputation inspection. Exposes deceptive homograph attacks, typosquatting, and risky disposable TLDs without exposing your browser.
        </p>
      </div>

      {/* Input Box */}
      <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 space-y-4 shadow-xs">
        <form onSubmit={handleScan} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#344054] mb-1">
              Enter or Paste Suspicious URL
            </label>
            <div className="relative">
              <Globe className="absolute left-3.5 top-3.5 h-4 w-4 text-[#667085]" />
              <input
                type="text"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://secure-login-portal.xyz or bank-update.com"
                className="w-full rounded-lg border border-[#DCE3EB] bg-[#FFFFFF] pl-10 pr-4 py-2.5 text-xs sm:text-sm text-[#172B4D] placeholder-[#667085] focus:border-[#287C78] focus:outline-none focus:ring-1 focus:ring-[#287C78]"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading || !url.trim()}
            className="w-full rounded-lg bg-[#287C78] hover:bg-[#1f6360] py-3 text-xs sm:text-sm font-semibold text-[#FFFFFF] transition shadow-xs disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Analyzing TLD, SSL & Typosquatting Graph...
              </>
            ) : (
              'Run Safe Security Analysis'
            )}
          </button>
        </form>

        {/* Preset Chips */}
        <div className="pt-3 border-t border-[#DCE3EB]">
          <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block mb-2">
            Sample Scenarios:
          </span>
          <div className="flex flex-wrap gap-2">
            {PRESET_URLS.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setUrl(p.link)}
                className="rounded-md border border-[#DCE3EB] bg-[#F5F7FA] px-2.5 py-1 text-xs text-[#344054] hover:border-[#287C78] hover:text-[#287C78] transition"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-lg border border-[#F4C4C4] bg-[#FDF1F1] p-3.5 text-xs text-[#C24141] flex items-center gap-2">
          <AlertCircle className="h-4 w-4 shrink-0 text-[#C24141]" />
          <span>{error}</span>
        </div>
      )}

      {/* Result Card */}
      {result && (
        <ResultCard
          result={result}
          onReset={() => {
            setUrl('');
            setResult(null);
          }}
        />
      )}
    </div>
  );
};
