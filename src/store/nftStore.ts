import { create } from 'zustand';
import { NFT, EvolutionRule, EvolutionEvent } from '../types';

interface NFTState {
  nfts: NFT[];
  selectedNFT: NFT | null;
  evolutionRules: EvolutionRule[];
  evolutionEvents: EvolutionEvent[];
  loading: boolean;
  error: string | null;
  filters: {
    search: string;
    collection: string;
    rarity: string;
    stage: number | null;
    priceRange: [number, number];
    sortBy: string;
    viewMode: 'grid' | 'list';
  };
  setNFTs: (nfts: NFT[]) => void;
  setSelectedNFT: (nft: NFT | null) => void;
  addNFT: (nft: NFT) => void;
  updateNFT: (id: string, updates: Partial<NFT>) => void;
  removeNFT: (id: string) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  updateFilters: (filters: Partial<NFTState['filters']>) => void;
  resetFilters: () => void;
  getFilteredNFTs: () => NFT[];
  addEvolutionRule: (rule: EvolutionRule) => void;
  updateEvolutionRule: (id: string, updates: Partial<EvolutionRule>) => void;
  removeEvolutionRule: (id: string) => void;
  addEvolutionEvent: (event: EvolutionEvent) => void;
}

const defaultFilters = {
  search: '',
  collection: '',
  rarity: '',
  stage: null,
  priceRange: [0, 1000] as [number, number],
  sortBy: 'name',
  viewMode: 'grid' as const,
};

export const useNFTStore = create<NFTState>((set, get) => ({
  nfts: [],
  selectedNFT: null,
  evolutionRules: [],
  evolutionEvents: [],
  loading: false,
  error: null,
  filters: defaultFilters,

  setNFTs: (nfts) => set({ nfts }),
  setSelectedNFT: (selectedNFT) => set({ selectedNFT }),
  
  addNFT: (nft) => set((state) => ({ 
    nfts: [...state.nfts, nft] 
  })),
  
  updateNFT: (id, updates) => set((state) => ({
    nfts: state.nfts.map((nft) => 
      nft.id === id ? { ...nft, ...updates } : nft
    ),
    selectedNFT: state.selectedNFT?.id === id 
      ? { ...state.selectedNFT, ...updates }
      : state.selectedNFT,
  })),
  
  removeNFT: (id) => set((state) => ({
    nfts: state.nfts.filter((nft) => nft.id !== id),
    selectedNFT: state.selectedNFT?.id === id ? null : state.selectedNFT,
  })),
  
  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),
  
  updateFilters: (newFilters) => set((state) => ({
    filters: { ...state.filters, ...newFilters }
  })),
  
  resetFilters: () => set({ filters: defaultFilters }),
  
  getFilteredNFTs: () => {
    const { nfts, filters } = get();
    
    let filtered = nfts.filter((nft) => {
      // Search filter
      if (filters.search && !nft.name.toLowerCase().includes(filters.search.toLowerCase()) &&
          !nft.description.toLowerCase().includes(filters.search.toLowerCase()) &&
          !nft.collectionName.toLowerCase().includes(filters.search.toLowerCase())) {
        return false;
      }
      
      // Collection filter
      if (filters.collection && nft.collectionName !== filters.collection) {
        return false;
      }
      
      // Rarity filter
      if (filters.rarity && nft.rarity !== filters.rarity) {
        return false;
      }
      
      // Stage filter
      if (filters.stage !== null && nft.evolutionStage !== filters.stage) {
        return false;
      }
      
      // Price filter
      if (nft.price !== undefined && 
          (nft.price < filters.priceRange[0] || nft.price > filters.priceRange[1])) {
        return false;
      }
      
      return true;
    });
    
    // Sort filtered results
    filtered.sort((a, b) => {
      switch (filters.sortBy) {
        case 'name':
          return a.name.localeCompare(b.name);
        case 'price':
          return (a.price || 0) - (b.price || 0);
        case 'rarity':
          const rarityOrder = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
          return rarityOrder.indexOf(a.rarity) - rarityOrder.indexOf(b.rarity);
        case 'stage':
          return a.evolutionStage - b.evolutionStage;
        case 'recent':
          return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        default:
          return 0;
      }
    });
    
    return filtered;
  },
  
  addEvolutionRule: (rule) => set((state) => ({
    evolutionRules: [...state.evolutionRules, rule]
  })),
  
  updateEvolutionRule: (id, updates) => set((state) => ({
    evolutionRules: state.evolutionRules.map((rule) =>
      rule.id === id ? { ...rule, ...updates } : rule
    )
  })),
  
  removeEvolutionRule: (id) => set((state) => ({
    evolutionRules: state.evolutionRules.filter((rule) => rule.id !== id)
  })),
  
  addEvolutionEvent: (event) => set((state) => ({
    evolutionEvents: [...state.evolutionEvents, event]
  })),
}));