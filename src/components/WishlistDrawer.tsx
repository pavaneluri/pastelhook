import React from 'react';
import { Product } from '../types';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistedProducts: Product[];
  onRemoveFromWishlist: (productId: string) => void;
  onSelectProduct: (product: Product) => void;
  onRequestCommission: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistedProducts,
  onRemoveFromWishlist,
  onSelectProduct,
  onRequestCommission,
}) => {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex justify-end bg-[#32302e]/40 backdrop-blur-sm transition-opacity animate-fadeIn"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-md bg-[#ffffff] h-full shadow-2xl p-6 flex flex-col justify-between overflow-y-auto">
        <div>
          {/* Header */}
          <div className="flex items-center justify-between pb-6 border-b border-[#cbc4ce]/30">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#795465]">favorite</span>
              <div>
                <h3 className="font-serif text-xl font-medium text-[#1d1b19]">Your Atelier Wishlist</h3>
                <p className="text-xs text-[#49454d]">
                  {wishlistedProducts.length} curated handmade creation{wishlistedProducts.length !== 1 ? 's' : ''}
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-full hover:bg-[#f3ede9] text-[#49454d]"
              aria-label="Close Wishlist"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          {/* List */}
          {wishlistedProducts.length === 0 ? (
            <div className="py-16 text-center flex flex-col items-center gap-3">
              <div className="w-16 h-16 rounded-full bg-[#f8f2ef] flex items-center justify-center text-[#c8b6e2]">
                <span className="material-symbols-outlined text-3xl">favorite_border</span>
              </div>
              <p className="font-serif text-lg text-[#1d1b19]">No pieces saved yet</p>
              <p className="text-xs text-[#49454d] max-w-xs">
                Explore the gallery and tap the heart icon on any bespoke piece to save it to your personal atelier wishlist.
              </p>
            </div>
          ) : (
            <div className="flex flex-col gap-4 py-4">
              {wishlistedProducts.map((product) => (
                <div
                  key={product.id}
                  className="flex items-center gap-3.5 p-3 rounded-2xl bg-[#f8f2ef]/80 hover:bg-[#f8f2ef] transition-colors"
                >
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-16 h-16 rounded-xl object-cover cursor-pointer"
                    onClick={() => {
                      onSelectProduct(product);
                      onClose();
                    }}
                  />
                  <div className="flex-1 min-w-0">
                    <h4
                      className="font-serif text-sm font-medium text-[#1d1b19] truncate cursor-pointer hover:text-[#66587e]"
                      onClick={() => {
                        onSelectProduct(product);
                        onClose();
                      }}
                    >
                      {product.title}
                    </h4>
                    <p className="text-[11px] text-[#49454d] truncate">{product.fiber}</p>
                    <span className="text-[10px] text-[#0c6780] font-medium">
                      {product.craftingHours}h Crafting
                    </span>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <button
                      onClick={() => onRequestCommission(product)}
                      className="p-1.5 rounded-full bg-[#c8b6e2]/50 hover:bg-[#c8b6e2] text-[#54466b] transition-colors"
                      title="Request Commission"
                    >
                      <span className="material-symbols-outlined text-sm">mail</span>
                    </button>
                    <button
                      onClick={() => onRemoveFromWishlist(product.id)}
                      className="p-1 rounded-full text-[#7a757e] hover:text-[#ba1a1a] transition-colors"
                      title="Remove"
                    >
                      <span className="material-symbols-outlined text-sm">delete_outline</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer actions */}
        {wishlistedProducts.length > 0 && (
          <div className="pt-6 border-t border-[#cbc4ce]/30 flex flex-col gap-2">
            <button
              onClick={() => {
                onClose();
                onRequestCommission(wishlistedProducts[0]);
              }}
              className="w-full py-3 rounded-full bg-gradient-to-r from-[#c8b6e2] via-[#fdcde1] to-[#80c7e4] text-[#54466b] text-xs font-semibold uppercase tracking-wider shadow-md hover:shadow-lg transition-all"
            >
              Inquire on Wishlist Pieces
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
