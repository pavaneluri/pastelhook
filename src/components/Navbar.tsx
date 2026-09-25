import React, { useState } from 'react';

interface NavbarProps {
  currentView: string;
  onNavigate: (view: string) => void;
  isOwnerLoggedIn: boolean;
  wishlistCount: number;
  onOpenWishlist: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  onNavigate,
  isOwnerLoggedIn,
  wishlistCount,
  onOpenWishlist
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { id: 'home', label: 'Home' },
    { id: 'collection', label: 'Our Collection' },
    { id: 'about', label: 'About Us' },
    { id: 'stories', label: 'Crochet Stories' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 w-full z-50 bg-[#ffffff]/80 backdrop-blur-xl shadow-[0_4px_24px_rgba(200,182,226,0.14)]">
      <div className="h-20 w-full px-4 sm:px-8 lg:px-12 flex items-center justify-between gap-6">
        {/* Brand Mark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2.5 focus:outline-none group text-left"
          >
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDM_lNngsnaJLtRXi8lGUPKkAB2rZFmEm4MamarawllqkBy-Y4ByNNFpDClCxZrOmiLY3BCk0KLO7LPJKQozO_1Mpr91Bo5xHjXqIZnFLTsEuJCMjGksgzwYHrkycrC_wzJexLSydf9xmThRQFlrMgwojmaDVKsflB1XXoIN2OBGn3SBrURHF79CoslzYkCs-zeujP8ai4OKevdd4ahC16dQBSEQn_mNU2-CL6J4fv9fz_rdvjrdH5_"
              alt="Pastelhook Boutique Logo"
              className="h-8 w-auto object-contain transform group-hover:rotate-6 transition-transform duration-300"
            />
            <span className="font-serif text-2xl font-medium tracking-tight text-[#1d1b19] group-hover:text-[#66587e] transition-colors">
              Pastelhook
            </span>
          </button>
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden lg:flex items-center gap-2 bg-[#ffffff]/60 px-3 py-1.5 rounded-full shadow-[0_2px_12px_rgba(200,182,226,0.10)]">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => onNavigate(link.id)}
                className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider transition-all duration-200 ${
                  isActive
                    ? 'bg-[#c8b6e2] text-[#54466b] font-semibold shadow-sm'
                    : 'text-[#49454d] hover:text-[#1d1b19] font-medium hover:bg-[#f3ede9]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </nav>

        {/* Right CTA Actions */}
        <div className="flex items-center gap-3">
          {/* Wishlist button */}
          <button
            onClick={onOpenWishlist}
            className="relative p-2 rounded-full hover:bg-[#f3ede9] text-[#49454d] hover:text-[#795465] transition-colors"
            title="View Wishlist"
            aria-label="View Wishlist"
          >
            <span className="material-symbols-outlined text-[20px]">favorite</span>
            {wishlistCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-[#fdcde1] text-[#795465] text-[11px] font-bold flex items-center justify-center shadow-sm">
                {wishlistCount}
              </span>
            )}
          </button>

          {/* Owner Portal / Console CTA */}
          <button
            onClick={() => onNavigate(isOwnerLoggedIn ? 'owner-console' : 'owner-login')}
            className="p-[1.5px] rounded-full bg-gradient-to-r from-[#80c7e4] via-[#fdcde1] to-[#c8b6e2] hover:shadow-[0_4px_16px_rgba(200,182,226,0.35)] transition-all"
          >
            <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#ffffff]/90 backdrop-blur-md">
              <span className="material-symbols-outlined text-[15px] text-[#66587e]">
                {isOwnerLoggedIn ? 'verified_user' : 'lock'}
              </span>
              <span className="text-[11px] uppercase tracking-widest text-[#49454d] font-semibold whitespace-nowrap">
                {isOwnerLoggedIn ? 'Atelier Console' : 'Owner Login'}
              </span>
            </div>
          </button>

          {/* Profile / Status button */}
          <button
            onClick={() => onNavigate(isOwnerLoggedIn ? 'owner-console' : 'owner-login')}
            className="w-8 h-8 rounded-full bg-[#66587e] flex items-center justify-center text-white hover:opacity-90 transition-opacity"
            title={isOwnerLoggedIn ? 'Owner Active' : 'Sign In'}
            aria-label="User Account"
          >
            <span className="material-symbols-outlined text-[18px]">person</span>
          </button>

          {/* Mobile Menu Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-2 rounded-full text-[#49454d] hover:bg-[#f3ede9]"
            aria-label="Toggle navigation menu"
          >
            <span className="material-symbols-outlined text-2xl">
              {mobileMenuOpen ? 'close' : 'menu'}
            </span>
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-[#ffffff]/95 backdrop-blur-xl border-b border-[#cbc4ce]/30 px-6 py-4 flex flex-col gap-2">
          {navLinks.map((link) => {
            const isActive = currentView === link.id;
            return (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id);
                  setMobileMenuOpen(false);
                }}
                className={`text-left px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-[#c8b6e2] text-[#54466b] font-semibold'
                    : 'text-[#49454d] hover:bg-[#f3ede9]'
                }`}
              >
                {link.label}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
};
