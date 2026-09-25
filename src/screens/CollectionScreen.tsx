import React, { useState, useMemo } from 'react';
import { Product, ProductCategory, ShadeTone } from '../types';
import { ProductCard } from '../components/ProductCard';

interface CollectionScreenProps {
  products: Product[];
  wishlistIds: string[];
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onRequestCommission: (product: Product) => void;
}

export const CollectionScreen: React.FC<CollectionScreenProps> = ({
  products,
  wishlistIds,
  onToggleWishlist,
  onSelectProduct,
  onRequestCommission,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory>('all');
  const [selectedShade, setSelectedShade] = useState<ShadeTone>('all');
  const [sortBy, setSortBy] = useState<'newest' | 'favorite' | 'loved' | 'time'>('newest');
  const [showProtocolModal, setShowProtocolModal] = useState(false);

  // Category counts
  const categoryCounts = useMemo(() => {
    return {
      all: products.length,
      bouquets: products.filter((p) => p.category === 'bouquets').length,
      amigurumi: products.filter((p) => p.category === 'amigurumi').length,
      totes: products.filter((p) => p.category === 'totes').length,
      charms: products.filter((p) => p.category === 'charms').length,
      wearables: products.filter((p) => p.category === 'wearables').length,
    };
  }, [products]);

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        // Search
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = p.title.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchFiber = p.fiber.toLowerCase().includes(q);
          const matchCat = p.categoryName.toLowerCase().includes(q);
          if (!matchTitle && !matchDesc && !matchFiber && !matchCat) return false;
        }

        // Category
        if (selectedCategory !== 'all' && p.category !== selectedCategory) {
          return false;
        }

        // Shade tone
        if (selectedShade !== 'all' && p.tone !== selectedShade) {
          return false;
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'favorite') {
          return (b.isArtisanFavorite ? 1 : 0) - (a.isArtisanFavorite ? 1 : 0);
        }
        if (sortBy === 'loved') {
          return b.lovedCount - a.lovedCount;
        }
        if (sortBy === 'time') {
          return b.craftingHours - a.craftingHours;
        }
        // newest
        return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
      });
  }, [products, searchQuery, selectedCategory, selectedShade, sortBy]);

  return (
    <div className="flex flex-col w-full relative">
      {/* Subtle Ethereal Ambient Glows (Contained) */}
      <div className="relative w-full overflow-hidden">
        <div className="absolute -top-40 -left-20 w-96 h-96 rounded-full bg-[#fdcde1]/40 blur-3xl pointer-events-none" />
        <div className="absolute top-20 right-0 w-[30rem] h-[30rem] rounded-full bg-[#80c7e4]/30 blur-3xl pointer-events-none" />
        <div className="absolute top-[45rem] left-1/3 w-[26rem] h-[26rem] rounded-full bg-[#c8b6e2]/30 blur-3xl pointer-events-none" />

        {/* Atelier Gallery Header & Editorial Opener */}
        <section className="relative w-full px-4 sm:px-8 lg:px-12 pt-8 pb-12">
          <div className="max-w-6xl mx-auto flex flex-col items-center text-center">
            {/* Artisan Eyebrow Badge */}
            <div className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-[#ffffff]/80 backdrop-blur-md shadow-sm mb-4">
              <span className="material-symbols-outlined text-[16px] text-[#66587e] fill">
                auto_awesome
              </span>
              <span className="text-xs uppercase tracking-widest text-[#49454d] font-semibold">
                Archival Edition • Spring Solstice
              </span>
            </div>

            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1d1b19] max-w-4xl tracking-tight mb-3">
              Artisan Crochet Gallery
            </h1>

            <p className="text-base sm:text-lg text-[#49454d] max-w-2xl font-light leading-relaxed">
              Every piece is thoughtfully designed, hand-looped, and one-of-a-kind. Crafted stitch by stitch using sustainable milk cotton, pure wool, and hand-spun silks.
            </p>

            {/* Limited Batches Atelier Notice Banner */}
            <div className="mt-8 w-full max-w-3xl rounded-2xl bg-gradient-to-r from-[#fdcde1]/40 via-[#ffffff]/90 to-[#80c7e4]/40 p-[1.5px] shadow-[0_8px_32px_rgba(200,182,226,0.18)]">
              <div className="w-full h-full bg-[#ffffff]/90 backdrop-blur-xl rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-4 text-left">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#c8b6e2]/40 flex items-center justify-center shrink-0">
                    <span className="material-symbols-outlined text-[#66587e] text-[20px]">
                      verified
                    </span>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-wider text-[#1d1b19] font-semibold">
                      Atelier Allocation Policy
                    </p>
                    <p className="text-xs sm:text-sm text-[#49454d]">
                      Pastelhook pieces are exclusively handmade in limited batches. For bespoke colorways & seasonal commissions, contact our private studio.
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => setShowProtocolModal(true)}
                  className="shrink-0 inline-flex items-center gap-1 px-4 py-2 rounded-full bg-[#f3ede9] text-[#1d1b19] hover:bg-[#ede7e3] transition-colors text-xs uppercase tracking-wider font-semibold"
                >
                  <span>Read Protocol</span>
                  <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Interactive Search, Category Filtration & Controls */}
        <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mb-12">
          <div className="flex flex-col gap-4">
            {/* Main Search & Sort Bar */}
            <div className="w-full bg-[#ffffff]/80 backdrop-blur-xl rounded-2xl p-4 shadow-[0_8px_32px_rgba(200,182,226,0.14)] flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#49454d]/70 text-[20px]">
                  search
                </span>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search creations (e.g., Peony bouquet, Teddy, Granny square)..."
                  className="w-full pl-12 pr-4 py-2.5 rounded-full bg-[#f8f2ef]/70 text-[#1d1b19] text-sm placeholder:text-[#49454d]/60 focus:outline-none focus:bg-[#ffffff] transition-all"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#7a757e] hover:text-[#1d1b19]"
                  >
                    <span className="material-symbols-outlined text-sm">close</span>
                  </button>
                )}
              </div>

              {/* Color Swatch Filters */}
              <div className="flex items-center gap-2 overflow-x-auto pb-1 lg:pb-0 shrink-0">
                <span className="text-[11px] uppercase tracking-wider text-[#49454d] mr-1 font-semibold whitespace-nowrap">
                  Shades:
                </span>
                <button
                  type="button"
                  onClick={() => setSelectedShade('all')}
                  className={`color-chip group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                    selectedShade === 'all'
                      ? 'bg-[#66587e] text-white font-medium shadow-sm'
                      : 'bg-[#f3ede9] hover:bg-[#ede7e3] text-[#49454d]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-[#80c7e4] via-[#fdcde1] to-[#c8b6e2]" />
                  <span>All Tones</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedShade('blue')}
                  className={`color-chip group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                    selectedShade === 'blue'
                      ? 'bg-[#80c7e4] text-[#005369] font-medium shadow-sm ring-1 ring-[#005369]'
                      : 'bg-[#f3ede9] hover:bg-[#80c7e4]/30 text-[#49454d]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#87CEEB] ring-2 ring-white" />
                  <span>Sky Blue</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedShade('pink')}
                  className={`color-chip group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                    selectedShade === 'pink'
                      ? 'bg-[#fdcde1] text-[#795465] font-medium shadow-sm ring-1 ring-[#795465]'
                      : 'bg-[#f3ede9] hover:bg-[#fdcde1]/40 text-[#49454d]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#F8C8DC] ring-2 ring-white" />
                  <span>Soft Pink</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedShade('lavender')}
                  className={`color-chip group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                    selectedShade === 'lavender'
                      ? 'bg-[#c8b6e2] text-[#54466b] font-medium shadow-sm ring-1 ring-[#54466b]'
                      : 'bg-[#f3ede9] hover:bg-[#c8b6e2]/40 text-[#49454d]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#C8B6E2] ring-2 ring-white" />
                  <span>Lavender</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedShade('cream')}
                  className={`color-chip group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                    selectedShade === 'cream'
                      ? 'bg-[#fbe7c6] text-[#795465] font-medium shadow-sm ring-1 ring-[#795465]'
                      : 'bg-[#f3ede9] hover:bg-[#ede7e3] text-[#49454d]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FFF5E4] ring-2 ring-white border border-[#cbc4ce]" />
                  <span>Buttercup Cream</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedShade('mint')}
                  className={`color-chip group flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs transition-all ${
                    selectedShade === 'mint'
                      ? 'bg-[#d4f1e6] text-[#005369] font-medium shadow-sm ring-1 ring-[#005369]'
                      : 'bg-[#f3ede9] hover:bg-[#ede7e3] text-[#49454d]'
                  }`}
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D4F1E6] ring-2 ring-white" />
                  <span>Mint Pastel</span>
                </button>
              </div>

              {/* Sort Dropdown */}
              <div className="relative shrink-0 min-w-[200px]">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="w-full appearance-none px-4 py-2.5 rounded-full bg-[#f8f2ef]/70 text-[#1d1b19] text-xs font-semibold pr-10 focus:outline-none cursor-pointer"
                >
                  <option value="newest">Sort: Newest Arrivals</option>
                  <option value="favorite">Sort: Artisan Favorite</option>
                  <option value="loved">Sort: Most Loved</option>
                  <option value="time">Sort: Crafting Time (Hours)</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-[#49454d] pointer-events-none text-[18px]">
                  expand_more
                </span>
              </div>
            </div>

            {/* Category Pills Filter Strip */}
            <div className="flex items-center gap-2 overflow-x-auto py-1">
              {[
                { id: 'all', label: `All (${categoryCounts.all})` },
                { id: 'bouquets', label: `Flowers & Bouquets (${categoryCounts.bouquets})` },
                { id: 'amigurumi', label: `Amigurumi & Plushies (${categoryCounts.amigurumi})` },
                { id: 'totes', label: `Totes & Bags (${categoryCounts.totes})` },
                { id: 'charms', label: `Keychains & Charms (${categoryCounts.charms})` },
                { id: 'wearables', label: `Wearables & Accents (${categoryCounts.wearables})` },
              ].map((tab) => {
                const isActive = selectedCategory === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setSelectedCategory(tab.id as ProductCategory)}
                    className={`shrink-0 px-5 py-2 rounded-full text-xs uppercase tracking-wider font-semibold transition-all ${
                      isActive
                        ? 'bg-[#c8b6e2] text-[#54466b] shadow-sm'
                        : 'bg-[#ffffff]/80 hover:bg-[#f3ede9] text-[#49454d]'
                    }`}
                  >
                    {tab.label}
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* Master Artisan Grid (Strictly Zero Visible Prices) */}
        <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mb-16">
          {filteredProducts.length === 0 ? (
            <div className="py-20 text-center flex flex-col items-center gap-3 bg-[#ffffff]/60 rounded-3xl p-8">
              <span className="material-symbols-outlined text-4xl text-[#c8b6e2]">filter_alt_off</span>
              <h3 className="font-serif text-xl text-[#1d1b19]">No atelier creations matched your filter</h3>
              <p className="text-sm text-[#49454d] max-w-sm">
                Try selecting a different shade or resetting your search to view all handcrafted pieces.
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCategory('all');
                  setSelectedShade('all');
                }}
                className="mt-2 px-6 py-2 rounded-full bg-[#f3ede9] text-xs uppercase tracking-wider font-semibold hover:bg-[#ede7e3]"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  isWishlisted={wishlistIds.includes(product.id)}
                  onToggleWishlist={onToggleWishlist}
                  onSelectProduct={onSelectProduct}
                  onRequestCommission={onRequestCommission}
                />
              ))}
            </div>
          )}
        </section>

        {/* Bespoke Artisan Fiber Metrics (Data visualization without prices) */}
        <section className="relative w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12 mb-16">
          <div className="rounded-3xl bg-[#ffffff]/70 backdrop-blur-xl p-8 sm:p-10 shadow-[0_8px_32px_rgba(200,182,226,0.12)]">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center md:text-left">
              <div className="flex flex-col gap-1 p-2">
                <span className="font-serif text-4xl lg:text-5xl text-[#66587e]">100%</span>
                <span className="font-serif text-lg font-medium text-[#1d1b19]">Pure Artisan Hands</span>
                <p className="text-xs text-[#49454d] leading-relaxed">
                  Zero synthetic assembly line automation. Every knot is inspected under natural studio light.
                </p>
              </div>

              <div className="flex flex-col gap-1 p-2">
                <span className="font-serif text-4xl lg:text-5xl text-[#795465]">16–48h</span>
                <span className="font-serif text-lg font-medium text-[#1d1b19]">Patience per Piece</span>
                <p className="text-xs text-[#49454d] leading-relaxed">
                  True slow-craft luxury requiring dozens of continuous loop rotations and calibrated tension.
                </p>
              </div>

              <div className="flex flex-col gap-1 p-2">
                <span className="font-serif text-4xl lg:text-5xl text-[#0c6780]">Eco-Pure</span>
                <span className="font-serif text-lg font-medium text-[#1d1b19]">Natural Fibers</span>
                <p className="text-xs text-[#49454d] leading-relaxed">
                  GOTS certified organic cotton, hypoallergenic milk yarn, and non-toxic botanical dyes.
                </p>
              </div>

              <div className="flex flex-col gap-1 p-2">
                <span className="font-serif text-4xl lg:text-5xl text-[#1d1b19]">Direct</span>
                <span className="font-serif text-lg font-medium text-[#1d1b19]">Maker Atelier</span>
                <p className="text-xs text-[#49454d] leading-relaxed">
                  Private atelier correspondence and custom tailoring directly with our master hook artist.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* Atelier Protocol Modal */}
      {showProtocolModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#32302e]/40 backdrop-blur-sm animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowProtocolModal(false);
          }}
        >
          <div className="bg-[#ffffff] rounded-3xl p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setShowProtocolModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#f3ede9]"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
            <div className="flex items-center gap-2 text-[#795465] mb-2">
              <span className="material-symbols-outlined">policy</span>
              <span className="text-xs uppercase font-semibold tracking-wider">Atelier Policy</span>
            </div>
            <h3 className="font-serif text-2xl font-medium text-[#1d1b19] mb-3">
              Allocation & Commission Protocol
            </h3>
            <div className="text-sm text-[#49454d] space-y-3 leading-relaxed">
              <p>
                To honor the unhurried craft of needle-looping, Pastelhook creates no mass-inventory. In keeping with ultra-luxury bespoke salons, piece valuations and commissioning are managed exclusively through confidential correspondence.
              </p>
              <p>
                Collectors and patrons may request personalized bouquet palettes, bespoke sizes for keepsake blankets, or customized monogram ribbon tags.
              </p>
              <p>
                Each creation ships in sustainable hand-folded mulberry boxes wrapped with soft blush wax seal seals and a signed certificate of needlecraft provenance.
              </p>
            </div>
            <button
              onClick={() => setShowProtocolModal(false)}
              className="mt-6 w-full py-3 rounded-full bg-[#66587e] text-white text-xs font-semibold uppercase tracking-wider hover:opacity-95"
            >
              Understood
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
