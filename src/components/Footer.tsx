import React, { useState } from 'react';

interface FooterProps {
  onNavigate: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [joined, setJoined] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setJoined(true);
      setEmail('');
      setTimeout(() => setJoined(false), 5000);
    }
  };

  return (
    <footer className="w-full bg-[#f8f2ef]/70 backdrop-blur-lg shadow-[0_-4px_24px_rgba(200,182,226,0.08)] mt-16">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 mb-12">
          {/* Col 1: Brand story */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-2">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM_lNngsnaJLtRXi8lGUPKkAB2rZFmEm4MamarawllqkBy-Y4ByNNFpDClCxZrOmiLY3BCk0KLO7LPJKQozO_1Mpr91Bo5xHjXqIZnFLTsEuJCMjGksgzwYHrkycrC_wzJexLSydf9xmThRQFlrMgwojmaDVKsflB1XXoIN2OBGn3SBrURHF79CoslzYkCs-zeujP8ai4OKevdd4ahC16dQBSEQn_mNU2-CL6J4fv9fz_rdvjrdH5_"
                alt="Pastelhook Boutique Logo"
                className="h-6 w-auto object-contain"
              />
              <span className="font-serif text-xl font-medium text-[#1d1b19]">
                Pastelhook Atelier
              </span>
            </div>
            <p className="text-sm text-[#49454d] leading-relaxed max-w-sm">
              Bespoke, heirloom crochet creations shaped thread by thread. Designed with patient intention, rare organic silks, and dream-woven pastels for discerning collectors worldwide.
            </p>
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#ffffff]/90 w-fit shadow-[0_2px_10px_rgba(200,182,226,0.12)]">
              <span className="material-symbols-outlined text-[16px] text-[#795465]">eco</span>
              <span className="text-[11px] text-[#795465] font-semibold uppercase tracking-wider">
                100% Hand-stitched • Organic Cotton & Milk Yarn
              </span>
            </div>
          </div>

          {/* Col 2: The Atelier links */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-wider text-[#1d1b19] font-semibold">
              The Atelier
            </span>
            <nav className="flex flex-col gap-2 text-sm text-[#49454d]">
              <button
                onClick={() => onNavigate('collection')}
                className="text-left hover:text-[#66587e] transition-colors"
              >
                Archival Works
              </button>
              <button
                onClick={() => onNavigate('contact')}
                className="text-left hover:text-[#66587e] transition-colors"
              >
                Bespoke Commissions
              </button>
              <button
                onClick={() => onNavigate('stories')}
                className="text-left hover:text-[#66587e] transition-colors"
              >
                Artisan Journal
              </button>
              <button
                onClick={() => onNavigate('about')}
                className="text-left hover:text-[#66587e] transition-colors"
              >
                Craft & Fibers
              </button>
            </nav>
          </div>

          {/* Col 3: Concierge links */}
          <div className="lg:col-span-2 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-wider text-[#1d1b19] font-semibold">
              Concierge
            </span>
            <nav className="flex flex-col gap-2 text-sm text-[#49454d]">
              <button
                onClick={() => onNavigate('contact')}
                className="text-left hover:text-[#66587e] transition-colors"
              >
                Private Inquiries
              </button>
              <button
                onClick={() => onNavigate('stories')}
                className="text-left hover:text-[#66587e] transition-colors"
              >
                Heirloom Fiber Care
              </button>
              <button
                onClick={() => onNavigate('owner-login')}
                className="text-left hover:text-[#66587e] transition-colors"
              >
                Atelier Vault Access
              </button>
            </nav>
            <div className="flex items-center gap-2 pt-2">
              <a
                href="#instagram"
                aria-label="Instagram"
                className="w-9 h-9 rounded-full bg-[#ffffff] flex items-center justify-center text-[#49454d] hover:text-[#66587e] hover:shadow-[0_2px_10px_rgba(200,182,226,0.25)] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">photo_camera</span>
              </a>
              <a
                href="#pinterest"
                aria-label="Pinterest"
                className="w-9 h-9 rounded-full bg-[#ffffff] flex items-center justify-center text-[#49454d] hover:text-[#66587e] hover:shadow-[0_2px_10px_rgba(200,182,226,0.25)] transition-all"
              >
                <span className="material-symbols-outlined text-[18px]">collections_bookmark</span>
              </a>
            </div>
          </div>

          {/* Col 4: Private Atelier Dispatch */}
          <div className="lg:col-span-4 flex flex-col gap-3">
            <span className="text-xs uppercase tracking-wider text-[#1d1b19] font-semibold">
              Private Atelier Dispatch
            </span>
            <p className="text-sm text-[#49454d]">
              Receive quiet invitations to limited fiber drops and archival release viewings.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch gap-2">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your correspondence email"
                  required
                  className="w-full px-4 py-2 rounded-full bg-[#ffffff]/90 text-sm text-[#1d1b19] placeholder:text-[#7a757e] focus:outline-none focus:ring-2 focus:ring-[#80c7e4] shadow-[0_2px_12px_rgba(200,182,226,0.12)]"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-2 rounded-full bg-gradient-to-r from-[#c8b6e2] to-[#fdcde1] text-[#54466b] text-xs font-semibold tracking-wider uppercase hover:shadow-[0_4px_16px_rgba(200,182,226,0.35)] transition-all"
              >
                Join
              </button>
            </form>
            {joined && (
              <p className="text-xs text-[#795465] font-medium animate-fadeIn">
                Thank you. You have been added to the private atelier correspondence dispatch.
              </p>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-[#cbc4ce]/30 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-[#49454d] uppercase tracking-widest text-center sm:text-left">
          <span>© 2025 Pastelhook Atelier. Pure Handcraft. All rights reserved.</span>
          <span>Discreet Luxury • Private Commissions Exclusively</span>
        </div>
      </div>
    </footer>
  );
};
