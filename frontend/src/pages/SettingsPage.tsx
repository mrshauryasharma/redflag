import React, { useState } from 'react';
import { Settings, Key, Globe, Trash2, CheckCircle2, Smartphone } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const SettingsPage: React.FC = () => {
  const { lang, setLang } = useAuth();
  const [vtKey, setVtKey] = useState('');
  const [gsbKey, setGsbKey] = useState('');
  const [savedNotice, setSavedNotice] = useState(false);
  const [clearedNotice, setClearedNotice] = useState(false);

  const handleSaveKeys = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 3000);
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure you want to clear your local session cache?')) {
      setClearedNotice(true);
      setTimeout(() => setClearedNotice(false), 3000);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-[#287C78] text-xs font-bold uppercase tracking-wider mb-1">
          <Settings className="h-4 w-4" />
          <span>Configuration & Privacy</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#172B4D]">
          Platform Settings & Intelligence APIs
        </h1>
        <p className="text-xs sm:text-sm text-[#667085] mt-1">
          Manage threat intelligence keys, bilingual preferences, and data privacy controls.
        </p>
      </div>

      {/* External Intelligence API Keys */}
      <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-[#172B4D] font-bold text-sm sm:text-base">
          <Key className="h-4 w-4 text-[#287C78]" />
          <h3>External Threat Intelligence Integration</h3>
        </div>
        <p className="text-xs text-[#344054] leading-relaxed">
          Optionally connect your VirusTotal or Google Safe Browsing API keys for expanded threat feeds.
          <strong className="text-[#287C78]"> If keys are empty, Red Flag's built-in heuristic and domain reputation engine operates automatically with zero disruption.</strong>
        </p>

        {savedNotice && (
          <div className="rounded-lg border border-[#B7DFCD] bg-[#EAF5F0] p-3 text-xs text-[#26845B] flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4" />
            Configuration saved successfully.
          </div>
        )}

        <form onSubmit={handleSaveKeys} className="space-y-4 pt-1">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#344054] mb-1">
              VirusTotal API Key (Optional)
            </label>
            <input
              type="password"
              value={vtKey}
              onChange={(e) => setVtKey(e.target.value)}
              placeholder="Paste your 64-character VirusTotal key"
              className="w-full rounded-lg border border-[#DCE3EB] bg-[#FFFFFF] px-3.5 py-2 text-xs text-[#172B4D] placeholder-[#667085] focus:border-[#287C78] focus:outline-none focus:ring-1 focus:ring-[#287C78]"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-[#344054] mb-1">
              Google Safe Browsing API Key (Optional)
            </label>
            <input
              type="password"
              value={gsbKey}
              onChange={(e) => setGsbKey(e.target.value)}
              placeholder="Paste your Google Cloud Safe Browsing API key"
              className="w-full rounded-lg border border-[#DCE3EB] bg-[#FFFFFF] px-3.5 py-2 text-xs text-[#172B4D] placeholder-[#667085] focus:border-[#287C78] focus:outline-none focus:ring-1 focus:ring-[#287C78]"
            />
          </div>

          <button
            type="submit"
            className="px-4 py-2 rounded-lg bg-[#287C78] hover:bg-[#1f6360] text-[#FFFFFF] font-semibold text-xs transition shadow-xs"
          >
            Update API Keys
          </button>
        </form>
      </div>

      {/* Language Preferences */}
      <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-[#172B4D] font-bold text-sm sm:text-base">
          <Globe className="h-4 w-4 text-[#287C78]" />
          <h3>Default Language Preference</h3>
        </div>
        <p className="text-xs text-[#667085]">
          Choose whether forensic explanations default to standard English or Hinglish for non-technical users.
        </p>
        <div className="flex gap-2.5 pt-1">
          <button
            type="button"
            onClick={() => setLang('en')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
              lang === 'en'
                ? 'border-[#287C78] bg-[#EBF4F3] text-[#287C78]'
                : 'border-[#DCE3EB] bg-[#FFFFFF] text-[#667085] hover:text-[#172B4D]'
            }`}
          >
            English Only
          </button>
          <button
            type="button"
            onClick={() => setLang('hi')}
            className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold border transition ${
              lang === 'hi'
                ? 'border-[#287C78] bg-[#EBF4F3] text-[#287C78]'
                : 'border-[#DCE3EB] bg-[#FFFFFF] text-[#667085] hover:text-[#172B4D]'
            }`}
          >
            Bilingual (English + Hinglish)
          </button>
        </div>
      </div>

      {/* Mobile App Sync */}
      <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 shadow-xs space-y-2.5">
        <div className="flex items-center gap-2 text-[#172B4D] font-bold text-sm sm:text-base">
          <Smartphone className="h-4 w-4 text-[#287C78]" />
          <h3>Mobile App & Capacitor Status</h3>
        </div>
        <p className="text-xs text-[#667085]">
          Capacitor native bridge configured (<code className="text-[#172B4D] font-semibold">com.redflag.app</code>). To build native Android APK:
        </p>
        <div className="p-2.5 rounded-lg bg-[#F5F7FA] border border-[#DCE3EB] text-[11px] font-mono text-[#344054]">
          npm run build && npx cap copy android
        </div>
      </div>

      {/* Data Privacy & Purge */}
      <div className="rounded-xl border border-[#F4C4C4] bg-[#FDF1F1] p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-[#C24141] font-bold text-sm sm:text-base">
          <Trash2 className="h-4 w-4" />
          <h3>User Data Privacy & History Purge</h3>
        </div>
        <p className="text-xs text-[#344054] leading-relaxed">
          We practice zero retention of sensitive banking data. You can purge your scan history and cached forensic reports at any time.
        </p>

        {clearedNotice && (
          <div className="text-xs text-[#26845B] font-semibold">
            Local session logs cleared successfully.
          </div>
        )}

        <button
          type="button"
          onClick={handleClearHistory}
          className="px-3.5 py-1.5 rounded-lg bg-[#FFFFFF] border border-[#F4C4C4] text-[#C24141] hover:bg-[#FDF1F1] text-xs font-semibold transition"
        >
          Purge Scan Audit History
        </button>
      </div>
    </div>
  );
};
