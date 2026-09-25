import React, { useState } from 'react';
import { Product, JournalStory, CommissionInquiry } from './types';
import { INITIAL_PRODUCTS, INITIAL_STORIES, INITIAL_INQUIRIES } from './data/mockData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ProductDetailModal } from './components/ProductDetailModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { HomeScreen } from './screens/HomeScreen';
import { CollectionScreen } from './screens/CollectionScreen';
import { AboutScreen } from './screens/AboutScreen';
import { StoriesScreen } from './screens/StoriesScreen';
import { ContactScreen } from './screens/ContactScreen';
import { OwnerLoginScreen } from './screens/OwnerLoginScreen';
import { OwnerConsoleScreen } from './screens/OwnerConsoleScreen';

export default function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [stories, setStories] = useState<JournalStory[]>(INITIAL_STORIES);
  const [inquiries, setInquiries] = useState<CommissionInquiry[]>(INITIAL_INQUIRIES);
  const [wishlistIds, setWishlistIds] = useState<string[]>(['prod-1', 'prod-3']);
  const [isOwnerLoggedIn, setIsOwnerLoggedIn] = useState<boolean>(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [preselectedProductForContact, setPreselectedProductForContact] = useState<string>('');
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);

  // Wishlist toggle
  const handleToggleWishlist = (productId: string) => {
    setWishlistIds((prev) =>
      prev.includes(productId)
        ? prev.filter((id) => id !== productId)
        : [...prev, productId]
    );
  };

  const handleRequestCommission = (product: Product) => {
    setPreselectedProductForContact(product.title);
    setCurrentView('contact');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSubmitInquiry = (productTitle: string, notes: string) => {
    const newInq: CommissionInquiry = {
      id: `inq-${Date.now()}`,
      patronName: 'Atelier Private Inquirer',
      patronEmail: 'patron.correspondence@client.com',
      productTitle,
      estimatedValue: 120,
      notes: notes || 'Exquisite custom colorway specification requested.',
      receivedAt: 'Just now',
      status: 'Pending',
    };
    setInquiries((prev) => [newInq, ...prev]);
  };

  const handleAddInquiryFromContact = (inquiry: CommissionInquiry) => {
    setInquiries((prev) => [inquiry, ...prev]);
  };

  // Owner management actions
  const handleUpdateProductPrice = (productId: string, newPrice: number) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, privatePrice: newPrice } : p))
    );
  };

  const handleToggleProductStatus = (productId: string) => {
    setProducts((prev) =>
      prev.map((p) =>
        p.id === productId
          ? { ...p, status: p.status === 'live' ? 'draft' : 'live' }
          : p
      )
    );
  };

  const handleDeleteProduct = (productId: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== productId));
  };

  const handleAddProduct = (newProd: Product) => {
    setProducts((prev) => [newProd, ...prev]);
  };

  const handleAddStory = (newStory: JournalStory) => {
    setStories((prev) => [newStory, ...prev]);
  };

  const handleSendQuote = (inquiryId: string, quoteAmount: number) => {
    setInquiries((prev) =>
      prev.map((inq) =>
        inq.id === inquiryId
          ? { ...inq, status: 'Quoted', quoteSent: true, quoteAmount }
          : inq
      )
    );
  };

  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));

  // If in Owner Console view and logged in
  if (currentView === 'owner-console' && isOwnerLoggedIn) {
    return (
      <OwnerConsoleScreen
        products={products}
        stories={stories}
        inquiries={inquiries}
        onUpdateProductPrice={handleUpdateProductPrice}
        onToggleProductStatus={handleToggleProductStatus}
        onDeleteProduct={handleDeleteProduct}
        onAddProduct={handleAddProduct}
        onAddStory={handleAddStory}
        onSendQuote={handleSendQuote}
        onLogout={() => {
          setIsOwnerLoggedIn(false);
          setCurrentView('home');
        }}
        onPreviewPublic={() => {
          setCurrentView('collection');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />
    );
  }

  // If in Owner Login view
  if (currentView === 'owner-login') {
    return (
      <OwnerLoginScreen
        onLoginSuccess={() => {
          setIsOwnerLoggedIn(true);
          setCurrentView('owner-console');
        }}
        onBackToPublic={() => setCurrentView('home')}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#fef8f4] flex flex-col font-sans selection:bg-[#fdcde1] selection:text-[#795465]">
      {/* Top Navbar */}
      <Navbar
        currentView={currentView}
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isOwnerLoggedIn={isOwnerLoggedIn}
        wishlistCount={wishlistIds.length}
        onOpenWishlist={() => setIsWishlistOpen(true)}
      />

      {/* Main Screen Content with top padding for fixed navbar */}
      <main className="flex-1 pt-20">
        {currentView === 'home' && (
          <HomeScreen
            products={products.filter((p) => p.status === 'live')}
            stories={stories.filter((s) => s.status === 'live')}
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onSelectProduct={(product) => setSelectedProduct(product)}
            onSelectStory={(story) => {
              setCurrentView('stories');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'collection' && (
          <CollectionScreen
            products={products.filter((p) => p.status === 'live')}
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onSelectProduct={(product) => setSelectedProduct(product)}
            onRequestCommission={handleRequestCommission}
          />
        )}

        {currentView === 'about' && (
          <AboutScreen
            onNavigate={(view) => {
              setCurrentView(view);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}

        {currentView === 'stories' && (
          <StoriesScreen
            stories={stories.filter((s) => s.status === 'live')}
            onSelectStory={(story) => {}}
          />
        )}

        {currentView === 'contact' && (
          <ContactScreen
            preselectedProduct={preselectedProductForContact}
            onAddInquiry={handleAddInquiryFromContact}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onNavigate={(view) => {
          setCurrentView(view);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Spotlight Detail Modal */}
      {selectedProduct && (
        <ProductDetailModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onSubmitInquiry={handleSubmitInquiry}
        />
      )}

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistedProducts={wishlistedProducts}
        onRemoveFromWishlist={handleToggleWishlist}
        onSelectProduct={(prod) => {
          setSelectedProduct(prod);
          setIsWishlistOpen(false);
        }}
        onRequestCommission={handleRequestCommission}
      />
    </div>
  );
}
