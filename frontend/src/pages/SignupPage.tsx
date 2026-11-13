import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Flag, Lock, Mail, User, ArrowRight, AlertCircle } from 'lucide-react';
import { signupUser } from '../services/api';
import { useAuth } from '../context/AuthContext';

export const SignupPage: React.FC = () => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [consent, setConsent] = useState(true);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!consent) {
      setError('Please agree to security processing terms.');
      return;
    }
    setError('');
    setLoading(true);

    try {
      const res = await signupUser({ email, password, full_name: fullName });
      login(res.access_token, res.user);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.detail || err.message || 'Registration failed. Please try a different email.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F5F7FA] flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
        <Link to="/" className="inline-flex items-center gap-2 mb-4">
          <div className="h-9 w-9 rounded-lg bg-[#287C78] flex items-center justify-center text-[#FFFFFF] shadow-xs">
            <Flag className="h-4 w-4" />
          </div>
          <span className="text-xl font-bold tracking-tight text-[#172B4D]">
            RED <span className="text-[#287C78]">FLAG</span>
          </span>
        </Link>
        <h2 className="text-xl font-bold tracking-tight text-[#172B4D]">
          Create a Red Flag Account
        </h2>
        <p className="mt-1 text-xs text-[#667085]">
          Equip yourself with digital trust and verification tools.
        </p>
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md px-4">
        <div className="rounded-xl border border-[#DCE3EB] bg-[#FFFFFF] p-7 shadow-xs">
          {error && (
            <div className="mb-4 rounded-lg border border-[#F4C4C4] bg-[#FDF1F1] p-3 text-xs text-[#C24141] flex items-center gap-2">
              <AlertCircle className="h-4 w-4 shrink-0 text-[#C24141]" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#344054] mb-1">
                Full Name
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 h-4 w-4 text-[#667085]" />
                <input
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Aarav Sharma"
                  className="w-full rounded-lg border border-[#DCE3EB] bg-[#FFFFFF] pl-10 pr-4 py-2.5 text-xs text-[#172B4D] placeholder-[#667085] focus:border-[#287C78] focus:outline-none focus:ring-1 focus:ring-[#287C78]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#344054] mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3 h-4 w-4 text-[#667085]" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="analyst@domain.com"
                  className="w-full rounded-lg border border-[#DCE3EB] bg-[#FFFFFF] pl-10 pr-4 py-2.5 text-xs text-[#172B4D] placeholder-[#667085] focus:border-[#287C78] focus:outline-none focus:ring-1 focus:ring-[#287C78]"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#344054] mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-3 h-4 w-4 text-[#667085]" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Create a password"
                  className="w-full rounded-lg border border-[#DCE3EB] bg-[#FFFFFF] pl-10 pr-4 py-2.5 text-xs text-[#172B4D] placeholder-[#667085] focus:border-[#287C78] focus:outline-none focus:ring-1 focus:ring-[#287C78]"
                />
              </div>
            </div>

            <div className="flex items-start gap-2 pt-1">
              <input
                type="checkbox"
                id="consent"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                className="mt-0.5 rounded border-[#DCE3EB] text-[#287C78] focus:ring-0"
              />
              <label htmlFor="consent" className="text-xs text-[#667085] leading-tight">
                I agree to the secure, privacy-preserving file heuristic scanning and zero-credential retention policy.
              </label>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#287C78] hover:bg-[#1f6360] py-2.5 text-xs font-bold text-[#FFFFFF] transition shadow-xs flex items-center justify-center gap-1.5 disabled:opacity-50"
            >
              {loading ? 'Creating Account...' : 'Register for Free'}
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </form>

          <div className="mt-4 text-center text-xs text-[#667085]">
            Already registered?{' '}
            <Link to="/login" className="text-[#287C78] hover:underline font-semibold">
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
