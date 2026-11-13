import React, { useState } from 'react';
import { RiskBadge } from './RiskBadge';
import { Shield, AlertCircle, CheckCircle2, Info, Share2, Printer, Languages } from 'lucide-react';
import type { ScanResult } from '../services/api';

interface ResultCardProps {
  result: ScanResult;
  onReset?: () => void;
}

export const ResultCard: React.FC<ResultCardProps> = ({ result, onReset }) => {
  const [activeLang, setActiveLang] = useState<'both' | 'en' | 'hi'>('both');
  const [copied, setCopied] = useState(false);

  const handleShare = () => {
    navigator.clipboard.writeText(
      `🚩 Red Flag Security Report [ID: ${result.scan_id}]\nRisk Level: ${result.risk_level}\n${result.explanation_en}\nVerified with Red Flag.`
    );
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const isHigh = result.risk_level === 'HIGH';
  const isMed = result.risk_level === 'MEDIUM';

  const statusBorder = isHigh ? 'border-[#F4C4C4]' : isMed ? 'border-[#F3DCB5]' : 'border-[#B7DFCD]';
  const statusBg = isHigh ? 'bg-[#FDF1F1]' : isMed ? 'bg-[#FDF6EC]' : 'bg-[#EAF5F0]';
  const statusIconColor = isHigh ? 'text-[#C24141]' : isMed ? 'text-[#B7791F]' : 'text-[#26845B]';

  return (
    <div className="mt-6 rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 shadow-sm">
      {/* Header */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#DCE3EB] pb-5">
        <div className="flex items-center gap-3">
          <div className={`p-2.5 rounded-lg border ${statusBorder} ${statusBg} ${statusIconColor}`}>
            <Shield className="h-5 w-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085]">Verification Verdict</span>
              <span className="text-[11px] text-[#667085]">• ID: {result.scan_id || 'LOCAL-SCAN'}</span>
            </div>
            <div className="mt-1 flex items-center gap-2.5">
              <RiskBadge level={result.risk_level} size="lg" />
            </div>
          </div>
        </div>

        {/* Confidence Box */}
        <div className="flex items-center gap-4 bg-[#F5F7FA] px-4 py-2.5 rounded-lg border border-[#DCE3EB]">
          <div>
            <div className="text-[11px] uppercase tracking-wider text-[#667085] font-medium">Model Confidence</div>
            <div className="text-base font-bold text-[#172B4D]">
              {result.confidence_score ? `${Math.round(result.confidence_score * 100)}%` : 'Calibrated'}
            </div>
          </div>
          <div className="flex items-center gap-1.5 border-l border-[#DCE3EB] pl-3">
            <button
              onClick={handleShare}
              className="p-1.5 rounded-md text-[#344054] hover:text-[#172B4D] hover:bg-[#FFFFFF] border border-transparent hover:border-[#DCE3EB] transition"
              title="Copy Report"
            >
              <Share2 className="h-4 w-4" />
            </button>
            <button
              onClick={() => window.print()}
              className="p-1.5 rounded-md text-[#344054] hover:text-[#172B4D] hover:bg-[#FFFFFF] border border-transparent hover:border-[#DCE3EB] transition"
              title="Print Report"
            >
              <Printer className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {copied && (
        <div className="mt-3 text-xs text-[#26845B] bg-[#EAF5F0] border border-[#B7DFCD] px-3 py-2 rounded-lg flex items-center gap-2">
          <CheckCircle2 className="h-3.5 w-3.5" />
          Report copied to clipboard! Share it with family or colleagues to prevent fraud.
        </div>
      )}

      {/* Language Selector */}
      <div className="mt-5 flex items-center justify-between">
        <span className="text-xs font-semibold uppercase tracking-wider text-[#344054] flex items-center gap-1.5">
          <Languages className="h-3.5 w-3.5 text-[#287C78]" />
          Bilingual Forensic Analysis
        </span>
        <div className="flex gap-1 bg-[#F5F7FA] p-1 rounded-lg border border-[#DCE3EB] text-xs">
          <button
            onClick={() => setActiveLang('both')}
            className={`px-2.5 py-1 rounded-md transition font-medium ${activeLang === 'both' ? 'bg-[#FFFFFF] text-[#172B4D] shadow-sm border border-[#DCE3EB]' : 'text-[#667085] hover:text-[#172B4D]'}`}
          >
            All
          </button>
          <button
            onClick={() => setActiveLang('en')}
            className={`px-2.5 py-1 rounded-md transition font-medium ${activeLang === 'en' ? 'bg-[#FFFFFF] text-[#172B4D] shadow-sm border border-[#DCE3EB]' : 'text-[#667085] hover:text-[#172B4D]'}`}
          >
            English
          </button>
          <button
            onClick={() => setActiveLang('hi')}
            className={`px-2.5 py-1 rounded-md transition font-medium ${activeLang === 'hi' ? 'bg-[#FFFFFF] text-[#172B4D] shadow-sm border border-[#DCE3EB]' : 'text-[#667085] hover:text-[#172B4D]'}`}
          >
            Hinglish
          </button>
        </div>
      </div>

      {/* Explanations Grid */}
      <div className="mt-3 grid gap-3 md:grid-cols-2">
        {(activeLang === 'both' || activeLang === 'en') && (
          <div className="rounded-lg border border-[#DCE3EB] bg-[#F5F7FA] p-4">
            <div className="text-xs font-semibold text-[#172B4D] mb-1.5">
              🇬🇧 English Explanation
            </div>
            <p className="text-sm leading-relaxed text-[#344054]">
              {result.explanation_en}
            </p>
          </div>
        )}

        {(activeLang === 'both' || activeLang === 'hi') && (
          <div className="rounded-lg border border-[#DCE3EB] bg-[#F5F7FA] p-4">
            <div className="text-xs font-semibold text-[#172B4D] mb-1.5">
              🇮🇳 Hinglish Explanation
            </div>
            <p className="text-sm leading-relaxed text-[#344054]">
              {result.explanation_hi}
            </p>
          </div>
        )}
      </div>

      {/* Detected Evidence Indicators */}
      <div className="mt-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#344054] mb-2.5 flex items-center gap-1.5">
          <AlertCircle className="h-4 w-4 text-[#3975A8]" />
          Detected Risk Indicators & Evidence
        </h4>
        <div className="space-y-2">
          {result.detected_indicators && result.detected_indicators.length > 0 ? (
            result.detected_indicators.map((ind, i) => (
              <div key={i} className="flex items-start gap-2.5 text-xs text-[#344054] bg-[#F5F7FA] border border-[#DCE3EB] rounded-lg px-3.5 py-2.5">
                <span className="text-[#287C78] font-bold mt-0.5">•</span>
                <span>{ind}</span>
              </div>
            ))
          ) : (
            <div className="text-xs text-[#667085] bg-[#F5F7FA] p-3 rounded-lg border border-[#DCE3EB]">
              No anomalous threat signals detected.
            </div>
          )}
        </div>
      </div>

      {/* Recommended Actions */}
      <div className="mt-5">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-[#172B4D] mb-2.5 flex items-center gap-1.5">
          <CheckCircle2 className="h-4 w-4 text-[#26845B]" />
          Recommended Actions
        </h4>
        <div className="grid gap-2 sm:grid-cols-2">
          {result.recommended_actions && result.recommended_actions.map((act, i) => (
            <div key={i} className="flex items-start gap-2 rounded-lg bg-[#EAF5F0] border border-[#B7DFCD] p-3 text-xs text-[#172B4D]">
              <span className="font-bold text-[#26845B]">{i + 1}.</span>
              <span>{act}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Disclaimers & Limitations */}
      <div className="mt-5 border-t border-[#DCE3EB] pt-4 flex items-start gap-2 text-xs text-[#667085]">
        <Info className="h-4 w-4 shrink-0 text-[#3975A8] mt-0.5" />
        <div>
          <span className="font-semibold text-[#344054]">Detection Limitations: </span>
          {result.limitations || "Evidence-based heuristic evaluation. Does not guarantee absolute immunity against novel zero-day attack vectors."}
        </div>
      </div>

      {onReset && (
        <div className="mt-6 flex justify-end">
          <button
            onClick={onReset}
            className="px-4 py-2 text-xs rounded-lg bg-[#287C78] hover:bg-[#1f6360] text-[#FFFFFF] font-semibold transition"
          >
            Scan Another Asset
          </button>
        </div>
      )}
    </div>
  );
};
