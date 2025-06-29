import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import { useNFTStore } from '../../store/nftStore';

interface NFTFiltersProps {
  showAdvanced?: boolean;
  onToggleAdvanced?: () => void;
}

export const NFTFilters: React.FC<NFTFiltersProps> = ({
  showAdvanced = false,
  onToggleAdvanced
}) => {
  const { filters, updateFilters, resetFilters, nfts } = useNFTStore();

  const collections = Array.from(new Set(nfts.map(nft => nft.collectionName)));
  const rarities = ['Common', 'Uncommon', 'Rare', 'Epic', 'Legendary'];
  const stages = Array.from(new Set(nfts.map(nft => nft.evolutionStage))).sort();
  const sortOptions = [
    { value: 'name', label: 'Name' },
    { value: 'price', label: 'Price' },
    { value: 'rarity', label: 'Rarity' },
    { value: 'stage', label: 'Evolution Stage' },
    { value: 'recent', label: 'Recently Updated' }
  ];

  return (
    <div className="space-y-4">
      {/* Basic Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        {/* Search */}
        <div className="flex-1">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search NFTs..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="w-full pl-10 pr-4 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
            />
          </div>
        </div>

        {/* View Mode Toggle */}
        <div className="flex items-center bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-xl p-1">
          <button
            onClick={() => updateFilters({ viewMode: 'grid' })}
            className={`p-2 rounded-lg transition-colors ${
              filters.viewMode === 'grid'
                ? 'bg-primary-500 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <Grid size={20} />
          </button>
          <button
            onClick={() => updateFilters({ viewMode: 'list' })}
            className={`p-2 rounded-lg transition-colors ${
              filters.viewMode === 'list'
                ? 'bg-primary-500 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
            }`}
          >
            <List size={20} />
          </button>
        </div>

        {/* Advanced Filters Toggle */}
        <button
          onClick={onToggleAdvanced}
          className={`flex items-center space-x-2 px-4 py-3 rounded-xl transition-colors ${
            showAdvanced
              ? 'bg-primary-500 text-white'
              : 'bg-white/20 dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
          }`}
        >
          <SlidersHorizontal size={20} />
          <span className="hidden sm:inline">Filters</span>
        </button>

        {/* Reset Filters */}
        <button
          onClick={resetFilters}
          className="flex items-center space-x-2 px-4 py-3 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-xl text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
        >
          <X size={20} />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      {/* Advanced Filters */}
      {showAdvanced && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="glass-card"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Collection Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Collection
              </label>
              <select
                value={filters.collection}
                onChange={(e) => updateFilters({ collection: e.target.value })}
                className="w-full px-3 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              >
                <option value="">All Collections</option>
                {collections.map((collection) => (
                  <option key={collection} value={collection}>
                    {collection}
                  </option>
                ))}
              </select>
            </div>

            {/* Rarity Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Rarity
              </label>
              <select
                value={filters.rarity}
                onChange={(e) => updateFilters({ rarity: e.target.value })}
                className="w-full px-3 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              >
                <option value="">All Rarities</option>
                {rarities.map((rarity) => (
                  <option key={rarity} value={rarity}>
                    {rarity}
                  </option>
                ))}
              </select>
            </div>

            {/* Stage Filter */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Evolution Stage
              </label>
              <select
                value={filters.stage || ''}
                onChange={(e) => updateFilters({ stage: e.target.value ? parseInt(e.target.value) : null })}
                className="w-full px-3 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              >
                <option value="">All Stages</option>
                {stages.map((stage) => (
                  <option key={stage} value={stage}>
                    Stage {stage}
                  </option>
                ))}
              </select>
            </div>

            {/* Sort By */}
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                Sort By
              </label>
              <select
                value={filters.sortBy}
                onChange={(e) => updateFilters({ sortBy: e.target.value })}
                className="w-full px-3 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              >
                {sortOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Price Range */}
          <div className="mt-6">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              Price Range (ETH)
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="Min"
                value={filters.priceRange[0]}
                onChange={(e) => updateFilters({ 
                  priceRange: [parseFloat(e.target.value) || 0, filters.priceRange[1]] 
                })}
                className="flex-1 px-3 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
              <span className="text-slate-500 dark:text-slate-400">to</span>
              <input
                type="number"
                min="0"
                step="0.1"
                placeholder="Max"
                value={filters.priceRange[1]}
                onChange={(e) => updateFilters({ 
                  priceRange: [filters.priceRange[0], parseFloat(e.target.value) || 1000] 
                })}
                className="flex-1 px-3 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};