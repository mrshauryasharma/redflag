import React from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import {
  Flag,
  Eye,
  CreditCard,
  Globe,
  MessageSquareWarning,
  Gamepad2,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Zap,
  ChevronRight,
  Shield,
  FileCheck
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-[#FFFFFF] text-[#172B4D] flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <section className="relative px-4 pt-16 pb-20 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center flex-1 flex flex-col justify-center">
        <div className="inline-flex items-center gap-2 rounded-full border border-[#DCE3EB] bg-[#F5F7FA] px-4 py-1.5 text-xs font-semibold text-[#287C78] mb-6 mx-auto">
          <Flag className="h-3.5 w-3.5 text-[#287C78]" />
          <span>AI-Powered Digital Fraud Prevention Platform</span>
        </div>

        <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-[#172B4D] max-w-4xl mx-auto leading-tight">
          Think Before You Trust. <br />
          <span className="text-[#287C78]">
            Verify Before You Pay.
          </span>
        </h1>

        <p className="mt-5 text-sm sm:text-base text-[#344054] max-w-2xl mx-auto leading-relaxed">
          Red Flag is an all-in-one digital fraud prevention platform designed to help users identify suspicious digital content before trusting it or making payments. Verify suspicious videos, voice recordings, phishing URLs, UPI payment requests, QR codes, SMS, and WhatsApp messages.
        </p>

        {/* CTA Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <Link
            to="/dashboard"
            className="px-6 py-3 rounded-lg bg-[#287C78] hover:bg-[#1f6360] text-[#FFFFFF] font-semibold text-xs sm:text-sm transition shadow-sm flex items-center gap-2"
          >
            Launch Red Flag
            <ArrowRight className="h-4 w-4" />
          </Link>
          <Link
            to="/simulator"
            className="px-6 py-3 rounded-lg border border-[#DCE3EB] bg-[#FFFFFF] hover:bg-[#F5F7FA] text-[#172B4D] font-semibold text-xs sm:text-sm transition flex items-center gap-2"
          >
            <Gamepad2 className="h-4 w-4 text-[#287C78]" />
            Scam Simulator
          </Link>
        </div>

        {/* Trust Badges */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-[#667085]">
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#26845B]" />
            <span>Zero Credential Collection (No PIN, OTP, Passwords)</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#287C78]" />
            <span>Evidence-Based Risk Scoring</span>
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle2 className="h-4 w-4 text-[#26845B]" />
            <span>Bilingual Explanations (English & Hinglish)</span>
          </div>
        </div>
      </section>

      {/* Clean Security Notice Banner */}
      <div className="border-y border-[#DCE3EB] bg-[#F5F7FA] py-3.5 select-none">
        <div className="max-w-7xl mx-auto px-4 flex flex-wrap items-center justify-around gap-4 text-xs font-medium text-[#344054]">
          <span className="flex items-center gap-1.5 text-[#C24141]">
            <AlertTriangle className="h-3.5 w-3.5" /> High Alert: Digital Arrest Video Scams
          </span>
          <span className="hidden sm:flex items-center gap-1.5 text-[#B7791F]">
            Warning: Fake Electricity Disconnection SMS
          </span>
          <span className="hidden md:flex items-center gap-1.5 text-[#3975A8]">
            Rule: Never enter UPI PIN to receive money
          </span>
          <span className="flex items-center gap-1.5 text-[#26845B]">
            Active: Optical FFT & Spectral Media Forensics
          </span>
        </div>
      </div>

      {/* Feature Modules Overview */}
      <section id="features" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-[#FFFFFF]">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <h2 className="text-xs uppercase font-bold tracking-widest text-[#287C78] mb-2">Core Capabilities</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#172B4D]">Six Unified Fraud Prevention Modules</p>
          <p className="mt-2 text-[#667085] text-xs sm:text-sm">
            A single platform to verify suspicious digital content across video, audio, payments, links, and messages.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {/* Module 1 */}
          <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 shadow-xs hover:border-[#287C78] transition">
            <div className="h-10 w-10 rounded-lg bg-[#EBF4F3] border border-[#DCE3EB] flex items-center justify-center text-[#287C78] mb-4">
              <Eye className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#172B4D] mb-1.5">Deepfake Detector</h3>
            <p className="text-xs text-[#344054] leading-relaxed">
              Upload videos, images, and voice recordings. Evaluates facial boundary warping, unnatural edge smoothing, and synthetic acoustic frequency cutoffs.
            </p>
            <Link to="/deepfake" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#287C78] hover:text-[#1f6360]">
              Open Forensic Lab <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Module 2 */}
          <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 shadow-xs hover:border-[#287C78] transition">
            <div className="h-10 w-10 rounded-lg bg-[#EBF4F3] border border-[#DCE3EB] flex items-center justify-center text-[#287C78] mb-4">
              <CreditCard className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#172B4D] mb-1.5">UPI & QR Safety Checker</h3>
            <p className="text-xs text-[#344054] leading-relaxed">
              Verify UPI addresses and decode QR codes. Detects fake customer care impersonation, merchant mismatches, and fraudulent collect requests.
            </p>
            <Link to="/upi-checker" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#287C78] hover:text-[#1f6360]">
              Check UPI Safety <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Module 3 */}
          <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 shadow-xs hover:border-[#287C78] transition">
            <div className="h-10 w-10 rounded-lg bg-[#EBF4F3] border border-[#DCE3EB] flex items-center justify-center text-[#287C78] mb-4">
              <Globe className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#172B4D] mb-1.5">Phishing Link Analyzer</h3>
            <p className="text-xs text-[#344054] leading-relaxed">
              Server-side safe inspection of suspicious URLs. Detects brand typosquatting, disposable TLDs (.xyz, .top), and deceptive banking subdomain hops.
            </p>
            <Link to="/phishing" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#287C78] hover:text-[#1f6360]">
              Analyze URL Safely <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Module 4 */}
          <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 shadow-xs hover:border-[#287C78] transition">
            <div className="h-10 w-10 rounded-lg bg-[#EBF4F3] border border-[#DCE3EB] flex items-center justify-center text-[#287C78] mb-4">
              <MessageSquareWarning className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#172B4D] mb-1.5">Message & Voice Analyzer</h3>
            <p className="text-xs text-[#344054] leading-relaxed">
              Paste SMS, WhatsApp messages, or screenshot uploads. Classifies Digital Arrest threats, KYC traps, Telegram jobs, and fake couriers with Hinglish insights.
            </p>
            <Link to="/message-analyzer" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#287C78] hover:text-[#1f6360]">
              Inspect Message <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Module 5 */}
          <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 shadow-xs hover:border-[#287C78] transition">
            <div className="h-10 w-10 rounded-lg bg-[#EBF4F3] border border-[#DCE3EB] flex items-center justify-center text-[#287C78] mb-4">
              <Gamepad2 className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#172B4D] mb-1.5">Interactive Scam Simulator</h3>
            <p className="text-xs text-[#344054] leading-relaxed">
              Cybersecurity education through gamified realistic simulations. Practice identifying fake bank SMS, voice cloning emergencies, and UPI traps risk-free.
            </p>
            <Link to="/simulator" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#287C78] hover:text-[#1f6360]">
              Start Challenges <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Module 6 */}
          <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 shadow-xs hover:border-[#287C78] transition">
            <div className="h-10 w-10 rounded-lg bg-[#EBF4F3] border border-[#DCE3EB] flex items-center justify-center text-[#287C78] mb-4">
              <FileCheck className="h-5 w-5" />
            </div>
            <h3 className="text-base font-bold text-[#172B4D] mb-1.5">Dashboard & Scan History</h3>
            <p className="text-xs text-[#344054] leading-relaxed">
              Personalized audit logs, threat interception metrics, downloadable forensic reports, and persistent telemetry tracking across web and mobile.
            </p>
            <Link to="/dashboard" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#287C78] hover:text-[#1f6360]">
              View Dashboard <ChevronRight className="h-3 w-3" />
            </Link>
          </div>
        </div>
      </section>

      {/* How it Works */}
      <section id="how-it-works" className="py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full bg-[#F5F7FA] border-t border-[#DCE3EB]">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="text-xs uppercase font-bold tracking-widest text-[#287C78] mb-2">Workflow</h2>
          <p className="text-2xl sm:text-3xl font-extrabold text-[#172B4D]">How Red Flag Protects You</p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 text-center shadow-xs">
            <div className="h-9 w-9 rounded-full bg-[#EBF4F3] text-[#287C78] font-bold flex items-center justify-center mx-auto mb-3.5 border border-[#DCE3EB] text-sm">
              1
            </div>
            <h4 className="font-bold text-[#172B4D] text-sm mb-1.5">Submit Digital Asset</h4>
            <p className="text-xs text-[#344054] leading-relaxed">
              Provide any video, voice audio, UPI handle, QR code, phishing URL, or message screenshot.
            </p>
          </div>

          <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 text-center shadow-xs">
            <div className="h-9 w-9 rounded-full bg-[#EBF4F3] text-[#287C78] font-bold flex items-center justify-center mx-auto mb-3.5 border border-[#DCE3EB] text-sm">
              2
            </div>
            <h4 className="font-bold text-[#172B4D] text-sm mb-1.5">Multi-Factor Heuristic Scan</h4>
            <p className="text-xs text-[#344054] leading-relaxed">
              Engines analyze metadata, optical frequency artifacts, NPCI handle legitimacy, typosquatting, and social engineering patterns.
            </p>
          </div>

          <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-6 text-center shadow-xs">
            <div className="h-9 w-9 rounded-full bg-[#EBF4F3] text-[#287C78] font-bold flex items-center justify-center mx-auto mb-3.5 border border-[#DCE3EB] text-sm">
              3
            </div>
            <h4 className="font-bold text-[#172B4D] text-sm mb-1.5">Clear Actionable Verdict</h4>
            <p className="text-xs text-[#344054] leading-relaxed">
              Receive an evidence-based Risk Rating (Low, Medium, High) with simple English and Hinglish explanations and safety recommendations.
            </p>
          </div>
        </div>
      </section>

      {/* Simulator Preview Banner */}
      <section className="py-14 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="rounded-2xl border border-[#DCE3EB] bg-[#F5F7FA] p-8 sm:p-10 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-xl">
            <span className="text-xs font-bold uppercase tracking-wider text-[#287C78]">Cyber Awareness Training</span>
            <h3 className="text-xl sm:text-2xl font-bold text-[#172B4D] mt-1">
              Train Your Scam Detection Reflexes
            </h3>
            <p className="text-[#344054] text-xs sm:text-sm mt-2 leading-relaxed">
              Test your skills against real-world scenarios: Fake CBI digital arrest video calls, OLX QR code traps, and AI voice cloning emergencies.
            </p>
            <div className="mt-5">
              <Link
                to="/simulator"
                className="inline-flex px-5 py-2.5 rounded-lg bg-[#287C78] hover:bg-[#1f6360] text-[#FFFFFF] font-semibold text-xs transition"
              >
                Launch Simulator
              </Link>
            </div>
          </div>
          <div className="h-24 w-24 rounded-xl bg-[#FFFFFF] border border-[#DCE3EB] flex items-center justify-center text-[#287C78] shrink-0 shadow-xs">
            <Gamepad2 className="h-12 w-12" />
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[#DCE3EB] bg-[#FFFFFF] py-6 text-xs text-[#667085]">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Flag className="h-3.5 w-3.5 text-[#287C78]" />
            <span className="font-semibold text-[#172B4D]">Red Flag</span>
            <span>— Think Before You Trust. Verify Before You Pay.</span>
          </div>
          <div>
            <span>Zero Credential Collection • Safe Heuristic Processing</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
