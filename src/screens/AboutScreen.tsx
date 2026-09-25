import React from 'react';

interface AboutScreenProps {
  onNavigate: (view: string) => void;
}

export const AboutScreen: React.FC<AboutScreenProps> = ({ onNavigate }) => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 py-12">
      {/* Editorial Header */}
      <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-3 mb-16">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffffff] shadow-sm">
          <span className="material-symbols-outlined text-[16px] text-[#795465]">spa</span>
          <span className="text-xs uppercase tracking-widest text-[#795465] font-semibold">
            Our Fiber Provenance
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl text-[#1d1b19] leading-tight">
          A Little Love in Every Stitch
        </h1>
        <p className="text-base sm:text-lg text-[#49454d] font-light leading-relaxed">
          Founded on the principle of radical patience, Pastelhook creates heirloom crochet pieces that counter the transient velocity of modern life.
        </p>
      </div>

      {/* Main Feature Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-20">
        <div className="lg:col-span-6 relative">
          <div className="relative rounded-3xl overflow-hidden shadow-2xl">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQRaTFt4Dmkkbbib8T-g9hxyKzc9c65IZJcOU_5Dwk-z6ALvakrDvIpk99Om2RZMAjsDE8_5tWApAmHfZyROf9LBIIomu4ROABKYydX1Kb6W4UUYs8tS5-TfSCikBSJ_n5JRbyEjzSqD0PpOLXC3h2YJYBU_0BoY8J56t-X-4g0eAiIyRbb0CxIte_0KwCsMKExMfuUQzqLHuqItiPmyUYYe9UJvPSb1ZzRK7zVv8Eft_Ek7UN7MdL"
              alt="Artisan hands crocheting at sunlit workshop desk"
              className="w-full h-auto object-cover"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 p-6 rounded-2xl bg-[#ffffff]/95 backdrop-blur-xl shadow-xl hidden sm:block max-w-xs border border-white">
            <span className="text-xs font-semibold uppercase text-[#795465] tracking-wider">
              Studio Motto
            </span>
            <p className="font-serif text-base text-[#1d1b19] mt-1">
              "When you loop with intention, every knot carries warmth across time."
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 flex flex-col gap-6">
          <div className="flex flex-col gap-2">
            <h2 className="font-serif text-2xl sm:text-3xl text-[#1d1b19]">
              Ethical Sourcing & Hypoallergenic Milk Yarn
            </h2>
            <p className="text-sm sm:text-base text-[#49454d] leading-relaxed">
              We exclusively use 5-ply combed milk cotton—a rare, hypoallergenic fiber derived from dairy proteins extracted without cruelty. It possesses the gentle tactile whisper of cashmere combined with the breathable strength of mulberry silk.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="p-5 rounded-2xl bg-[#ffffff] shadow-sm flex flex-col gap-2">
              <span className="material-symbols-outlined text-[#66587e] text-2xl">nature</span>
              <h3 className="font-serif text-base font-semibold text-[#1d1b19]">Botanical Dyes</h3>
              <p className="text-xs text-[#49454d]">
                Soft lavender, tea-rose blush, and powdered sky pigments derived from organic elderberry, madder root, and woad leaves.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-[#ffffff] shadow-sm flex flex-col gap-2">
              <span className="material-symbols-outlined text-[#0c6780] text-2xl">handyman</span>
              <h3 className="font-serif text-base font-semibold text-[#1d1b19]">Rosewood Hooks</h3>
              <p className="text-xs text-[#49454d]">
                Crafted with hand-lathed ergonomic rosewood hooks that glide through yarn without shredding fragile twisted filaments.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Meet the Master Hook Artist */}
      <div className="rounded-3xl bg-[#f8f2ef] p-8 sm:p-12 mb-20">
        <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center gap-8">
          <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full overflow-hidden shadow-lg shrink-0 border-4 border-white">
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQRaTFt4Dmkkbbib8T-g9hxyKzc9c65IZJcOU_5Dwk-z6ALvakrDvIpk99Om2RZMAjsDE8_5tWApAmHfZyROf9LBIIomu4ROABKYydX1Kb6W4UUYs8tS5-TfSCikBSJ_n5JRbyEjzSqD0PpOLXC3h2YJYBU_0BoY8J56t-X-4g0eAiIyRbb0CxIte_0KwCsMKExMfuUQzqLHuqItiPmyUYYe9UJvPSb1ZzRK7zVv8Eft_Ek7UN7MdL"
              alt="Pastelhook Master Hook Artist"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex flex-col gap-2 text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#66587e]">
              Master Hook Artist & Founder
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl text-[#1d1b19]">
              Elena Chen • Haute Hook Atelier
            </h3>
            <p className="text-sm text-[#49454d] leading-relaxed">
              "Pastelhook began as an intimate escape from the synthetic repetition of factory goods. When friends asked for bouquets that would never wither on their bedside tables, I began drafting botanical patterns stitch by stitch. Today, our salon remains intentionally small so every piece receives the devotion it deserves."
            </p>
            <div className="pt-2">
              <button
                onClick={() => onNavigate('contact')}
                className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#795465] hover:underline"
              >
                <span>Request a Private Consultation</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
