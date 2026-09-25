import React, { useState } from 'react';
import { Product } from '../types';

interface ProductDetailModalProps {
  product: Product | null;
  onClose: () => void;
  onSubmitInquiry: (productTitle: string, notes: string) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  onClose,
  onSubmitInquiry,
}) => {
  if (!product) return null;

  const [activeImage, setActiveImage] = useState<string>(product.image);
  const [inquiryNotes, setInquiryNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const allImages = [product.image, ...(product.detailImages || [])];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmitInquiry(product.title, inquiryNotes);
    setSubmitted(true);
    setInquiryNotes('');
    setTimeout(() => {
      setSubmitted(false);
    }, 4500);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#32302e]/50 backdrop-blur-md transition-all duration-300 animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="relative w-full max-w-4xl max-h-[92vh] overflow-y-auto bg-[#ffffff] rounded-3xl shadow-[0_24px_60px_rgba(200,182,226,0.35)] p-6 sm:p-8 flex flex-col gap-6">
        {/* Close Button */}
        <button
          type="button"
          aria-label="Close details"
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#f3ede9] flex items-center justify-center text-[#49454d] hover:text-[#1d1b19] hover:bg-[#ede7e3] transition-colors z-10"
        >
          <span className="material-symbols-outlined text-[20px]">close</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Spotlight Imagery Column */}
          <div className="lg:col-span-6 flex flex-col gap-3">
            <div className="relative w-full aspect-square rounded-2xl overflow-hidden bg-[#f8f2ef] shadow-sm">
              <img
                src={activeImage}
                alt={product.title}
                className="w-full h-full object-cover transition-all duration-500"
              />
              <div className="absolute bottom-3 left-3 px-3 py-1 rounded-full bg-[#ffffff]/90 backdrop-blur-md text-[#1d1b19] text-xs font-medium shadow-sm">
                Dimensions: {product.dimensions}
              </div>
            </div>

            {/* Gallery Thumbnails */}
            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImage(img)}
                    className={`aspect-square rounded-xl overflow-hidden bg-[#f3ede9] cursor-pointer transition-all border-2 ${
                      activeImage === img
                        ? 'border-[#66587e] opacity-100 scale-102 shadow-sm'
                        : 'border-transparent opacity-80 hover:opacity-100'
                    }`}
                  >
                    <img
                      src={img}
                      alt={`${product.title} view ${idx + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Spotlight Information & Bespoke Form Column */}
          <div className="lg:col-span-6 flex flex-col justify-between">
            <div>
              <div className="inline-flex items-center gap-1.5 text-[#795465] text-xs uppercase tracking-widest font-semibold mb-1">
                <span className="material-symbols-outlined text-[16px]">verified</span>
                <span>Curated Atelier Archive</span>
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[#1d1b19] mb-2 leading-tight">
                {product.title}
              </h2>

              <p className="text-sm text-[#49454d] leading-relaxed mb-6">
                {product.fullStory || product.description}
              </p>

              {/* Specifications Table */}
              <div className="rounded-xl bg-[#f8f2ef]/90 p-4 flex flex-col gap-2.5 mb-6 text-sm">
                <div className="flex items-center justify-between pb-2 border-b border-[#cbc4ce]/30">
                  <span className="text-[#49454d]">Fiber Composition</span>
                  <span className="font-medium text-[#1d1b19] text-right">{product.fiber}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-[#cbc4ce]/30">
                  <span className="text-[#49454d]">Stitch Complexity</span>
                  <span className="font-medium text-[#1d1b19] text-right">{product.stitchComplexity}</span>
                </div>
                {product.stemReinforcement && (
                  <div className="flex items-center justify-between pb-2 border-b border-[#cbc4ce]/30">
                    <span className="text-[#49454d]">Stem Reinforcement</span>
                    <span className="font-medium text-[#1d1b19] text-right">{product.stemReinforcement}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span className="text-[#49454d]">Maintenance</span>
                  <span className="font-medium text-[#1d1b19] text-right">{product.maintenance}</span>
                </div>
              </div>
            </div>

            {/* Bespoke Commission Form */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-3 pt-2">
              <div className="flex flex-col gap-1">
                <label
                  htmlFor="inquiry-message"
                  className="text-xs uppercase tracking-wider text-[#1d1b19] font-semibold"
                >
                  Bespoke Customization Notes
                </label>
                <textarea
                  id="inquiry-message"
                  value={inquiryNotes}
                  onChange={(e) => setInquiryNotes(e.target.value)}
                  placeholder="Specify preferred pastel palette, bloom counts, or presentation date..."
                  rows={2}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-[#f8f2ef] text-sm text-[#1d1b19] placeholder:text-[#7a757e] focus:outline-none focus:ring-2 focus:ring-[#80c7e4] transition-all"
                />
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="submit"
                  className="flex-1 py-3 px-6 rounded-full bg-gradient-to-r from-[#c8b6e2] via-[#fdcde1] to-[#80c7e4] text-[#54466b] text-xs font-semibold tracking-wider uppercase shadow-[0_4px_16px_rgba(200,182,226,0.35)] hover:shadow-[0_8px_24px_rgba(200,182,226,0.5)] transition-all flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-[18px]">send</span>
                  <span>Request Bespoke Commission</span>
                </button>
              </div>

              {submitted && (
                <p className="text-center text-xs text-[#795465] font-semibold tracking-wide bg-[#fdcde1]/50 p-2.5 rounded-xl animate-fadeIn">
                  Thank you. The Pastelhook atelier will review your custom fiber inquiry discreetly.
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};
