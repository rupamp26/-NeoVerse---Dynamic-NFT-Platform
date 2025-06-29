import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useNFTStore } from '../store/nftStore';
import { mockNFTs } from '../data/mockData';
import { NFTGrid } from '../components/NFT/NFTGrid';
import { NFTFilters } from '../components/Filters/NFTFilters';
import { NFTDetailModal } from '../components/NFT/NFTDetailModal';
import { NFT } from '../types';

export const Collection: React.FC = () => {
  const { nfts, setNFTs, getFilteredNFTs, filters, loading } = useNFTStore();
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [selectedNFT, setSelectedNFT] = useState<NFT | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number>(-1);

  useEffect(() => {
    // Load mock data
    setNFTs(mockNFTs);
  }, [setNFTs]);

  const filteredNFTs = getFilteredNFTs();

  const handleNFTClick = (nft: NFT) => {
    const index = filteredNFTs.findIndex(n => n.id === nft.id);
    setSelectedNFT(nft);
    setSelectedIndex(index);
  };

  const handlePrevious = () => {
    if (selectedIndex > 0) {
      const newIndex = selectedIndex - 1;
      setSelectedNFT(filteredNFTs[newIndex]);
      setSelectedIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (selectedIndex < filteredNFTs.length - 1) {
      const newIndex = selectedIndex + 1;
      setSelectedNFT(filteredNFTs[newIndex]);
      setSelectedIndex(newIndex);
    }
  };

  const handleCloseModal = () => {
    setSelectedNFT(null);
    setSelectedIndex(-1);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-slate-100 mb-2">
              My Collection
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage and track your dynamic NFT collection
            </p>
          </div>
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {nfts.length}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Total NFTs
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {nfts.filter(nft => nft.isEvolutionReady).length}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Ready to Evolve
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {nfts.reduce((sum, nft) => sum + (nft.price || 0), 0).toFixed(1)} ETH
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400">
                Total Value
              </div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Filters */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <NFTFilters
          showAdvanced={showAdvancedFilters}
          onToggleAdvanced={() => setShowAdvancedFilters(!showAdvancedFilters)}
        />
      </motion.div>

      {/* Results Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-sm text-slate-600 dark:text-slate-400"
      >
        <div>
          Showing {filteredNFTs.length} of {nfts.length} NFTs
          {filters.search && (
            <span className="ml-2">
              for "<span className="font-medium text-slate-900 dark:text-slate-100">{filters.search}</span>"
            </span>
          )}
        </div>
        <div className="flex items-center space-x-4">
          <span>View as:</span>
          <div className="text-slate-900 dark:text-slate-100 font-medium">
            {filters.viewMode === 'grid' ? 'Grid' : 'List'}
          </div>
        </div>
      </motion.div>

      {/* NFT Grid */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <NFTGrid
          nfts={filteredNFTs}
          loading={loading}
          onNFTClick={handleNFTClick}
          viewMode={filters.viewMode}
          gridSize="medium"
        />
      </motion.div>

      {/* NFT Detail Modal */}
      <NFTDetailModal
        nft={selectedNFT}
        isOpen={!!selectedNFT}
        onClose={handleCloseModal}
        onPrevious={handlePrevious}
        onNext={handleNext}
        hasPrevious={selectedIndex > 0}
        hasNext={selectedIndex < filteredNFTs.length - 1}
      />
    </div>
  );
};