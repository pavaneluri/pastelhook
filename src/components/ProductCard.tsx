import React from 'react';
import { Product } from '../types';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onRequestCommission: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onSelectProduct,
  onRequestCommission,
}) => {
  return (
    <article className="group relative flex flex-col bg-[#ffffff]/80 backdrop-blur-xl rounded-2xl p-4 shadow-[0_8px_32px_rgba(200,182,226,0.16)] hover:shadow-[0_16px_40px_rgba(248,200,220,0.28)] transition-all duration-300">
      {/* Arch Shaped Photo Shell */}
      <div className="relative w-full aspect-[4/5] rounded-xl overflow-hidden bg-[#f8f2ef] mb-4">
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />

        {/* Badges Overlay */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 pointer-events-none">
          {product.badges.map((badge, idx) => (
            <span
              key={idx}
              className={`px-2.5 py-1 rounded-full bg-[#ffffff]/90 backdrop-blur-md text-[11px] font-semibold uppercase tracking-wider shadow-sm ${
                idx % 2 === 0 ? 'text-[#795465]' : 'text-[#0c6780]'
              }`}
            >
              {badge}
            </span>
          ))}
        </div>

        {/* Wishlist Heart Toggle Button */}
        <button
          type="button"
          aria-label={`Add ${product.title} to Wishlist`}
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product.id);
          }}
          className={`wishlist-btn absolute top-3 right-3 w-10 h-10 rounded-full bg-[#ffffff]/90 backdrop-blur-md flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-sm ${
            isWishlisted ? 'text-[#795465]' : 'text-[#49454d] hover:text-[#795465]'
          }`}
        >
          <span
            className={`material-symbols-outlined text-[20px] transition-colors ${
              isWishlisted ? 'fill' : ''
            }`}
          >
            favorite
          </span>
        </button>

        {/* Crafting Time Floating Badge */}
        <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2.5 py-1 rounded-full bg-[#ffffff]/85 backdrop-blur-md text-[11px] text-[#1d1b19] font-medium flex items-center gap-1 shadow-sm">
            <span className="material-symbols-outlined text-[14px] text-[#66587e]">schedule</span>
            {product.craftingHours} Handcrafted Hours
          </span>
          <span className="px-2.5 py-1 rounded-full bg-[#ffffff]/85 backdrop-blur-md text-[11px] text-[#1d1b19] font-medium flex items-center gap-1 shadow-sm">
            <span
              className={`w-2 h-2 rounded-full ${
                product.inventoryModel === 'In Vault'
                  ? 'bg-[#795465]'
                  : product.inventoryModel === 'Bespoke Only'
                  ? 'bg-[#0c6780]'
                  : 'bg-[#66587e]'
              }`}
            />
            {product.inventoryModel === 'In Vault'
              ? 'In Atelier Vault'
              : product.inventoryModel}
          </span>
        </div>
      </div>

      {/* Product Details */}
      <div className="flex flex-col flex-1">
        <div className="mb-1">
          <h3 className="font-serif text-xl font-semibold text-[#1d1b19] group-hover:text-[#66587e] transition-colors line-clamp-1">
            {product.title}
          </h3>
        </div>

        <p className="text-sm text-[#49454d]/85 mb-3 line-clamp-2">
          {product.description}
        </p>

        <div className="flex items-center gap-1.5 text-[#49454d] text-xs mb-4">
          <span className="material-symbols-outlined text-[16px] text-[#0c6780]">inventory_2</span>
          <span className="truncate">{product.fiber}</span>
        </div>

        {/* Card Actions (Zero visible price, bespoke inquiry CTA) */}
        <div className="mt-auto pt-2 flex items-center gap-2">
          <button
            type="button"
            onClick={() => onSelectProduct(product)}
            className="flex-1 py-2 px-4 rounded-full bg-[#f3ede9] hover:bg-[#ede7e3] text-[#1d1b19] text-xs font-semibold tracking-wider uppercase transition-all flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-outlined text-[16px]">visibility</span>
            <span>View Details</span>
          </button>
          <button
            type="button"
            aria-label="Request bespoke commission"
            title="Request Bespoke Commission"
            onClick={() => onRequestCommission(product)}
            className="w-10 h-10 shrink-0 rounded-full bg-gradient-to-r from-[#c8b6e2] to-[#fdcde1] text-[#54466b] flex items-center justify-center hover:shadow-[0_4px_16px_rgba(200,182,226,0.35)] transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">mail</span>
          </button>
        </div>
      </div>
    </article>
  );
};
