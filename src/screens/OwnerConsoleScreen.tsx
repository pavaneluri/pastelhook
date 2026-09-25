import React, { useState, useMemo } from 'react';
import { Product, JournalStory, CommissionInquiry, ProductCategory } from '../types';

interface OwnerConsoleScreenProps {
  products: Product[];
  stories: JournalStory[];
  inquiries: CommissionInquiry[];
  onUpdateProductPrice: (productId: string, newPrice: number) => void;
  onToggleProductStatus: (productId: string) => void;
  onDeleteProduct: (productId: string) => void;
  onAddProduct: (product: Product) => void;
  onAddStory: (story: JournalStory) => void;
  onSendQuote: (inquiryId: string, quoteAmount: number) => void;
  onLogout: () => void;
  onPreviewPublic: () => void;
}

export const OwnerConsoleScreen: React.FC<OwnerConsoleScreenProps> = ({
  products,
  stories,
  inquiries,
  onUpdateProductPrice,
  onToggleProductStatus,
  onDeleteProduct,
  onAddProduct,
  onAddStory,
  onSendQuote,
  onLogout,
  onPreviewPublic,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'pricing' | 'stories' | 'inquiries'>('pricing');
  const [searchTable, setSearchTable] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [editingPriceId, setEditingPriceId] = useState<string | null>(null);
  const [tempPrice, setTempPrice] = useState<string>('');
  const [savedPriceId, setSavedPriceId] = useState<string | null>(null);

  // Drawer & Modals state
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showLogsModal, setShowLogsModal] = useState(false);
  const [showQuoteModal, setShowQuoteModal] = useState<CommissionInquiry | null>(null);
  const [quoteInput, setQuoteInput] = useState<string>('');
  const [showNewStoryModal, setShowNewStoryModal] = useState(false);
  const [showInboxModal, setShowInboxModal] = useState(false);

  // New product form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<ProductCategory>('bouquets');
  const [newHours, setNewHours] = useState('16.0');
  const [newFiber, setNewFiber] = useState('100% Combed Milk Cotton & Mulberry Silk');
  const [newDesc, setNewDesc] = useState('');
  const [newPrice, setNewPrice] = useState('95.00');
  const [newImage, setNewImage] = useState('https://lh3.googleusercontent.com/aida-public/AB6AXuCASjDH9oeCZ69bQu3vymqmjKU7SGGsJRnMpQlUDEmaYaImYoBa_H8iaONKZIZJXmQPKnvn5PGBCkJu_bC7E256s0m9o7llvJZ0be5qXahcpaKYfUS418gZ88MtuADb5vq1m305Kq_COLgPR5fc7G8GeCL-Kc7Qp_0xHnttkDOX5NhMsHux6gH10l18YnBuOryVS7MR33rGk0H7EdodkfoMkmlkuZFGYb6JZ-qZFais-HF8k2ta4e1Q');

  // New story form state
  const [storyTitle, setStoryTitle] = useState('');
  const [storyCategory, setStoryCategory] = useState('Studio Diaries');
  const [storyExcerpt, setStoryExcerpt] = useState('');
  const [storyContent, setStoryContent] = useState('');

  // Dynamically calculate total catalog valuation from private prices!
  const totalCatalogValue = useMemo(() => {
    return products.reduce((acc, p) => acc + (p.privatePrice || 0) * (p.inventoryModel === 'In Vault' ? (p.vaultCount || 1) : 1), 0);
  }, [products]);

  // Filtered table rows
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      if (searchTable.trim()) {
        const q = searchTable.toLowerCase();
        const matchTitle = p.title.toLowerCase().includes(q);
        const matchSku = p.sku.toLowerCase().includes(q);
        const matchCat = p.categoryName.toLowerCase().includes(q);
        if (!matchTitle && !matchSku && !matchCat) return false;
      }
      if (categoryFilter !== 'all' && p.category !== categoryFilter) {
        return false;
      }
      return true;
    });
  }, [products, searchTable, categoryFilter]);

  const handleSavePrice = (productId: string) => {
    const val = parseFloat(tempPrice);
    if (!isNaN(val) && val >= 0) {
      onUpdateProductPrice(productId, val);
      setEditingPriceId(null);
      setSavedPriceId(productId);
      setTimeout(() => setSavedPriceId(null), 2000);
    }
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const prod: Product = {
      id: `prod-${Date.now()}`,
      sku: `PH-NEW-${Math.floor(100 + Math.random() * 900)}`,
      title: newTitle,
      category: newCategory,
      categoryName:
        newCategory === 'bouquets'
          ? 'Botanical Keepsake'
          : newCategory === 'amigurumi'
          ? 'Amigurumi Heirloom'
          : newCategory === 'totes'
          ? 'Haute Wearable'
          : 'Living Decor',
      description: newDesc || 'Hand-knotted bespoke crochet creation using pure organic yarns.',
      fiber: newFiber,
      craftingHours: parseFloat(newHours) || 12,
      status: 'live',
      inventoryModel: 'Made to Order',
      privatePrice: parseFloat(newPrice) || 95,
      image: newImage,
      detailImages: [newImage],
      dimensions: 'Bespoke Custom Tailored',
      stitchComplexity: 'Curated Loop • Calibrated Tension',
      maintenance: 'Gentle Air Dry',
      tone: 'pink',
      badges: ['New Addition', 'Atelier Exclusive'],
      lovedCount: 1,
      createdAt: new Date().toISOString().split('T')[0],
    };

    onAddProduct(prod);
    setIsDrawerOpen(false);
    // Reset
    setNewTitle('');
    setNewDesc('');
    setNewPrice('95.00');
  };

  const handleCreateStory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!storyTitle.trim()) return;

    const story: JournalStory = {
      id: `story-${Date.now()}`,
      title: storyTitle,
      category: storyCategory,
      categoryColor: 'text-[#66587e]',
      readTime: '4 Min Read',
      excerpt: storyExcerpt || 'Artisan notes from our morning studio sessions.',
      content: storyContent || storyExcerpt,
      image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBaJ5plZK9-OBKNroBhHqztYr1ZSZQXi39OHuxJ6o70OS-ngYKUvhPQ96sVwBCYTEeCPiLxCntDAw5VHUcRnWfNLbPy5tyr1qaCW0D4LmqromKKON1AoKC25ef8Fir5x9iJn1Q81yHVw4XNsuIkV4hFI1WZJIvoynnCc1VZPN6tMsYFKCFCZTR8c-sq8r_t0n2YleDtk-1QX9CM0xXDR89wVTMwRRMfjaeJ3zOeauiCx6BYwyhV2h1q',
      date: 'Today',
      readsCount: 12,
      status: 'live',
    };

    onAddStory(story);
    setShowNewStoryModal(false);
    setStoryTitle('');
    setStoryExcerpt('');
    setStoryContent('');
  };

  const handleSendQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (showQuoteModal && quoteInput) {
      onSendQuote(showQuoteModal.id, parseFloat(quoteInput) || showQuoteModal.estimatedValue);
      setShowQuoteModal(null);
      setQuoteInput('');
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-[#fef8f4] text-[#1d1b19]">
      {/* Atelier Sidebar */}
      <aside className="w-72 shrink-0 bg-[#f8f2ef] flex flex-col justify-between p-6 shadow-sm border-r border-[#cbc4ce]/30">
        <div className="flex flex-col gap-6">
          {/* Brand Mark */}
          <div className="flex items-center gap-3 px-2 py-1">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#c8b6e2] via-[#fdcde1] to-[#baeaff] flex items-center justify-center shadow-md">
              <span className="material-symbols-outlined text-[#66587e] text-xl">all_inclusive</span>
            </div>
            <div>
              <h1 className="font-serif text-xl leading-tight text-[#1d1b19] tracking-tight">
                Pastelhook
              </h1>
              <p className="text-[10px] text-[#795465] uppercase tracking-widest font-semibold">
                Haute Atelier Console
              </p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="flex flex-col gap-1.5 mt-2">
            {/* Overview */}
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left ${
                activeTab === 'overview'
                  ? 'bg-[#ffffff] shadow-sm text-[#66587e] font-semibold'
                  : 'text-[#49454d] hover:bg-[#f3ede9]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg fill">dashboard</span>
                <span className="text-sm">Overview</span>
              </div>
              {activeTab === 'overview' && <span className="w-2 h-2 rounded-full bg-[#66587e]" />}
            </button>

            {/* Manage Products */}
            <button
              onClick={() => setActiveTab('products')}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left ${
                activeTab === 'products'
                  ? 'bg-[#ffffff] shadow-sm text-[#66587e] font-semibold'
                  : 'text-[#49454d] hover:bg-[#f3ede9]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">styler</span>
                <span className="text-sm">Manage Products</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#ecdcff] text-[#211537] text-xs font-semibold">
                {products.length}
              </span>
            </button>

            {/* Add New Product Trigger */}
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-[#49454d] hover:bg-[#f3ede9] transition-all text-left w-full"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">add_circle</span>
                <span className="text-sm">Add New Product</span>
              </div>
              <span className="material-symbols-outlined text-xs text-[#7a757e]">arrow_forward</span>
            </button>

            {/* Private Price Management */}
            <button
              onClick={() => setActiveTab('pricing')}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left ${
                activeTab === 'pricing'
                  ? 'bg-[#ffd8e7] text-[#2e1221] shadow-sm font-semibold'
                  : 'text-[#49454d] hover:bg-[#f3ede9]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg fill">lock</span>
                <span className="text-sm">Private Prices</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#795465] text-white text-[10px] font-semibold tracking-wide">
                RLS LOCKED
              </span>
            </button>

            {/* Stories & Posts */}
            <button
              onClick={() => setActiveTab('stories')}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all text-left ${
                activeTab === 'stories'
                  ? 'bg-[#ffffff] shadow-sm text-[#66587e] font-semibold'
                  : 'text-[#49454d] hover:bg-[#f3ede9]'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">auto_stories</span>
                <span className="text-sm">Stories & Posts</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#ede7e3] text-[#49454d] text-xs font-semibold">
                {stories.length}
              </span>
            </button>

            {/* Inquiries */}
            <button
              onClick={() => setShowInboxModal(true)}
              className="flex items-center justify-between px-4 py-3 rounded-xl text-[#49454d] hover:bg-[#f3ede9] transition-all text-left"
            >
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-lg">inbox</span>
                <span className="text-sm">Inquiries Queue</span>
              </div>
              <span className="px-2 py-0.5 rounded-full bg-[#c8b6e2] text-[#54466b] text-xs font-semibold">
                {inquiries.length}
              </span>
            </button>
          </nav>
        </div>

        {/* User Footer & Logout */}
        <div className="flex flex-col gap-3 pt-6 border-t border-[#cbc4ce]/30">
          <div className="flex items-center justify-between px-3 py-2 rounded-xl bg-[#f3ede9]">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#baeaff] flex items-center justify-center text-[#0c6780] font-bold text-xs">
                A
              </div>
              <div className="flex flex-col">
                <span className="text-xs font-semibold text-[#1d1b19]">Artisan Owner</span>
                <span className="text-[10px] text-[#49454d]">Tier-0 Secret Auth</span>
              </div>
            </div>
            <span className="material-symbols-outlined text-[#0c6780] text-sm fill">
              verified_user
            </span>
          </div>

          <button
            onClick={onLogout}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded-full bg-[#ede7e3] hover:bg-[#ded9d5] text-[#1d1b19] text-xs uppercase tracking-wider font-semibold transition-all"
          >
            <span className="material-symbols-outlined text-sm">logout</span>
            <span>Logout (Secure Session)</span>
          </button>
        </div>
      </aside>

      {/* Main Workspace Content */}
      <div className="flex-1 flex flex-col px-6 sm:px-10 py-8 overflow-y-auto">
        {/* Top Action Bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-8 border-b border-[#cbc4ce]/20">
          <div>
            <div className="flex items-center gap-3">
              <span className="font-serif text-2xl sm:text-3xl text-[#1d1b19]">
                Pastelhook Atelier Administration
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#ffffff] text-[#1d1b19] shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#0c6780] animate-pulse" />
                <span className="text-[11px] uppercase tracking-wider text-[#0c6780] font-semibold">
                  Production Live
                </span>
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#49454d] mt-1">
              Welcome back, Artisan Owner. Catalog pricing remains strictly isolated from public visitors and indexing crawlers.
            </p>
          </div>

          <div className="flex items-center gap-3 flex-wrap">
            <button
              onClick={() => setIsDrawerOpen(true)}
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-[#c8b6e2] to-[#fdcde1] hover:from-[#66587e] hover:to-[#795465] hover:text-white text-[#54466b] text-xs font-semibold uppercase tracking-wider shadow-md transition-all"
            >
              <span className="material-symbols-outlined text-sm">add</span>
              <span>New Product</span>
            </button>

            <button
              onClick={() => alert('Media Library sync initialized. 32 studio high-res RAW assets linked.')}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#ffffff] hover:bg-[#f3ede9] shadow-sm text-[#1d1b19] text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <span className="material-symbols-outlined text-sm">cloud_upload</span>
              <span>Upload Images</span>
            </button>

            <button
              onClick={onPreviewPublic}
              className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-[#ede7e3] hover:bg-[#e7e1de] text-[#795465] text-xs font-semibold uppercase tracking-wider transition-all"
            >
              <span className="material-symbols-outlined text-sm">visibility</span>
              <span>Preview Public Site <span className="font-normal opacity-75">(No Prices)</span></span>
            </button>
          </div>
        </div>

        {/* KPI Status Metric Ribbon */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 py-8">
          {/* KPI 1 */}
          <div className="p-6 rounded-2xl bg-[#ffffff] shadow-sm flex flex-col justify-between relative overflow-hidden border border-[#cbc4ce]/20">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#49454d] uppercase tracking-wider font-semibold">
                Handmade Creations
              </span>
              <div className="w-8 h-8 rounded-full bg-[#ecdcff] flex items-center justify-center text-[#66587e]">
                <span className="material-symbols-outlined text-sm">palette</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="font-serif text-3xl text-[#1d1b19] font-medium tracking-tight">
                {products.length}
              </span>
              <span className="text-xs text-[#49454d] ml-1 font-medium">Active Pieces</span>
            </div>
            <p className="text-[11px] text-[#66587e] mt-2 flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-xs">pending_actions</span>
              <span>4 draft pieces in reserve</span>
            </p>
          </div>

          {/* KPI 2 (Confidential Catalog Valuation) */}
          <div className="p-6 rounded-2xl bg-[#ffffff] shadow-sm flex flex-col justify-between relative overflow-hidden border border-[#cbc4ce]/20">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#795465] uppercase tracking-wider font-semibold flex items-center gap-1">
                <span className="material-symbols-outlined text-xs">lock</span>
                <span>Catalog Value</span>
              </span>
              <div className="w-8 h-8 rounded-full bg-[#ffd8e7] flex items-center justify-center text-[#795465]">
                <span className="material-symbols-outlined text-sm">payments</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="font-serif text-3xl text-[#795465] font-semibold tracking-tight">
                ${totalCatalogValue.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </span>
            </div>
            <p className="text-[11px] text-[#49454d] mt-2 flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-xs">visibility_off</span>
              <span>Owner view only • Hidden from public</span>
            </p>
          </div>

          {/* KPI 3 */}
          <div className="p-6 rounded-2xl bg-[#ffffff] shadow-sm flex flex-col justify-between relative overflow-hidden border border-[#cbc4ce]/20">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#49454d] uppercase tracking-wider font-semibold">
                Inquiries & Bespoke
              </span>
              <div className="w-8 h-8 rounded-full bg-[#baeaff] flex items-center justify-center text-[#0c6780]">
                <span className="material-symbols-outlined text-sm">mark_email_unread</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="font-serif text-3xl text-[#0c6780] font-semibold tracking-tight">
                {inquiries.length + 16}
              </span>
              <span className="text-xs text-[#49454d] ml-1 font-medium">Pending</span>
            </div>
            <p className="text-[11px] text-[#49454d] mt-2 flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-xs">schedule</span>
              <span>Avg. response window: 3.4 hrs</span>
            </p>
          </div>

          {/* KPI 4 */}
          <div className="p-6 rounded-2xl bg-[#ffffff] shadow-sm flex flex-col justify-between relative overflow-hidden border border-[#cbc4ce]/20">
            <div className="flex items-center justify-between">
              <span className="text-xs text-[#49454d] uppercase tracking-wider font-semibold">
                Published Stories
              </span>
              <div className="w-8 h-8 rounded-full bg-[#ede7e3] flex items-center justify-center text-[#1d1b19]">
                <span className="material-symbols-outlined text-sm">menu_book</span>
              </div>
            </div>
            <div className="mt-4">
              <span className="font-serif text-3xl text-[#1d1b19] font-medium tracking-tight">
                {stories.length}
              </span>
              <span className="text-xs text-[#49454d] ml-1 font-medium">Live</span>
            </div>
            <p className="text-[11px] text-[#49454d] mt-2 flex items-center gap-1 font-medium">
              <span className="material-symbols-outlined text-xs">insights</span>
              <span>89.4% reader inquiry conversion</span>
            </p>
          </div>
        </section>

        {/* Private Price RLS Security Warning Banner */}
        <section className="mb-8 p-5 rounded-2xl bg-[#f8f2ef] shadow-sm flex flex-col md:flex-row items-start md:items-center gap-4 border border-[#cbc4ce]/30">
          <div className="w-12 h-12 rounded-full bg-[#ffd8e7] flex items-center justify-center shrink-0 shadow-sm">
            <span className="material-symbols-outlined text-[#795465] text-2xl fill">
              verified_user
            </span>
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 flex-wrap">
              <h2 className="text-sm font-bold text-[#1d1b19]">
                🔒 PRIVATE PRICE MANAGEMENT PROTOCOL
              </h2>
              <span className="px-2.5 py-0.5 rounded-full bg-[#fdcde1] text-[#795465] text-[10px] uppercase font-bold">
                Server-Side RLS Protected
              </span>
            </div>
            <p className="text-xs sm:text-sm text-[#49454d] mt-1 leading-relaxed">
              These prices are securely stored in the private database and restricted by server-side Row Level Security (RLS). Prices are <strong className="text-[#1d1b19]">STRICTLY INVISIBLE</strong> to the public website, search crawlers, and public API responses. Visitors interact exclusively via Private Commission Concierge.
            </p>
          </div>
          <div className="shrink-0 flex items-center gap-2">
            <button
              onClick={() => setShowLogsModal(true)}
              className="px-4 py-2 rounded-full bg-[#ffffff] text-[#795465] text-xs font-semibold shadow-sm hover:bg-[#f3ede9] transition-all"
            >
              Audit Access Logs
            </button>
          </div>
        </section>

        {/* Private Price & Inventory Table Section */}
        <section className="rounded-2xl bg-[#ffffff] shadow-sm p-6 mb-8 border border-[#cbc4ce]/20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#cbc4ce]/20">
            <div>
              <h3 className="font-serif text-xl sm:text-2xl text-[#1d1b19]">
                Private Price Inventory & Stock Ledger
              </h3>
              <p className="text-xs sm:text-sm text-[#49454d]">
                Configure secret atelier valuations and commission availability thresholds.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <span className="material-symbols-outlined absolute left-3 top-2.5 text-[#7a757e] text-base">
                  search
                </span>
                <input
                  type="text"
                  value={searchTable}
                  onChange={(e) => setSearchTable(e.target.value)}
                  placeholder="Search creations..."
                  className="pl-9 pr-4 py-2 rounded-full bg-[#f8f2ef] text-xs text-[#1d1b19] placeholder:text-[#7a757e] focus:outline-none focus:bg-[#ffffff] focus:ring-1 focus:ring-[#80c7e4] transition-all w-52 sm:w-60"
                />
              </div>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="px-3.5 py-2 rounded-full bg-[#f8f2ef] text-xs text-[#1d1b19] focus:outline-none transition-all cursor-pointer font-medium"
              >
                <option value="all">All Categories</option>
                <option value="bouquets">Heirloom Botanicals</option>
                <option value="amigurumi">Amigurumi Keepsakes</option>
                <option value="totes">Atelier Wearables</option>
                <option value="wearables">Living Decor & Wraps</option>
              </select>
            </div>
          </div>

          {/* Table Container */}
          <div className="overflow-x-auto pt-2">
            <table className="w-full text-left border-collapse text-sm">
              <thead>
                <tr className="bg-[#f8f2ef] text-[#49454d] text-xs uppercase tracking-wider font-semibold">
                  <th className="py-3 px-4 rounded-l-xl">Creation</th>
                  <th className="py-3 px-4">Category & Fibers</th>
                  <th className="py-3 px-4">Crafting Time</th>
                  <th className="py-3 px-4">Live Status</th>
                  <th className="py-3 px-4">Private Owner Price</th>
                  <th className="py-3 px-4">Inventory Model</th>
                  <th className="py-3 px-4 text-right rounded-r-xl">Atelier Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#cbc4ce]/10">
                {filteredProducts.map((prod) => {
                  const isEditing = editingPriceId === prod.id;
                  const isSaved = savedPriceId === prod.id;

                  return (
                    <tr key={prod.id} className="hover:bg-[#f8f2ef]/60 transition-colors">
                      {/* Product Name & SKU */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={prod.image}
                            alt={prod.title}
                            className="w-12 h-12 rounded-xl object-cover shadow-sm shrink-0"
                          />
                          <div className="flex flex-col min-w-0">
                            <span className="font-serif text-sm font-semibold text-[#1d1b19] truncate max-w-[200px]">
                              {prod.title}
                            </span>
                            <span className="text-[11px] text-[#7a757e]">SKU: {prod.sku}</span>
                          </div>
                        </div>
                      </td>

                      {/* Category & Fibers */}
                      <td className="py-4 px-4">
                        <div className="flex flex-col gap-1">
                          <span className="text-xs text-[#1d1b19] font-medium">{prod.categoryName}</span>
                          <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-[#ffd8e7] text-[#2e1221] text-[10px] w-fit font-medium">
                            {prod.fiber}
                          </span>
                        </div>
                      </td>

                      {/* Crafting Time */}
                      <td className="py-4 px-4 text-xs text-[#49454d]">
                        <span className="inline-flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm text-[#66587e]">
                            schedule
                          </span>
                          <span>{prod.craftingHours} hrs</span>
                        </span>
                      </td>

                      {/* Live Status Toggle */}
                      <td className="py-4 px-4">
                        <button
                          type="button"
                          onClick={() => onToggleProductStatus(prod.id)}
                          className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all ${
                            prod.status === 'live'
                              ? 'bg-[#ffffff] text-[#0c6780] shadow-sm border border-[#0c6780]/20'
                              : 'bg-[#ede7e3] text-[#7a757e]'
                          }`}
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${
                              prod.status === 'live' ? 'bg-[#0c6780]' : 'bg-[#7a757e]'
                            }`}
                          />
                          <span>{prod.status === 'live' ? 'Live Public' : 'Draft'}</span>
                        </button>
                      </td>

                      {/* Secret Owner Price Inline Input */}
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-2">
                          {isEditing ? (
                            <div className="flex items-center px-2.5 py-1 rounded-lg bg-[#ffffff] border-2 border-[#66587e] shadow-sm w-28">
                              <span className="text-[#795465] text-xs font-bold mr-1">$</span>
                              <input
                                type="number"
                                step="0.5"
                                value={tempPrice}
                                onChange={(e) => setTempPrice(e.target.value)}
                                onKeyDown={(e) => {
                                  if (e.key === 'Enter') handleSavePrice(prod.id);
                                }}
                                className="w-full bg-transparent text-xs font-bold text-[#795465] focus:outline-none"
                                autoFocus
                              />
                            </div>
                          ) : (
                            <div
                              onClick={() => {
                                setEditingPriceId(prod.id);
                                setTempPrice(prod.privatePrice.toFixed(2));
                              }}
                              className="flex items-center px-3 py-1.5 rounded-lg bg-[#ede7e3] hover:bg-[#ded9d5] cursor-pointer transition-all w-28"
                              title="Click to edit secret price"
                            >
                              <span className="text-[#795465] text-xs font-bold mr-1">$</span>
                              <span className="text-xs font-bold text-[#795465]">
                                {prod.privatePrice.toFixed(2)}
                              </span>
                            </div>
                          )}

                          {isEditing ? (
                            <button
                              type="button"
                              onClick={() => handleSavePrice(prod.id)}
                              className="p-1.5 rounded-full bg-[#c8b6e2] text-[#54466b] hover:bg-[#66587e] hover:text-white transition-all"
                              title="Save Price"
                            >
                              <span className="material-symbols-outlined text-sm">check</span>
                            </button>
                          ) : isSaved ? (
                            <span className="text-xs text-[#0c6780] font-bold animate-fadeIn">✓</span>
                          ) : (
                            <button
                              type="button"
                              onClick={() => {
                                setEditingPriceId(prod.id);
                                setTempPrice(prod.privatePrice.toFixed(2));
                              }}
                              className="p-1.5 rounded-full hover:bg-[#f3ede9] text-[#7a757e]"
                              title="Edit Price"
                            >
                              <span className="material-symbols-outlined text-sm">edit</span>
                            </button>
                          )}
                        </div>
                      </td>

                      {/* Inventory Model */}
                      <td className="py-4 px-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${
                            prod.inventoryModel === 'In Vault'
                              ? 'bg-[#ecdcff] text-[#211537]'
                              : prod.inventoryModel === 'Bespoke Only'
                              ? 'bg-[#fdcde1] text-[#795465]'
                              : 'bg-[#ede7e3] text-[#1d1b19]'
                          }`}
                        >
                          {prod.inventoryModel === 'In Vault'
                            ? `${prod.vaultCount || 3} In Vault`
                            : prod.inventoryModel}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 text-right">
                        <div className="flex items-center justify-end gap-1">
                          <button
                            type="button"
                            onClick={() => {
                              setEditingPriceId(prod.id);
                              setTempPrice(prod.privatePrice.toFixed(2));
                            }}
                            className="p-1.5 rounded-full hover:bg-[#f3ede9] text-[#49454d] transition-all"
                            title="Edit Private Details"
                          >
                            <span className="material-symbols-outlined text-base">edit</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => alert(`Photo assets for ${prod.title}: 4 high-res angles loaded.`)}
                            className="p-1.5 rounded-full hover:bg-[#f3ede9] text-[#49454d] transition-all"
                            title="Manage Photos"
                          >
                            <span className="material-symbols-outlined text-base">photo_library</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              if (confirm(`Archive piece "${prod.title}" from atelier?`)) {
                                onDeleteProduct(prod.id);
                              }
                            }}
                            className="p-1.5 rounded-full hover:bg-[#ffdad6] text-[#ba1a1a] transition-all"
                            title="Archive Creation"
                          >
                            <span className="material-symbols-outlined text-base">delete_outline</span>
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>

        {/* Split Layout: Stories Manager + Private Commission Queue */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-8">
          {/* Posts & Stories Quick Manager */}
          <section className="lg:col-span-7 rounded-2xl bg-[#ffffff] shadow-sm p-6 flex flex-col justify-between border border-[#cbc4ce]/20">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#cbc4ce]/20">
                <div>
                  <h3 className="font-serif text-xl text-[#1d1b19]">Journal & Atelier Stories</h3>
                  <p className="text-xs text-[#49454d]">
                    Articles published to educate connoisseurs on stitch heritage and fiber sourcing.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowNewStoryModal(true)}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#f3ede9] hover:bg-[#ede7e3] text-[#1d1b19] text-xs uppercase font-semibold transition-all"
                >
                  <span className="material-symbols-outlined text-sm">add</span>
                  <span>New Story</span>
                </button>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                {stories.map((story) => (
                  <div
                    key={story.id}
                    className="flex items-center justify-between p-3 rounded-xl bg-[#f8f2ef] hover:bg-[#f3ede9] transition-all"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#ecdcff] flex items-center justify-center text-[#66587e] shrink-0">
                        <span className="material-symbols-outlined text-lg">auto_stories</span>
                      </div>
                      <div className="min-w-0">
                        <h4 className="text-xs font-semibold text-[#1d1b19] truncate max-w-xs sm:max-w-md">
                          {story.title}
                        </h4>
                        <p className="text-[11px] text-[#7a757e]">
                          {story.readTime} • {story.readsCount.toLocaleString()} Public Reads
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#baeaff] text-[#001f29] text-[10px] font-semibold">
                        Live Public
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-2 flex items-center justify-between text-[#49454d] text-xs border-t border-[#cbc4ce]/20">
              <span>Showing {stories.length} published stories</span>
              <button
                type="button"
                onClick={() => setShowNewStoryModal(true)}
                className="text-[#66587e] font-semibold hover:underline"
              >
                + Create New Post
              </button>
            </div>
          </section>

          {/* Bespoke Commissions Queue Status */}
          <section className="lg:col-span-5 rounded-2xl bg-[#ffffff] shadow-sm p-6 flex flex-col justify-between border border-[#cbc4ce]/20">
            <div>
              <div className="flex items-center justify-between pb-5 border-b border-[#cbc4ce]/20">
                <div>
                  <h3 className="font-serif text-xl text-[#1d1b19]">Private Commission Queue</h3>
                  <p className="text-xs text-[#49454d]">
                    Direct patron inquiries awaiting your atelier estimate.
                  </p>
                </div>
                <span className="w-7 h-7 rounded-full bg-[#c8b6e2] text-[#54466b] flex items-center justify-center text-xs font-bold">
                  {inquiries.length}
                </span>
              </div>

              <div className="flex flex-col gap-3 pt-4">
                {inquiries.map((inq) => (
                  <div
                    key={inq.id}
                    className="p-3.5 rounded-xl bg-[#f8f2ef] flex flex-col gap-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[#1d1b19]">{inq.patronName}</span>
                      <span className="text-xs text-[#795465] font-bold">
                        {inq.quoteSent ? `Quoted: $${inq.quoteAmount}` : `Est: $${inq.estimatedValue}`}
                      </span>
                    </div>
                    <p className="text-xs text-[#49454d] line-clamp-2">{inq.notes}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-[10px] text-[#7a757e]">{inq.receivedAt}</span>
                      {inq.quoteSent ? (
                        <span className="px-2.5 py-0.5 rounded-full bg-[#d4f1e6] text-[#005369] text-[10px] font-bold">
                          Quote Dispatched ✓
                        </span>
                      ) : (
                        <button
                          type="button"
                          onClick={() => {
                            setShowQuoteModal(inq);
                            setQuoteInput(inq.estimatedValue.toString());
                          }}
                          className="px-3 py-1 rounded-full bg-[#66587e] text-white text-[11px] font-semibold hover:opacity-90 transition-all"
                        >
                          Send Private Quote
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 mt-2">
              <button
                type="button"
                onClick={() => setShowInboxModal(true)}
                className="w-full py-2.5 rounded-full bg-[#ede7e3] hover:bg-[#ded9d5] text-[#1d1b19] text-xs font-semibold uppercase tracking-wider transition-all"
              >
                Open Concierge Inbox ({inquiries.length} Inquiries)
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* Slide-Over Drawer: Add New Product & Private Price (Matching Image 8) */}
      {isDrawerOpen && (
        <div
          className="fixed inset-0 z-50 flex justify-end bg-black/40 backdrop-blur-sm transition-opacity animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setIsDrawerOpen(false);
          }}
        >
          <div className="w-full max-w-2xl bg-[#ffffff] h-full overflow-y-auto shadow-2xl p-8 flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between pb-6 border-b border-[#cbc4ce]/30">
                <div>
                  <span className="text-xs text-[#795465] uppercase tracking-widest font-semibold">
                    Craft Creation Registry
                  </span>
                  <h2 className="font-serif text-2xl text-[#1d1b19]">
                    Add New Product & Private Price
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => setIsDrawerOpen(false)}
                  className="p-2 rounded-full hover:bg-[#f3ede9] text-[#49454d]"
                >
                  <span className="material-symbols-outlined">close</span>
                </button>
              </div>

              {/* Form */}
              <form onSubmit={handleCreateProduct} className="flex flex-col gap-5 py-6">
                {/* Title */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#1d1b19] font-semibold">
                    Product Title
                  </label>
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="e.g. Celestial Dawn Crocheted Cardigan"
                    className="px-4 py-3 rounded-xl bg-[#f8f2ef] text-[#1d1b19] text-sm focus:outline-none focus:ring-2 focus:ring-[#c8b6e2]"
                  />
                </div>

                {/* Category & Crafting Hours */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#1d1b19] font-semibold">
                      Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as ProductCategory)}
                      className="px-4 py-3 rounded-xl bg-[#f8f2ef] text-[#1d1b19] text-sm focus:outline-none focus:ring-2 focus:ring-[#c8b6e2]"
                    >
                      <option value="bouquets">Heirloom Botanicals</option>
                      <option value="amigurumi">Amigurumi Keepsakes</option>
                      <option value="totes">Atelier Wearables</option>
                      <option value="wearables">Living Decor</option>
                    </select>
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs uppercase tracking-wider text-[#1d1b19] font-semibold">
                      Estimated Crafting Hours
                    </label>
                    <input
                      type="text"
                      value={newHours}
                      onChange={(e) => setNewHours(e.target.value)}
                      placeholder="e.g. 24.5 Hours"
                      className="px-4 py-3 rounded-xl bg-[#f8f2ef] text-[#1d1b19] text-sm focus:outline-none focus:ring-2 focus:ring-[#c8b6e2]"
                    />
                  </div>
                </div>

                {/* Crafting Materials */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#1d1b19] font-semibold">
                    Material Composition & Yarn Fiber
                  </label>
                  <input
                    type="text"
                    value={newFiber}
                    onChange={(e) => setNewFiber(e.target.value)}
                    placeholder="e.g. 100% Hand-Dyed Mulberry Silk, Brushed Mohair Trim"
                    className="px-4 py-3 rounded-xl bg-[#f8f2ef] text-[#1d1b19] text-sm focus:outline-none focus:ring-2 focus:ring-[#c8b6e2]"
                  />
                </div>

                {/* Media Image Selector */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#1d1b19] font-semibold">
                    Product Gallery Media Preset
                  </label>
                  <select
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="px-4 py-3 rounded-xl bg-[#f8f2ef] text-[#1d1b19] text-sm focus:outline-none focus:ring-2 focus:ring-[#c8b6e2]"
                  >
                    <option value="https://lh3.googleusercontent.com/aida-public/AB6AXuCASjDH9oeCZ69bQu3vymqmjKU7SGGsJRnMpQlUDEmaYaImYoBa_H8iaONKZIZJXmQPKnvn5PGBCkJu_bC7E256s0m9o7llvJZ0be5qXahcpaKYfUS418gZ88MtuADb5vq1m305Kq_COLgPR5fc7G8GeCL-Kc7Qp_0xHnttkDOX5NhMsHux6gH10l18YnBuOryVS7MR33rGk0H7EdodkfoMkmlkuZFGYb6JZ-qZFais-HF8k2ta4e1Q">
                      Heirloom Peony Petals Macro
                    </option>
                    <option value="https://lh3.googleusercontent.com/aida-public/AB6AXuAqJyzzCEoohfYcAFRNlDHECDsJd49uvOc4agFcNndP40td0ehPe1uI_NQGhelkKjJZhX6PYEzvGNYkxx1O31fqq9KVWx0k3rX0H07BsMtuNnyodHCjLbOlQRHvRvT59fG9v3vhAvUw3c5lIaWsGU4nGFuev7nwmJmW6R5wcfuw4ZoqlN7ILzNGXdSDd9Ih8XHSScPCWZ_b_cwZ54I-t_OFcrep3o7bFMJwym55o6c9fdgN_q121xPM">
                      Pastel Blossom Hand Bouquet
                    </option>
                    <option value="https://lh3.googleusercontent.com/aida-public/AB6AXuCXttl_9s5vL_Av6rXypUX7HjkquAtEfQYOSbIideTAJOQiXzF6q8vlZir6kNQXUNuSNRqjIoUEugzjkKrxZ6RZvuv8BxUyJocFRJrvVXQRhPXINPmVjyZyPBgIFui6z2Fj1uJ9oyQaOG8aRuAJ0OLiWjhKZHceK-RaY8TUcuIg2ZahV94nloez19jXTGIZdL3SMnpbITbl0j6peEbQBfpDbMK0X4M_z0PVwuqdViU8jcjU85nQUQ_N">
                      Teddy Bear Amigurumi Close-up
                    </option>
                    <option value="https://lh3.googleusercontent.com/aida-public/AB6AXuCNAtlS047mxSUaXnWOzloiFAJSW6Nrs2wxZvPXKHP2DUSe0dub0a167EQffS3wu1icqiaKmntvwrjF_RXjZsPAouPhBUdfrbSqrpCITtQaySWSFsgxQYBNICuzalAmZUaqLwktm1AprB-5JdZxSVII1_TjnlEHxvCAfP3ftkHq14FBaWpKBVD5-gO28dhzojR218R2vzoKgfVIvHgZuC-OzyerFQETPOxCly8R_3jOfX_j2fOeO9k-">
                      Granny Square Tote Bag
                    </option>
                  </select>
                </div>

                {/* Public Description (No Prices) */}
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs uppercase tracking-wider text-[#1d1b19] font-semibold">
                    Public Botanical / Artifact Description
                  </label>
                  <textarea
                    rows={3}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    placeholder="Describe the tactile weave, stitch rhythm, and emotional resonance. Public prices are forbidden."
                    className="px-4 py-3 rounded-xl bg-[#f8f2ef] text-[#1d1b19] text-sm focus:outline-none focus:ring-2 focus:ring-[#c8b6e2]"
                  />
                </div>

                {/* Secret Owner Atelier Price (RLS Protected) */}
                <div className="p-5 rounded-2xl bg-[#ffd8e7] text-[#2e1221] flex flex-col gap-2 shadow-sm border border-[#795465]/20">
                  <div className="flex items-center justify-between">
                    <label className="text-xs uppercase tracking-wider font-bold flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-sm">lock</span>
                      <span>Private Atelier Price ($USD)</span>
                    </label>
                    <span className="text-[10px] uppercase bg-[#795465] text-white px-2 py-0.5 rounded-full font-bold">
                      Owner Vault Only
                    </span>
                  </div>
                  <p className="text-xs opacity-90">
                    This monetary quote will never appear anywhere on the public website, search metadata, or customer catalog view.
                  </p>
                  <div className="flex items-center px-4 py-2.5 rounded-xl bg-[#ffffff] mt-1 shadow-inner">
                    <span className="text-[#795465] text-base font-bold mr-2">$</span>
                    <input
                      type="number"
                      step="0.01"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="120.00"
                      className="w-full bg-transparent text-lg font-bold text-[#1d1b19] focus:outline-none"
                    />
                  </div>
                </div>

                {/* Drawer Actions */}
                <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#cbc4ce]/30">
                  <button
                    type="button"
                    onClick={() => setIsDrawerOpen(false)}
                    className="px-5 py-2.5 rounded-full bg-[#f3ede9] hover:bg-[#ede7e3] text-[#1d1b19] text-xs uppercase font-semibold transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-full bg-gradient-to-r from-[#c8b6e2] via-[#fdcde1] to-[#80c7e4] text-[#54466b] text-xs uppercase font-semibold shadow-md transition-all"
                  >
                    Publish to Website (Without Price)
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Access Logs Audit Modal */}
      {showLogsModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowLogsModal(false);
          }}
        >
          <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative">
            <button
              onClick={() => setShowLogsModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#f3ede9]"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
            <div className="flex items-center gap-2 text-[#795465] mb-2">
              <span className="material-symbols-outlined">security</span>
              <span className="text-xs uppercase font-semibold tracking-wider">RLS Security Audit</span>
            </div>
            <h3 className="font-serif text-xl font-medium text-[#1d1b19] mb-4">
              Row-Level Security Verification Log
            </h3>
            <div className="space-y-2 text-xs font-mono bg-[#f8f2ef] p-4 rounded-xl text-[#49454d]">
              <div>[2025-03-25 14:10:02] PUBLIC_POLICY_CHECK: anon role filtered column 'private_price' =&gt; 200 OK (Nullified)</div>
              <div>[2025-03-25 14:08:14] CRAWLER_PROBE_DENIED: Googlebot indexed 28 items with ZERO monetary metadata</div>
              <div>[2025-03-25 13:45:22] OWNER_SESSION_AUTH: Tier-0 token verified for owner@pastelhook.com</div>
              <div>[2025-03-25 12:12:00] RLS_ACTIVE: 100% catalog values isolated from client bundle</div>
            </div>
            <button
              onClick={() => setShowLogsModal(false)}
              className="mt-6 w-full py-2.5 rounded-full bg-[#66587e] text-white text-xs uppercase font-semibold tracking-wider"
            >
              Close Audit
            </button>
          </div>
        </div>
      )}

      {/* Quote Sender Modal */}
      {showQuoteModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowQuoteModal(null);
          }}
        >
          <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setShowQuoteModal(null)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#f3ede9]"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#795465]">
              Concierge Dispatch
            </span>
            <h3 className="font-serif text-xl text-[#1d1b19] mt-1 mb-2">
              Send Private Quote to {showQuoteModal.patronName}
            </h3>
            <p className="text-xs text-[#49454d] mb-4">
              {showQuoteModal.notes}
            </p>
            <form onSubmit={handleSendQuoteSubmit} className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold uppercase text-[#1d1b19]">
                  Bespoke Commission Price ($USD)
                </label>
                <div className="flex items-center px-4 py-2 rounded-xl bg-[#f8f2ef] mt-1">
                  <span className="text-sm font-bold text-[#795465] mr-2">$</span>
                  <input
                    type="number"
                    required
                    value={quoteInput}
                    onChange={(e) => setQuoteInput(e.target.value)}
                    className="w-full bg-transparent text-sm font-bold text-[#1d1b19] focus:outline-none"
                  />
                </div>
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#66587e] text-white text-xs uppercase font-semibold tracking-wider hover:opacity-95"
              >
                Dispatch Private Quote Email
              </button>
            </form>
          </div>
        </div>
      )}

      {/* New Story Modal */}
      {showNewStoryModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowNewStoryModal(false);
          }}
        >
          <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl relative max-h-[90vh] overflow-y-auto">
            <button
              onClick={() => setShowNewStoryModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#f3ede9]"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#66587e]">
              Artisan Journal
            </span>
            <h3 className="font-serif text-xl text-[#1d1b19] mt-1 mb-4">
              Publish New Studio Story
            </h3>
            <form onSubmit={handleCreateStory} className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase font-semibold text-[#1d1b19]">Story Title</label>
                <input
                  type="text"
                  required
                  value={storyTitle}
                  onChange={(e) => setStoryTitle(e.target.value)}
                  placeholder="e.g. Sourcing Rare Mohair from the Pyrenees"
                  className="px-4 py-2.5 rounded-xl bg-[#f8f2ef] text-sm text-[#1d1b19] focus:outline-none focus:ring-2 focus:ring-[#c8b6e2]"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase font-semibold text-[#1d1b19]">Category</label>
                <select
                  value={storyCategory}
                  onChange={(e) => setStoryCategory(e.target.value)}
                  className="px-4 py-2.5 rounded-xl bg-[#f8f2ef] text-sm text-[#1d1b19] focus:outline-none"
                >
                  <option>Studio Diaries</option>
                  <option>Yarn Unboxing</option>
                  <option>Heirloom Care</option>
                  <option>Colorway Notes</option>
                </select>
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase font-semibold text-[#1d1b19]">Summary Excerpt</label>
                <textarea
                  rows={2}
                  required
                  value={storyExcerpt}
                  onChange={(e) => setStoryExcerpt(e.target.value)}
                  placeholder="A brief 1-2 sentence preview for the journal cards..."
                  className="px-4 py-2.5 rounded-xl bg-[#f8f2ef] text-sm text-[#1d1b19] focus:outline-none"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs uppercase font-semibold text-[#1d1b19]">Full Story Body</label>
                <textarea
                  rows={4}
                  value={storyContent}
                  onChange={(e) => setStoryContent(e.target.value)}
                  placeholder="Elaborate on the fibers, slow stitch techniques, or seasonal inspirations..."
                  className="px-4 py-2.5 rounded-xl bg-[#f8f2ef] text-sm text-[#1d1b19] focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#66587e] text-white text-xs uppercase font-semibold tracking-wider hover:opacity-95"
              >
                Publish to Journal
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Inbox Modal */}
      {showInboxModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fadeIn"
          onClick={(e) => {
            if (e.target === e.currentTarget) setShowInboxModal(false);
          }}
        >
          <div className="bg-[#ffffff] rounded-3xl p-6 sm:p-8 max-w-2xl w-full shadow-2xl relative max-h-[85vh] overflow-y-auto">
            <button
              onClick={() => setShowInboxModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full hover:bg-[#f3ede9]"
            >
              <span className="material-symbols-outlined text-lg">close</span>
            </button>
            <div className="flex items-center gap-2 text-[#66587e] mb-1">
              <span className="material-symbols-outlined">inbox</span>
              <span className="text-xs uppercase font-semibold tracking-wider">Concierge Inquiries</span>
            </div>
            <h3 className="font-serif text-2xl text-[#1d1b19] mb-4">
              All Patron Inquiries ({inquiries.length})
            </h3>
            <div className="space-y-3">
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-4 rounded-2xl bg-[#f8f2ef] flex flex-col gap-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-serif text-base font-semibold text-[#1d1b19]">
                        {inq.patronName}
                      </span>
                      <span className="text-xs text-[#7a757e] ml-2">({inq.patronEmail})</span>
                    </div>
                    <span className="text-xs font-bold text-[#795465]">
                      {inq.quoteSent ? `Quoted: $${inq.quoteAmount}` : `Est: $${inq.estimatedValue}`}
                    </span>
                  </div>
                  <p className="text-xs text-[#49454d]">{inq.notes}</p>
                  <div className="flex items-center justify-between pt-1 border-t border-[#cbc4ce]/30 text-xs">
                    <span className="text-[#7a757e]">{inq.receivedAt}</span>
                    <button
                      onClick={() => {
                        setShowQuoteModal(inq);
                        setQuoteInput(inq.estimatedValue.toString());
                      }}
                      className="text-[#66587e] font-semibold hover:underline"
                    >
                      {inq.quoteSent ? 'Re-send Quote' : 'Prepare Quote →'}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
