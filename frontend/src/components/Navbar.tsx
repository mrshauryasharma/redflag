import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Flag, Menu, X, Shield, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Navbar: React.FC = () => {
  const { isAuthenticated } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 border-b border-[#DCE3EB] bg-[#FFFFFF] shadow-xs">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-2.5">
          <div className="h-9 w-9 rounded-lg bg-[#287C78] flex items-center justify-center text-[#FFFFFF] shadow-xs">
            <Flag className="h-4 w-4" />
          </div>
          <div>
            <span className="text-lg font-bold tracking-tight text-[#172B4D]">
              RED <span className="text-[#287C78]">FLAG</span>
            </span>
            <span className="hidden sm:inline-block ml-2 text-[10px] uppercase font-semibold px-2 py-0.5 rounded-md bg-[#F5F7FA] text-[#344054] border border-[#DCE3EB]">
              Security Platform
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-6 text-xs font-semibold text-[#344054]">
          <Link to="/#features" className="hover:text-[#287C78] transition">Defense Modules</Link>
          <Link to="/#how-it-works" className="hover:text-[#287C78] transition">How It Works</Link>
          <Link to="/simulator" className="hover:text-[#287C78] transition">Scam Simulator</Link>
          {isAuthenticated && (
            <Link to="/dashboard" className="text-[#287C78] hover:text-[#1f6360] font-semibold flex items-center gap-1.5">
              <Shield className="h-3.5 w-3.5" />
              Console
            </Link>
          )}
        </nav>

        {/* CTA / Auth Buttons */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <Link
              to="/dashboard"
              className="px-4 py-2 rounded-lg bg-[#287C78] hover:bg-[#1f6360] text-[#FFFFFF] font-semibold text-xs transition shadow-xs flex items-center gap-1.5"
            >
              <span>Security Dashboard</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          ) : (
            <div className="flex items-center gap-2">
              <Link
                to="/login"
                className="px-3.5 py-1.5 rounded-lg border border-[#DCE3EB] bg-[#FFFFFF] text-xs font-semibold text-[#172B4D] hover:bg-[#F5F7FA] transition"
              >
                Sign In
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded-lg bg-[#287C78] hover:bg-[#1f6360] text-[#FFFFFF] font-semibold text-xs transition shadow-xs"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 rounded-lg text-[#344054] hover:text-[#172B4D] hover:bg-[#F5F7FA] md:hidden"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="border-b border-[#DCE3EB] bg-[#FFFFFF] px-4 py-4 md:hidden space-y-2.5">
          <Link
            to="/dashboard"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-semibold text-[#287C78] py-1"
          >
            Security Dashboard
          </Link>
          <Link
            to="/deepfake"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-[#344054] py-1"
          >
            Deepfake Detector
          </Link>
          <Link
            to="/upi-checker"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-[#344054] py-1"
          >
            UPI Safety Checker
          </Link>
          <Link
            to="/phishing"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-[#344054] py-1"
          >
            Phishing Link Analyzer
          </Link>
          <Link
            to="/message-analyzer"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-[#344054] py-1"
          >
            Message & Voice Analyzer
          </Link>
          <Link
            to="/simulator"
            onClick={() => setMobileMenuOpen(false)}
            className="block text-xs font-medium text-[#344054] py-1"
          >
            Scam Simulator
          </Link>
          <div className="pt-2 border-t border-[#DCE3EB] flex gap-2">
            <Link
              to="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex-1 py-2 text-center rounded-lg bg-[#287C78] text-[#FFFFFF] font-semibold text-xs"
            >
              Open Console
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
