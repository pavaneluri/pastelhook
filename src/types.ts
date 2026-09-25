export type ShadeTone = 'all' | 'blue' | 'pink' | 'lavender' | 'cream' | 'mint';
export type ProductCategory = 'all' | 'bouquets' | 'amigurumi' | 'totes' | 'charms' | 'wearables';

export interface Product {
  id: string;
  sku: string;
  title: string;
  category: ProductCategory;
  categoryName: string;
  description: string;
  fullStory?: string;
  fiber: string;
  craftingHours: number;
  status: 'live' | 'draft';
  inventoryModel: 'Made to Order' | 'In Vault' | 'Bespoke Only' | 'Private Queue';
  vaultCount?: number;
  privatePrice: number; // Server-side RLS protected: Owner only, NEVER shown on public pages!
  image: string;
  detailImages: string[];
  dimensions: string;
  stitchComplexity: string;
  stemReinforcement?: string;
  maintenance: string;
  tone: ShadeTone;
  badges: string[];
  isMasterwork?: boolean;
  isCollectorToy?: boolean;
  isArtisanFavorite?: boolean;
  lovedCount: number;
  createdAt: string;
}

export interface JournalStory {
  id: string;
  title: string;
  category: string;
  categoryColor: string;
  readTime: string;
  excerpt: string;
  content: string;
  image: string;
  date: string;
  readsCount: number;
  status: 'live' | 'draft';
}

export interface CommissionInquiry {
  id: string;
  patronName: string;
  patronEmail: string;
  productTitle?: string;
  estimatedValue: number;
  notes: string;
  receivedAt: string;
  status: 'Pending' | 'Quoted' | 'In Production' | 'Delivered';
  quoteSent?: boolean;
  quoteAmount?: number;
}
