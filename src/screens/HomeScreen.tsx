import React, { useState } from 'react';
import { Product, JournalStory } from '../types';
import { ThreeYarnScene } from '../components/ThreeYarnScene';

interface HomeScreenProps {
  products: Product[];
  stories: JournalStory[];
  onNavigate: (view: string) => void;
  onSelectProduct: (product: Product) => void;
  onSelectStory: (story: JournalStory) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  products,
  stories,
  onNavigate,
  onSelectProduct,
  onSelectStory,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [circleEmail, setCircleEmail] = useState('');
  const [circleSubscribed, setCircleSubscribed] = useState(false);

  // Filtered featured products for homepage (up to 4 items)
  const filteredProducts = products.filter((p) => {
    if (selectedCategory === 'all') return true;
    return p.category === selectedCategory;
  }).slice(0, 4);

  const handleCircleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (circleEmail) {
      setCircleSubscribed(true);
      setCircleEmail('');
    }
  };

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* Subtle Ambient Glow Canvas Decor */}
      <div className="relative w-full">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[800px] h-[550px] bg-gradient-to-tr from-[#fdcde1]/30 via-[#80c7e4]/20 to-[#c8b6e2]/35 blur-3xl pointer-events-none -z-10 rounded-full" />
        <div className="absolute top-[680px] -left-40 w-[500px] h-[500px] bg-[#80c7e4]/15 blur-3xl pointer-events-none -z-10 rounded-full" />
        <div className="absolute top-[1400px] -right-40 w-[600px] h-[600px] bg-[#fdcde1]/20 blur-3xl pointer-events-none -z-10 rounded-full" />

        {/* 1. HERO SECTION */}
        <section className="w-full max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-12 pt-6 lg:pt-10 pb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Hero Copy */}
            <div className="lg:col-span-6 flex flex-col items-start gap-5 z-10">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ffffff]/80 backdrop-blur-md shadow-[0_4px_16px_rgba(200,182,226,0.18)]">
                <span className="material-symbols-outlined text-[16px] text-[#0c6780]">auto_awesome</span>
                <span className="text-xs text-[#795465] uppercase tracking-widest font-semibold">
                  Bespoke Atelier Collection
                </span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-[#1d1b19] leading-[1.12] tracking-tight">
                Handmade with Love, <br className="hidden sm:inline" />
                <span className="italic font-normal text-[#66587e]">Stitched with Care.</span>
              </h1>

              <p className="text-base sm:text-lg text-[#49454d] max-w-xl font-light leading-relaxed">
                Discover the magic of handmade crochet, where every stitch tells a story and every creation is made with love.
              </p>

              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  onClick={() => onNavigate('collection')}
                  className="group inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-gradient-to-r from-[#80c7e4] via-[#c8b6e2] to-[#fdcde1] text-[#54466b] text-xs uppercase tracking-wider font-semibold shadow-[0_8px_24px_rgba(128,199,228,0.3)] hover:shadow-[0_12px_32px_rgba(200,182,226,0.45)] hover:scale-[1.02] transition-all"
                >
                  <span>Explore Our Collection</span>
                  <span className="material-symbols-outlined text-[18px] group-hover:translate-x-1 transition-transform">
                    arrow_forward
                  </span>
                </button>

                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#ffffff]/70 backdrop-blur-md text-[#795465] text-xs uppercase tracking-wider font-semibold shadow-[0_4px_16px_rgba(248,200,220,0.2)] hover:bg-[#ffffff] hover:shadow-[0_8px_24px_rgba(248,200,220,0.35)] transition-all"
                >
                  <span>Discover Our Story</span>
                </button>
              </div>

              {/* Micro Trust Elements */}
              <div className="pt-4 flex items-center gap-6 text-[#49454d]">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#795465] text-[20px]">
                    workspace_premium
                  </span>
                  <span className="text-xs uppercase tracking-wider font-medium">Heritage Quality</span>
                </div>
                <div className="h-4 w-[1px] bg-[#cbc4ce]/60" />
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-[#0c6780] text-[20px]">spa</span>
                  <span className="text-xs uppercase tracking-wider font-medium">Natural Fibers</span>
                </div>
              </div>
            </div>

            {/* Hero 3D Interactive Centerpiece & Floating Badges */}
            <div className="lg:col-span-6 relative flex items-center justify-center min-h-[460px] lg:min-h-[520px]">
              {/* Ethereal Backdrop Circular Disc */}
              <div className="absolute inset-4 rounded-[3rem] bg-gradient-to-br from-[#ffffff]/70 via-[#f8f2ef]/40 to-[#f3ede9]/60 backdrop-blur-2xl shadow-[0_16px_48px_rgba(200,182,226,0.22)] -z-10" />

              {/* 3D Interactive Yarn Ball & Flora Canvas */}
              <div className="relative w-full h-[500px] flex items-center justify-center overflow-hidden rounded-[2.5rem]">
                <ThreeYarnScene height={500} />
              </div>

              {/* Floating Badge 1: Top Left */}
              <div className="absolute top-6 left-2 sm:left-4 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffffff]/85 backdrop-blur-xl shadow-[0_8px_24px_rgba(200,182,226,0.25)]">
                <span className="w-2.5 h-2.5 rounded-full bg-[#66587e] animate-ping" />
                <span className="material-symbols-outlined text-[16px] text-[#66587e]">favorite</span>
                <span className="text-xs text-[#1d1b19] font-semibold tracking-wider uppercase">
                  100% Hand-Crafted
                </span>
              </div>

              {/* Floating Badge 2: Right Center */}
              <div className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffffff]/90 backdrop-blur-xl shadow-[0_8px_24px_rgba(128,199,228,0.28)]">
                <span className="material-symbols-outlined text-[18px] text-[#0c6780]">water_drop</span>
                <div className="flex flex-col">
                  <span className="text-xs text-[#1d1b19] font-semibold tracking-wide uppercase">
                    Hypoallergenic
                  </span>
                  <span className="text-[9px] text-[#0c6780] leading-none tracking-widest uppercase">
                    Pure Milk Yarn
                  </span>
                </div>
              </div>

              {/* Floating Badge 3: Bottom Left */}
              <div className="absolute bottom-6 left-6 sm:left-10 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-[#ffffff]/85 backdrop-blur-xl shadow-[0_8px_24px_rgba(248,200,220,0.3)]">
                <span className="material-symbols-outlined text-[16px] text-[#795465]">
                  volunteer_activism
                </span>
                <span className="text-xs text-[#795465] font-semibold tracking-wider uppercase">
                  Made with Heart
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* 2. FEATURED CROCHET COLLECTION */}
        <section className="w-full px-4 sm:px-8 lg:px-12 py-16 bg-[#f8f2ef]/40" id="featured-collection">
          <div className="max-w-[1380px] mx-auto flex flex-col gap-10">
            {/* Section Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col gap-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-[1.5px] bg-[#795465]" />
                  <span className="text-xs text-[#795465] uppercase tracking-widest font-semibold">
                    Atelier Portfolio
                  </span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1d1b19]">
                  Curated Pastel Heirlooms
                </h2>
                <p className="text-sm text-[#49454d] mt-1">
                  Each artifact is individually needle-looped over countless silent hours. Pure natural fibers, never duplicated, crafted to live through generations.
                </p>
              </div>

              {/* Category Filter Pills */}
              <div className="flex flex-wrap items-center gap-2">
                {[
                  { id: 'all', label: 'All Creations' },
                  { id: 'bouquets', label: 'Flowers & Bouquets' },
                  { id: 'amigurumi', label: 'Teddy Bears & Amigurumi' },
                  { id: 'totes', label: 'Bags & Totes' },
                  { id: 'charms', label: 'Keychains & Charms' },
                ].map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-4 py-1.5 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                      selectedCategory === cat.id
                        ? 'bg-[#66587e] text-white shadow-sm'
                        : 'bg-[#ffffff] text-[#49454d] hover:text-[#1d1b19] shadow-sm'
                    }`}
                  >
                    {cat.label}
                  </button>
                ))}
              </div>
            </div>

            {/* 4 Bespoke Cards Grid (Strictly Zero Visible Prices) */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((prod) => (
                <div
                  key={prod.id}
                  className="group flex flex-col rounded-2xl bg-[#ffffff]/80 backdrop-blur-md overflow-hidden shadow-[0_8px_30px_rgba(200,182,226,0.16)] hover:shadow-[0_16px_40px_rgba(200,182,226,0.3)] hover:-translate-y-1 transition-all duration-300"
                >
                  <div className="relative w-full aspect-[4/5] overflow-hidden bg-[#f3ede9]">
                    <img
                      src={prod.image}
                      alt={prod.title}
                      className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                      <span className="px-2.5 py-1 rounded-full bg-[#ffffff]/90 backdrop-blur-sm text-[#795465] text-[10px] uppercase font-semibold tracking-wider shadow-sm">
                        {prod.categoryName}
                      </span>
                    </div>
                    <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-full bg-[#ffffff]/90 backdrop-blur-sm text-[#1d1b19] text-[10px] tracking-widest uppercase font-semibold flex items-center gap-1 shadow-sm">
                      <span className="material-symbols-outlined text-[13px] text-[#0c6780]">
                        schedule
                      </span>
                      <span>{prod.craftingHours} Crafting Hours</span>
                    </div>
                  </div>

                  <div className="p-4 flex flex-col flex-1 justify-between gap-3">
                    <div className="flex flex-col gap-1">
                      <span className="text-[10px] uppercase tracking-widest text-[#0c6780] font-semibold">
                        {prod.categoryName}
                      </span>
                      <h3 className="font-serif text-lg text-[#1d1b19] group-hover:text-[#66587e] transition-colors line-clamp-1">
                        {prod.title}
                      </h3>
                      <p className="text-xs text-[#49454d] line-clamp-2 mt-0.5">
                        {prod.description}
                      </p>
                    </div>

                    <div className="pt-2 flex items-center justify-between border-t border-[#cbc4ce]/20">
                      <span className="text-[11px] text-[#795465] font-medium tracking-wide truncate max-w-[140px]">
                        {prod.fiber}
                      </span>
                      <button
                        onClick={() => onSelectProduct(prod)}
                        className="px-4 py-1.5 rounded-full bg-[#f3ede9] text-[#1d1b19] text-xs uppercase tracking-wider font-semibold hover:bg-[#c8b6e2] hover:text-[#54466b] transition-all"
                      >
                        View Details
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* View Full Gallery Link */}
            <div className="text-center pt-2">
              <button
                onClick={() => onNavigate('collection')}
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full bg-[#ffffff] hover:bg-[#f3ede9] text-[#1d1b19] text-xs uppercase tracking-widest font-semibold shadow-sm transition-all"
              >
                <span>View All 28 Archival Creations</span>
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* 3. ABOUT SECTION ("A Little Love in Every Stitch") */}
        <section className="w-full max-w-[1380px] mx-auto px-4 sm:px-8 lg:px-12 py-20" id="about-section">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Workshop Photo Showcase with Layered Badge */}
            <div className="lg:col-span-6 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(200,182,226,0.28)]">
                <img
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuAQRaTFt4Dmkkbbib8T-g9hxyKzc9c65IZJcOU_5Dwk-z6ALvakrDvIpk99Om2RZMAjsDE8_5tWApAmHfZyROf9LBIIomu4ROABKYydX1Kb6W4UUYs8tS5-TfSCikBSJ_n5JRbyEjzSqD0PpOLXC3h2YJYBU_0BoY8J56t-X-4g0eAiIyRbb0CxIte_0KwCsMKExMfuUQzqLHuqItiPmyUYYe9UJvPSb1ZzRK7zVv8Eft_Ek7UN7MdL"
                  alt="Pastelhook Artisanal Crafting Workshop"
                  className="w-full h-auto object-cover max-h-[560px]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-[#ffffff]/85 backdrop-blur-xl flex items-center justify-between gap-3 shadow-[0_8px_32px_rgba(0,0,0,0.08)]">
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[#795465] text-[22px]">
                      nature_people
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[#1d1b19] leading-tight">
                        Quiet Atelier Rituals
                      </p>
                      <p className="text-[11px] text-[#49454d] uppercase tracking-wider">
                        Ergonomic Rosewood Hooks • Spun Yarn
                      </p>
                    </div>
                  </div>
                  <span className="font-serif text-xl text-[#66587e]">1/1</span>
                </div>
              </div>
            </div>

            {/* Artisanal Narrative & Crafting Metrics */}
            <div className="lg:col-span-6 flex flex-col gap-5 lg:pl-6">
              <div className="flex items-center gap-2">
                <span className="w-6 h-[1.5px] bg-[#66587e]" />
                <span className="text-xs text-[#66587e] uppercase tracking-widest font-semibold">
                  The Philosophy
                </span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-[#1d1b19] leading-tight">
                A Little Love in <br />
                <span className="italic font-normal text-[#795465]">Every Stitch.</span>
              </h2>

              <p className="text-base text-[#49454d] leading-relaxed">
                At Pastelhook, we reject the fleeting velocity of mass manufacturing. Every blossom petal, plush companion, and delicate shoulder tote begins as an unspooled strand of cruelty-free milk yarn and mulberry cotton.
              </p>

              <p className="text-sm text-[#49454d] leading-relaxed">
                Under sunlit studio windows, our artisans work slowly. We balance tension, calibrate loops by instinct, and weave gentle memories into keepsakes created to endure across a lifetime.
              </p>

              {/* Crafting Metrics Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-4 rounded-xl bg-[#ffffff]/80 backdrop-blur-md shadow-[0_4px_16px_rgba(200,182,226,0.12)] flex flex-col gap-1">
                  <span className="font-serif text-2xl text-[#66587e]">12,000+</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#49454d] font-semibold">
                    Stitches per creation
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-[#ffffff]/80 backdrop-blur-md shadow-[0_4px_16px_rgba(200,182,226,0.12)] flex flex-col gap-1">
                  <span className="font-serif text-2xl text-[#0c6780]">100%</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#49454d] font-semibold">
                    Plastic-Free Packaging
                  </span>
                </div>
                <div className="p-4 rounded-xl bg-[#ffffff]/80 backdrop-blur-md shadow-[0_4px_16px_rgba(200,182,226,0.12)] flex flex-col gap-1">
                  <span className="font-serif text-2xl text-[#795465]">Zero</span>
                  <span className="text-[11px] uppercase tracking-wider text-[#49454d] font-semibold">
                    Machine Automation
                  </span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => onNavigate('about')}
                  className="inline-flex items-center gap-1.5 text-xs text-[#1d1b19] uppercase tracking-wider font-semibold hover:text-[#66587e] transition-colors"
                >
                  <span>Read Our Full Artisan Manifesto</span>
                  <span className="material-symbols-outlined text-[16px]">arrow_outward</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* 4. CROCHET STORIES & BEHIND-THE-SCENES JOURNAL */}
        <section className="w-full px-4 sm:px-8 lg:px-12 py-16 bg-[#f8f2ef]/60">
          <div className="max-w-[1380px] mx-auto flex flex-col gap-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="flex flex-col gap-1">
                <span className="text-xs text-[#0c6780] uppercase tracking-widest font-semibold">
                  Artisan Chronicles
                </span>
                <h2 className="font-serif text-3xl sm:text-4xl text-[#1d1b19]">
                  Behind-the-Scenes & Fiber Journal
                </h2>
              </div>
              <p className="text-sm text-[#49454d] max-w-md">
                Quiet observations from our sun-drenched studio tables, seasonal palette selections, and heirloom fiber preservation advice.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stories.map((story) => (
                <article
                  key={story.id}
                  className="flex flex-col rounded-2xl bg-[#ffffff] overflow-hidden shadow-[0_6px_24px_rgba(200,182,226,0.14)] hover:shadow-[0_12px_32px_rgba(200,182,226,0.25)] hover:-translate-y-1 transition-all"
                >
                  <div className="w-full h-52 bg-[#f3ede9] overflow-hidden">
                    <img
                      src={story.image}
                      alt={story.title}
                      className="w-full h-full object-cover hover:scale-105 transition-transform duration-500 cursor-pointer"
                      onClick={() => onSelectStory(story)}
                    />
                  </div>
                  <div className="p-5 flex flex-col gap-2 flex-1 justify-between">
                    <div className="flex flex-col gap-2">
                      <div className="flex items-center gap-2 text-[#49454d]">
                        <span className={`text-[10px] uppercase tracking-wider font-semibold ${story.categoryColor}`}>
                          {story.category}
                        </span>
                        <span>•</span>
                        <span className="text-[10px] uppercase tracking-wider">{story.readTime}</span>
                      </div>
                      <h3
                        onClick={() => onSelectStory(story)}
                        className="font-serif text-lg font-medium text-[#1d1b19] cursor-pointer hover:text-[#66587e] transition-colors"
                      >
                        {story.title}
                      </h3>
                      <p className="text-xs text-[#49454d] line-clamp-2">
                        {story.excerpt}
                      </p>
                    </div>

                    <button
                      onClick={() => onSelectStory(story)}
                      className="pt-2 inline-flex items-center gap-1 text-xs text-[#66587e] uppercase font-semibold tracking-wider hover:gap-2 transition-all self-start"
                    >
                      <span>Read Story</span>
                      <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                    </button>
                  </div>
                </article>
              ))}
            </div>

            {/* 5. INTERACTIVE NEWSLETTER PROMPT (The Pastelhook Circle) */}
            <div className="relative rounded-3xl overflow-hidden p-8 lg:p-12 bg-gradient-to-r from-[#ffffff] via-[#f3ede9] to-[#f8f2ef] shadow-[0_16px_40px_rgba(200,182,226,0.2)]">
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="flex flex-col gap-1 max-w-xl text-center lg:text-left">
                  <span className="text-xs uppercase tracking-widest text-[#795465] font-semibold">
                    Exclusive Atelier Inquiries
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl text-[#1d1b19]">
                    Join the Pastelhook Circle
                  </h3>
                  <p className="text-sm text-[#49454d]">
                    Get notified of bespoke drops & workshop journals. Receive discreet invitations to limited release viewings before public archival.
                  </p>
                </div>

                {/* Input Box */}
                <form
                  onSubmit={handleCircleSubmit}
                  className="w-full lg:w-auto flex flex-col sm:flex-row items-center gap-2"
                >
                  <div className="relative w-full sm:w-80">
                    <input
                      type="email"
                      value={circleEmail}
                      onChange={(e) => setCircleEmail(e.target.value)}
                      placeholder="Enter your correspondence email"
                      required
                      className="w-full px-5 py-3 rounded-full bg-[#ffffff] text-[#1d1b19] text-sm placeholder:text-[#7a757e] focus:outline-none shadow-inner"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full sm:w-auto px-6 py-3 rounded-full bg-gradient-to-r from-[#80c7e4] via-[#c8b6e2] to-[#fdcde1] text-[#54466b] text-xs font-semibold tracking-wider uppercase shadow-[0_4px_16px_rgba(200,182,226,0.35)] hover:shadow-[0_8px_24px_rgba(200,182,226,0.5)] transition-all"
                  >
                    Subscribe
                  </button>
                </form>
              </div>

              {circleSubscribed && (
                <div className="relative z-10 mt-3 text-center lg:text-left animate-fadeIn">
                  <span className="text-xs text-[#795465] font-semibold tracking-wider uppercase flex items-center gap-1 justify-center lg:justify-start">
                    <span className="material-symbols-outlined text-[16px]">check_circle</span>
                    <span>Welcome to the Circle. Our correspondence will reach your inbox quietly.</span>
                  </span>
                </div>
              )}

              {/* Ambient Glow circles inside box */}
              <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-[#fdcde1]/40 blur-2xl -z-0" />
              <div className="absolute -left-12 -top-12 w-48 h-48 rounded-full bg-[#80c7e4]/30 blur-2xl -z-0" />
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};
