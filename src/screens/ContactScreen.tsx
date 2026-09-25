import React, { useState } from 'react';
import { CommissionInquiry } from '../types';

interface ContactScreenProps {
  onAddInquiry: (inquiry: CommissionInquiry) => void;
  preselectedProduct?: string;
}

export const ContactScreen: React.FC<ContactScreenProps> = ({
  onAddInquiry,
  preselectedProduct = '',
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [creationType, setCreationType] = useState(
    preselectedProduct || 'Heirloom Pastel Bloom Bouquet'
  );
  const [palette, setPalette] = useState('Lavender & Soft Pink');
  const [timeline, setTimeline] = useState('4-6 Weeks (Standard Atelier)');
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    const newInquiry: CommissionInquiry = {
      id: `inq-${Date.now()}`,
      patronName: name,
      patronEmail: email,
      productTitle: creationType,
      estimatedValue: 180,
      notes: `Palette: ${palette} • Timeline: ${timeline} • Notes: ${notes || 'None specified'}`,
      receivedAt: 'Just now',
      status: 'Pending',
    };

    onAddInquiry(newInquiry);
    setSubmitted(true);
    setName('');
    setEmail('');
    setNotes('');
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12">
      {/* Header */}
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-3 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffffff] shadow-sm">
          <span className="material-symbols-outlined text-[16px] text-[#795465]">mail</span>
          <span className="text-xs uppercase tracking-widest text-[#795465] font-semibold">
            Private Atelier Concierge
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1d1b19] leading-tight">
          Request a Bespoke Commission
        </h1>
        <p className="text-base sm:text-lg text-[#49454d] font-light leading-relaxed">
          Every custom piece is needle-sculpted in private collaboration with our master hook artist. Inquire below to begin your commission consultation.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Form */}
        <div className="lg:col-span-7 bg-[#ffffff] rounded-3xl p-8 sm:p-10 shadow-[0_16px_40px_rgba(200,182,226,0.2)]">
          {submitted ? (
            <div className="py-16 text-center flex flex-col items-center gap-4 animate-fadeIn">
              <div className="w-16 h-16 rounded-full bg-[#fdcde1]/40 flex items-center justify-center text-[#795465]">
                <span className="material-symbols-outlined text-3xl">check_circle</span>
              </div>
              <h3 className="font-serif text-2xl text-[#1d1b19]">Inquiry Dispatched</h3>
              <p className="text-sm text-[#49454d] max-w-md leading-relaxed">
                Thank you for reaching out to Pastelhook Atelier. Our master artisan will review your custom fiber notes and correspond via private email within our standard 3.4-hour window.
              </p>
              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="mt-4 px-6 py-2.5 rounded-full bg-[#f3ede9] text-xs uppercase tracking-wider font-semibold text-[#1d1b19] hover:bg-[#ede7e3]"
              >
                Submit Another Request
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#1d1b19]">
                    Patron Full Name
                  </label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Genevieve Vance"
                    className="px-4 py-3 rounded-xl bg-[#f8f2ef] text-sm text-[#1d1b19] placeholder:text-[#7a757e] focus:outline-none focus:ring-2 focus:ring-[#80c7e4]"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#1d1b19]">
                    Correspondence Email
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. patron@domain.com"
                    className="px-4 py-3 rounded-xl bg-[#f8f2ef] text-sm text-[#1d1b19] placeholder:text-[#7a757e] focus:outline-none focus:ring-2 focus:ring-[#80c7e4]"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#1d1b19]">
                    Desired Creation Type
                  </label>
                  <select
                    value={creationType}
                    onChange={(e) => setCreationType(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-[#f8f2ef] text-sm text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#80c7e4]"
                  >
                    <option>Heirloom Pastel Bloom Bouquet</option>
                    <option>Mochi the Cozy Amigurumi Bear</option>
                    <option>Meadow Pastel Granny Square Tote</option>
                    <option>Custom Keepsake Blanket</option>
                    <option>Spring Tulips Stem Bundle</option>
                    <option>Blush Daisy Crochet Headband</option>
                    <option>Custom One-of-a-Kind Sculpture</option>
                  </select>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-xs uppercase tracking-wider font-semibold text-[#1d1b19]">
                    Preferred Pastel Palette
                  </label>
                  <select
                    value={palette}
                    onChange={(e) => setPalette(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-[#f8f2ef] text-sm text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#80c7e4]"
                  >
                    <option>Lavender & Soft Pink</option>
                    <option>Sky Blue & Buttercup Cream</option>
                    <option>Mint Pastel & Soft Peach</option>
                    <option>Archival Multi-Tone Solstice</option>
                    <option>Monochrome Cream & Ecru</option>
                  </select>
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#1d1b19]">
                  Anticipated Timeline
                </label>
                <select
                  value={timeline}
                  onChange={(e) => setTimeline(e.target.value)}
                  className="px-4 py-3 rounded-xl bg-[#f8f2ef] text-sm text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#80c7e4]"
                >
                  <option>4-6 Weeks (Standard Atelier)</option>
                  <option>2-3 Weeks (Priority Artisan Vault)</option>
                  <option>Future Milestone (2-3 Months Out)</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-xs uppercase tracking-wider font-semibold text-[#1d1b19]">
                  Customization Notes & Presentation Context
                </label>
                <textarea
                  rows={4}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Detail any specific bloom varieties, ribbon inscriptions, anniversary dates, or sizing parameters..."
                  className="px-4 py-3 rounded-xl bg-[#f8f2ef] text-sm text-[#1d1b19] placeholder:text-[#7a757e] focus:outline-none focus:ring-2 focus:ring-[#80c7e4]"
                />
              </div>

              <button
                type="submit"
                className="py-4 px-8 rounded-full bg-gradient-to-r from-[#80c7e4] via-[#c8b6e2] to-[#fdcde1] text-[#54466b] text-xs uppercase tracking-widest font-semibold shadow-[0_8px_24px_rgba(200,182,226,0.35)] hover:shadow-xl transition-all"
              >
                Send Commission Inquiry
              </button>
            </form>
          )}
        </div>

        {/* Right Info Column */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-8 rounded-3xl bg-[#f8f2ef] flex flex-col gap-4">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#66587e]">
              Salon Consultation Details
            </span>
            <h3 className="font-serif text-2xl text-[#1d1b19]">The Private Atelier Experience</h3>
            <p className="text-sm text-[#49454d] leading-relaxed">
              We operate exclusively on direct patron commissions. When you submit an inquiry, you correspond directly with our artisan team—ensuring every loop tension, color transition, and presentation box is curated to your exact vision.
            </p>

            <div className="flex flex-col gap-3 pt-2 text-sm text-[#49454d]">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#795465]">schedule</span>
                <span>Average Response Window: 3.4 Hours</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#0c6780]">package_2</span>
                <span>Insured Global White-Glove Dispatch</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[#66587e]">verified</span>
                <span>Signed Certificate of Authenticity Included</span>
              </div>
            </div>
          </div>

          <div className="p-8 rounded-3xl bg-[#ffffff] shadow-sm flex flex-col gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#795465]">
              Studio Location
            </span>
            <p className="font-serif text-lg text-[#1d1b19]">
              Pastelhook Needlework Atelier & Salon
            </p>
            <p className="text-xs text-[#49454d] leading-relaxed">
              Kensington Silk Studio District • By Private Invitation Only<br />
              London & Kyoto Fiber Archives
            </p>
            <p className="text-xs text-[#7a757e] pt-1">
              Direct Inquiries: concierge@pastelhook.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
