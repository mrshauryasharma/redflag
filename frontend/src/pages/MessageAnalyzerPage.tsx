import React, { useState } from 'react';
import { MessageSquareWarning, Upload, FileText, AlertCircle, Loader2 } from 'lucide-react';
import { scanMessage } from '../services/api';
import type { ScanResult } from '../services/api';
import { ResultCard } from '../components/ResultCard';

export const MessageAnalyzerPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'text' | 'screenshot'>('text');
  const [text, setText] = useState('');
  const [screenshotFile, setScreenshotFile] = useState<File | null>(null);
  const [screenshotPreview, setScreenshotPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [result, setResult] = useState<ScanResult | null>(null);

  const PRESET_MESSAGES = [
    {
      label: 'Digital Arrest Threat',
      text: 'This is Mumbai Police & CBI headquarters. A parcel in your Aadhaar name containing narcotics has been seized at airport customs. A non-bailable arrest warrant has been issued. Join Skype surveillance immediately to clear charges.',
    },
    {
      label: 'Electricity Power Cut',
      text: 'Dear consumer your electricity power will be disconnected tonight at 9.30 PM from electricity office because your previous month bill was not updated. Call our electricity officer Rahul Verma at 8927163829 immediately.',
    },
    {
      label: 'Telegram Task Scam',
      text: 'Hello, earn Rs 3000-5000 daily from home. Simply like YouTube videos and review hotels on Google. We paid you Rs 150 trial bonus! Now join our Telegram VIP task channel and make refundable deposit of Rs 2500.',
    },
    {
      label: 'KYC Blocked Alert',
      text: 'Dear SBI User, your YONO account has been suspended due to pending PAN card verification. Download sbi-kyc-update.apk from http://sbi-unblock.xyz/kyc to avoid permanent deactivation.',
    },
  ];

  const handleScanText = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) {
      setError('Please enter message text or select a preset.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('text', text.trim());
      const res = await scanMessage(formData);
      setResult(res);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Message analysis failed.');
    } finally {
      setLoading(false);
    }
  };

  const handleScreenshotChange = (file: File) => {
    setError('');
    setResult(null);
    setScreenshotFile(file);
    setScreenshotPreview(URL.createObjectURL(file));
  };

  const handleScanScreenshot = async () => {
    if (!screenshotFile) {
      setError('Please upload an image screenshot of an SMS or WhatsApp chat.');
      return;
    }
    setError('');
    setLoading(true);
    setResult(null);

    try {
      const formData = new FormData();
      formData.append('file', screenshotFile);
      if (text.trim()) formData.append('text', text.trim());
      const res = await scanMessage(formData);
      setResult(res);
    } catch (err: any) {
      setError(err.response?.data?.detail || 'Screenshot OCR inspection failed.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-[#287C78] text-xs font-bold uppercase tracking-wider mb-1">
          <MessageSquareWarning className="h-4 w-4" />
          <span>Module 04: Social Engineering & NLP Engine</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#172B4D]">
          Scam Message & Voice Analyzer
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] mt-1">
          Analyze suspicious WhatsApp texts, fake KYC SMS, police digital arrest threats, and audio notes with clear English and Hinglish explanations.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#DCE3EB] gap-4">
        <button
          onClick={() => { setActiveTab('text'); setResult(null); }}
          className={`pb-2.5 text-xs sm:text-sm font-semibold transition border-b-2 flex items-center gap-1.5 ${
            activeTab === 'text' ? 'border-[#287C78] text-[#287C78]' : 'border-transparent text-[#667085] hover:text-[#172B4D]'
          }`}
        >
          <FileText className="h-4 w-4" />
          Text / Email Content
        </button>
        <button
          onClick={() => { setActiveTab('screenshot'); setResult(null); }}
          className={`pb-2.5 text-xs sm:text-sm font-semibold transition border-b-2 flex items-center gap-1.5 ${
            activeTab === 'screenshot' ? 'border-[#287C78] text-[#287C78]' : 'border-transparent text-[#667085] hover:text-[#172B4D]'
          }`}
        >
          <Upload className="h-4 w-4" />
          Screenshot OCR (SMS / WhatsApp)
        </button>
      </div>

      {/* TAB 1: Text message */}
      {activeTab === 'text' && (
        <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 space-y-4 shadow-xs">
          <form onSubmit={handleScanText} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#344054] mb-1">
                Paste Suspicious Message Text
              </label>
              <textarea
                rows={5}
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Paste the SMS, WhatsApp text, email, or job offer here..."
                className="w-full rounded-lg border border-[#DCE3EB] bg-[#FFFFFF] p-3.5 text-xs sm:text-sm text-[#172B4D] placeholder-[#667085] focus:border-[#287C78] focus:outline-none focus:ring-1 focus:ring-[#287C78]"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !text.trim()}
              className="w-full rounded-lg bg-[#287C78] hover:bg-[#1f6360] py-3 text-xs sm:text-sm font-semibold text-[#FFFFFF] transition shadow-xs disabled:opacity-40 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Analyzing Social Engineering Patterns...
                </>
              ) : (
                'Run Message Threat Analysis'
              )}
            </button>
          </form>

          {/* Presets */}
          <div className="pt-3 border-t border-[#DCE3EB]">
            <span className="text-[11px] font-semibold uppercase tracking-wider text-[#667085] block mb-2">
              Common Fraud Examples:
            </span>
            <div className="flex flex-wrap gap-2">
              {PRESET_MESSAGES.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setText(p.text)}
                  className="rounded-md border border-[#DCE3EB] bg-[#F5F7FA] px-2.5 py-1 text-xs text-[#344054] hover:border-[#287C78] hover:text-[#287C78] transition"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Screenshot OCR */}
      {activeTab === 'screenshot' && (
        <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 space-y-4 shadow-xs text-center">
          <div className="rounded-xl border-2 border-dashed border-[#DCE3EB] p-8 hover:border-[#287C78] transition cursor-pointer">
            <input
              type="file"
              id="msgScreenshotUpload"
              className="hidden"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && handleScreenshotChange(e.target.files[0])}
            />
            <label htmlFor="msgScreenshotUpload" className="cursor-pointer block">
              <Upload className="h-9 w-9 text-[#287C78] mx-auto mb-2.5" />
              <span className="text-xs sm:text-sm font-bold text-[#172B4D] block">
                {screenshotFile ? screenshotFile.name : 'Upload Chat Screenshot'}
              </span>
              <span className="text-[11px] text-[#667085]">
                Supports WhatsApp, Telegram, SMS, or Email screenshots (PNG, JPG)
              </span>
            </label>

            {screenshotPreview && (
              <img
                src={screenshotPreview}
                alt="Screenshot preview"
                className="mt-4 max-h-56 mx-auto rounded-lg border border-[#DCE3EB]"
              />
            )}
          </div>

          <button
            onClick={handleScanScreenshot}
            disabled={loading || !screenshotFile}
            className="w-full rounded-lg bg-[#287C78] hover:bg-[#1f6360] py-3 text-xs sm:text-sm font-semibold text-[#FFFFFF] transition shadow-xs disabled:opacity-40 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Extracting Text & Scoring Intent...
              </>
            ) : (
              'Extract Text & Scan Screenshot'
            )}
          </button>
        </div>
      )}

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
            setText('');
            setScreenshotFile(null);
            setScreenshotPreview(null);
            setResult(null);
          }}
        />
      )}
    </div>
  );
};
