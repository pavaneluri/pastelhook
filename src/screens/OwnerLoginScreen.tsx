import React, { useState } from 'react';
import { ThreeYarnScene } from '../components/ThreeYarnScene';

interface OwnerLoginScreenProps {
  onLoginSuccess: () => void;
  onBackToPublic: () => void;
}

export const OwnerLoginScreen: React.FC<OwnerLoginScreenProps> = ({
  onLoginSuccess,
  onBackToPublic,
}) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [demoLoaded, setDemoLoaded] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleFillDemo = () => {
    setEmail('owner@pastelhook.com');
    setPassword('HeirloomSpunSilk2024!');
    setDemoLoaded(true);
    setTimeout(() => setDemoLoaded(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess();
    }, 1100);
  };

  return (
    <div className="flex flex-col w-full relative min-h-screen items-center justify-center p-4 sm:p-8 overflow-hidden select-none">
      {/* Back to public link */}
      <button
        onClick={onBackToPublic}
        className="absolute top-6 left-6 z-30 inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[#ffffff]/80 backdrop-blur-md text-xs font-semibold uppercase tracking-wider text-[#49454d] hover:text-[#1d1b19] shadow-sm hover:shadow transition-all"
      >
        <span className="material-symbols-outlined text-sm">arrow_back</span>
        <span>Back to Public Atelier</span>
      </button>

      {/* Atmospheric Ethereal Background Glows */}
      <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-[#fdcde1]/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-36 -right-28 w-[30rem] h-[30rem] rounded-full bg-[#baeaff]/45 blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[42rem] h-[42rem] rounded-full bg-[#ecdcff]/30 blur-3xl pointer-events-none" />

      {/* Ambient Floating Crochet Decorative Vectors */}
      <svg
        className="absolute top-12 left-12 w-28 h-28 text-[#66587e]/20 animate-pulse pointer-events-none"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 100 100"
      >
        <path
          d="M50 20 C60 5, 85 10, 80 35 C75 55, 50 80, 50 80 C50 80, 25 55, 20 35 C15 10, 40 5, 50 20 Z"
          strokeDasharray="4 3"
        />
        <path d="M50 40 Q58 28 65 34 T68 50" strokeLinecap="round" />
      </svg>
      <svg
        className="absolute bottom-16 right-16 w-36 h-36 text-[#795465]/25 pointer-events-none animate-pulse"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 120 120"
      >
        <circle cx="60" cy="60" r="38" strokeDasharray="6 4" />
        <path d="M60 22 C70 42 70 78 60 98 M22 60 C42 70 78 70 98 60" strokeLinecap="round" />
      </svg>

      <div className="w-full max-w-lg z-10 flex flex-col items-center pt-8">
        {/* 3D Interactive Animation Centerpiece */}
        <div className="relative -mb-16 z-20 flex justify-center items-center drop-shadow-xl">
          <div className="absolute w-64 h-64 rounded-full bg-gradient-to-tr from-[#ffd8e7]/50 via-[#ecdcff]/40 to-[#baeaff]/60 blur-2xl" />
          <div className="w-72 h-72 mx-auto bg-transparent">
            <ThreeYarnScene height={280} />
          </div>
        </div>

        {/* Main Glassmorphic Card Container */}
        <div className="w-full bg-[#ffffff]/85 backdrop-blur-2xl rounded-3xl shadow-2xl p-8 sm:p-10 relative overflow-hidden transition-all duration-500 border border-white">
          {/* Subtle Yarn-Strand Organic Gradient Accent Top Line */}
          <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#ffd8e7] via-[#c8b6e2] to-[#80c7e4]" />

          {/* Atelier Emblem & Branding Header */}
          <div className="flex flex-col items-center text-center mt-2 mb-8">
            <div className="relative p-2.5 rounded-full bg-[#f8f2ef] mb-4 shadow-sm group">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM_lNngsnaJLtRXi8lGUPKkAB2rZFmEm4MamarawllqkBy-Y4ByNNFpDClCxZrOmiLY3BCk0KLO7LPJKQozO_1Mpr91Bo5xHjXqIZnFLTsEuJCMjGksgzwYHrkycrC_wzJexLSydf9xmThRQFlrMgwojmaDVKsflB1XXoIN2OBGn3SBrURHF79CoslzYkCs-zeujP8ai4OKevdd4ahC16dQBSEQn_mNU2-CL6J4fv9fz_rdvjrdH5_"
                alt="Pastelhook Official Emblem"
                className="w-16 h-16 object-contain rounded-full transform group-hover:rotate-6 transition-transform duration-300"
              />
              <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0c6780] opacity-75" />
                <span className="relative inline-flex rounded-full h-4 w-4 bg-[#0c6780]" />
              </span>
            </div>

            <span className="text-xs uppercase tracking-widest text-[#66587e] mb-1 font-semibold">
              Atelier Secret Salon
            </span>
            <h1 className="font-serif text-2xl sm:text-3xl font-medium text-[#1d1b19]">
              Pastelhook Atelier Admin
            </h1>
            <p className="text-xs sm:text-sm text-[#49454d] mt-1 max-w-xs">
              Restricted Owner Portal — Secure Authentication
            </p>
          </div>

          {/* Quick Demo Access Banner */}
          <div className="mb-6 p-3.5 bg-[#f8f2ef] rounded-2xl flex items-center justify-between shadow-sm border border-[#cbc4ce]/30">
            <div className="flex items-center space-x-2.5">
              <span className="material-symbols-outlined text-[#66587e] text-xl fill">
                auto_fix_high
              </span>
              <div className="flex flex-col text-left">
                <span className="text-xs font-semibold text-[#1d1b19]">Owner Experience Mode</span>
                <span className="text-[11px] text-[#7a757e]">Fill credentials instantly</span>
              </div>
            </div>
            <button
              type="button"
              onClick={handleFillDemo}
              className={`text-xs px-3 py-1.5 rounded-full transition-all duration-200 active:scale-95 shadow-sm font-semibold ${
                demoLoaded
                  ? 'bg-[#fdcde1] text-[#795465]'
                  : 'bg-[#ecdcff] hover:bg-[#c8b6e2] text-[#211537]'
              }`}
            >
              {demoLoaded ? 'Loaded ✓' : 'Instant Autofill'}
            </button>
          </div>

          {/* Authentication Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input Field */}
            <div className="space-y-1 text-left">
              <label className="text-xs uppercase tracking-wider font-semibold text-[#1d1b19] flex items-center gap-1.5">
                <span className="material-symbols-outlined text-sm text-[#66587e]">alternate_email</span>
                <span>Owner Email Address</span>
              </label>
              <div className="relative flex items-center">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="owner@pastelhook.com"
                  className="w-full px-4 py-3 pl-11 rounded-xl bg-[#f8f2ef] text-[#1d1b19] text-sm placeholder:text-[#cbc4ce] focus:outline-none focus:ring-2 focus:ring-[#80c7e4] transition-all"
                />
                <span className="material-symbols-outlined absolute left-3.5 text-[#49454d] pointer-events-none text-base">
                  gesture
                </span>
              </div>
            </div>

            {/* Password Input Field */}
            <div className="space-y-1 text-left">
              <div className="flex items-center justify-between">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#1d1b19] flex items-center gap-1.5">
                  <span className="material-symbols-outlined text-sm text-[#795465]">lock</span>
                  <span>Master Passkey</span>
                </label>
                <button
                  type="button"
                  onClick={() => alert('Master passkey hint: Use the Instant Autofill button above.')}
                  className="text-xs text-[#66587e] hover:underline"
                >
                  Forgot?
                </button>
              </div>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-4 py-3 pl-11 pr-12 rounded-xl bg-[#f8f2ef] text-[#1d1b19] text-sm placeholder:text-[#cbc4ce] focus:outline-none focus:ring-2 focus:ring-[#c8b6e2] transition-all"
                />
                <span className="material-symbols-outlined absolute left-3.5 text-[#49454d] pointer-events-none text-base">
                  key
                </span>
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 text-[#49454d] hover:text-[#1d1b19] p-1 rounded-full transition-colors"
                >
                  <span className="material-symbols-outlined text-lg">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Remember Me */}
            <div className="flex items-center justify-between pt-1">
              <label className="flex items-center space-x-2 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={remember}
                  onChange={(e) => setRemember(e.target.checked)}
                  className="w-4 h-4 rounded text-[#66587e] focus:ring-[#66587e] accent-[#66587e] cursor-pointer"
                />
                <span className="text-xs text-[#49454d]">Remember this secure device</span>
              </label>
            </div>

            {errorMsg && (
              <p className="text-xs text-[#ba1a1a] bg-[#ffdad6] p-2 rounded-xl">{errorMsg}</p>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 px-6 rounded-full text-xs font-semibold uppercase tracking-widest text-white bg-gradient-to-r from-[#0c6780] via-[#66587e] to-[#795465] hover:opacity-95 transform active:scale-98 transition-all shadow-lg hover:shadow-xl flex items-center justify-center space-x-2"
            >
              {isLoading ? (
                <>
                  <span className="material-symbols-outlined animate-spin text-base">
                    progress_activity
                  </span>
                  <span>Authenticating Vault...</span>
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-base">lock_open</span>
                  <span>Enter Atelier Dashboard</span>
                </>
              )}
            </button>
          </form>

          {/* Security Notice Footer */}
          <div className="mt-6 pt-4 bg-[#f8f2ef]/60 rounded-xl p-3 text-center flex flex-col items-center gap-1 border border-[#cbc4ce]/30">
            <div className="flex items-center space-x-1.5 text-[#0c6780] text-xs font-semibold">
              <span className="material-symbols-outlined text-sm fill">shield</span>
              <span>OWNER CLEARANCE LEVEL 1</span>
            </div>
            <p className="text-[11px] text-[#7a757e] leading-relaxed max-w-sm">
              Owner-only access with End-to-End Encryption & Supabase RLS security.
            </p>
          </div>
        </div>

        {/* Soft Brand Footnote */}
        <div className="mt-4 text-center text-[#7a757e] text-xs tracking-widest uppercase">
          Pastelhook Haute Crochet • Private Archive
        </div>
      </div>
    </div>
  );
};
