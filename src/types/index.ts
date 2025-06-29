export interface NFT {
  id: string;
  name: string;
  description: string;
  imageUrl: string;
  collectionName: string;
  tokenId: string;
  contractAddress: string;
  owner: string;
  price?: number;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  attributes: NFTAttribute[];
  evolutionStage: number;
  evolutionHistory: EvolutionEvent[];
  isEvolutionReady: boolean;
  evolutionProgress: number;
  lastEvolution?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface NFTAttribute {
  traitType: string;
  value: string | number;
  displayType?: string;
  rarity?: number;
}

export interface EvolutionEvent {
  id: string;
  nftId: string;
  fromStage: number;
  toStage: number;
  triggerType: 'time' | 'data' | 'community' | 'manual';
  triggerConditions: Record<string, any>;
  timestamp: Date;
  transactionHash?: string;
  changes: AttributeChange[];
}

export interface AttributeChange {
  attribute: string;
  oldValue: string | number;
  newValue: string | number;
  changeType: 'increase' | 'decrease' | 'replace' | 'add' | 'remove';
}

export interface EvolutionRule {
  id: string;
  nftId?: string;
  name: string;
  description: string;
  conditions: EvolutionCondition[];
  actions: EvolutionAction[];
  isActive: boolean;
  priority: number;
  createdBy: string;
  createdAt: Date;
  executionCount: number;
  lastExecuted?: Date;
}

export interface EvolutionCondition {
  type: 'time' | 'weather' | 'price' | 'community' | 'external';
  field: string;
  operator: 'equals' | 'greater' | 'less' | 'contains' | 'between';
  value: any;
  dataSource?: string;
}

export interface EvolutionAction {
  type: 'attribute_change' | 'image_update' | 'metadata_update' | 'mint_new';
  target: string;
  operation: string;
  value: any;
  parameters?: Record<string, any>;
}

export interface User {
  id: string;
  address: string;
  ensName?: string;
  avatar?: string;
  username: string;
  email?: string;
  bio?: string;
  website?: string;
  twitter?: string;
  discord?: string;
  joinedAt: Date;
  preferences: UserPreferences;
  stats: UserStats;
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'auto';
  notifications: {
    evolution: boolean;
    community: boolean;
    marketplace: boolean;
    system: boolean;
  };
  privacy: {
    showProfile: boolean;
    showCollection: boolean;
    showActivity: boolean;
  };
  display: {
    gridSize: 'small' | 'medium' | 'large';
    sortBy: string;
    showDetails: boolean;
  };
}

export interface UserStats {
  totalNFTs: number;
  totalEvolutions: number;
  portfolioValue: number;
  communityRank: number;
  evolutionSuccessRate: number;
  joinedCommunities: number;
  createdRules: number;
  helpfulVotes: number;
}

export interface Community {
  id: string;
  name: string;
  description: string;
  image: string;
  category: string;
  memberCount: number;
  createdAt: Date;
  moderators: string[];
  rules: string[];
  isPrivate: boolean;
  tags: string[];
}

export interface Post {
  id: string;
  communityId: string;
  authorId: string;
  author: User;
  title: string;
  content: string;
  type: 'discussion' | 'showcase' | 'help' | 'evolution' | 'news';
  images?: string[];
  nftReferences?: string[];
  votes: number;
  userVote?: 'up' | 'down';
  commentCount: number;
  isSticky: boolean;
  isLocked: boolean;
  createdAt: Date;
  updatedAt: Date;
  tags: string[];
}

export interface Comment {
  id: string;
  postId: string;
  authorId: string;
  author: User;
  content: string;
  parentId?: string;
  votes: number;
  userVote?: 'up' | 'down';
  createdAt: Date;
  updatedAt: Date;
  replies?: Comment[];
}

export interface MarketplaceListing {
  id: string;
  nftId: string;
  nft: NFT;
  sellerId: string;
  seller: User;
  price: number;
  currency: 'ETH' | 'WETH' | 'USDC';
  listingType: 'fixed' | 'auction' | 'offer';
  startTime: Date;
  endTime?: Date;
  isActive: boolean;
  highestBid?: number;
  bidCount: number;
  views: number;
  createdAt: Date;
}

export interface Analytics {
  portfolio: PortfolioAnalytics;
  evolution: EvolutionAnalytics;
  community: CommunityAnalytics;
  market: MarketAnalytics;
}

export interface PortfolioAnalytics {
  totalValue: number;
  valueChange24h: number;
  valueChange7d: number;
  valueChange30d: number;
  distribution: {
    byCollection: Array<{ name: string; value: number; count: number }>;
    byRarity: Array<{ rarity: string; value: number; count: number }>;
    byStage: Array<{ stage: number; value: number; count: number }>;
  };
  topPerformers: NFT[];
  recentActivity: EvolutionEvent[];
}

export interface EvolutionAnalytics {
  totalEvolutions: number;
  successRate: number;
  averageTimeToEvolution: number;
  mostActiveRules: EvolutionRule[];
  evolutionTrends: Array<{ date: string; count: number }>;
  triggerTypes: Array<{ type: string; count: number; successRate: number }>;
  stageDistribution: Array<{ stage: number; count: number }>;
}

export interface CommunityAnalytics {
  totalPosts: number;
  totalComments: number;
  totalVotes: number;
  engagement: Array<{ date: string; posts: number; comments: number }>;
  topCommunities: Array<{ name: string; posts: number; engagement: number }>;
  popularTags: Array<{ tag: string; count: number }>;
}

export interface MarketAnalytics {
  totalVolume: number;
  averagePrice: number;
  priceHistory: Array<{ date: string; price: number; volume: number }>;
  topCollections: Array<{ name: string; volume: number; floorPrice: number }>;
  trendingNFTs: NFT[];
  marketSentiment: 'bullish' | 'bearish' | 'neutral';
}

export interface Notification {
  id: string;
  userId: string;
  type: 'evolution' | 'community' | 'marketplace' | 'system';
  title: string;
  message: string;
  data?: Record<string, any>;
  isRead: boolean;
  createdAt: Date;
}

export interface WalletConnection {
  address: string;
  balance: number;
  chainId: number;
  isConnected: boolean;
  provider: 'metamask' | 'walletconnect' | 'coinbase' | 'injected';
}