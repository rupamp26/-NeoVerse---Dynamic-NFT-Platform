import React from 'react';
import { motion } from 'framer-motion';
import { NFTCard } from './NFTCard';
import { NFT } from '../../types';

interface NFTGridProps {
  nfts: NFT[];
  loading?: boolean;
  onNFTClick?: (nft: NFT) => void;
  viewMode?: 'grid' | 'list';
  gridSize?: 'small' | 'medium' | 'large';
}

export const NFTGrid: React.FC<NFTGridProps> = ({
  nfts,
  loading = false,
  onNFTClick,
  viewMode = 'grid',
  gridSize = 'medium'
}) => {
  const gridClasses = {
    small: 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5',
    medium: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4',
    large: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'
  };

  if (loading) {
    return (
      <div className={`grid ${gridClasses[gridSize]} gap-6`}>
        {Array.from({ length: 8 }).map((_, index) => (
          <div key={index} className="nft-card animate-pulse">
            <div className="loading-skeleton w-full h-64 rounded-xl mb-4" />
            <div className="space-y-3">
              <div className="loading-skeleton h-6 rounded" />
              <div className="loading-skeleton h-4 w-2/3 rounded" />
              <div className="flex space-x-2">
                <div className="loading-skeleton h-6 w-16 rounded-full" />
                <div className="loading-skeleton h-6 w-20 rounded-full" />
              </div>
              <div className="loading-skeleton h-8 rounded" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (nfts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="text-center py-12"
      >
        <div className="w-32 h-32 mx-auto mb-6 opacity-50">
          <svg
            className="w-full h-full"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
          No NFTs Found
        </h3>
        <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
          No NFTs match your current filters. Try adjusting your search criteria or browse all collections.
        </p>
      </motion.div>
    );
  }

  if (viewMode === 'list') {
    return (
      <div className="space-y-4">
        {nfts.map((nft, index) => (
          <motion.div
            key={nft.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="glass-card p-4 hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onNFTClick?.(nft)}
          >
            <div className="flex items-center space-x-4">
              <img
                src={nft.imageUrl}
                alt={nft.name}
                className="w-20 h-20 rounded-lg object-cover"
              />
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100">
                  {nft.name}
                </h3>
                <p className="text-slate-500 dark:text-slate-400">
                  {nft.collectionName}
                </p>
                <div className="flex items-center space-x-4 mt-2">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Stage {nft.evolutionStage}
                  </span>
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {nft.rarity}
                  </span>
                  {nft.price && (
                    <span className="font-bold text-slate-900 dark:text-slate-100">
                      {nft.price} ETH
                    </span>
                  )}
                </div>
              </div>
              {nft.isEvolutionReady && (
                <div className="text-primary-600 dark:text-primary-400">
                  <span className="text-sm font-medium">Evolution Ready</span>
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    );
  }

  return (
    <motion.div
      className={`grid ${gridClasses[gridSize]} gap-6`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {nfts.map((nft, index) => (
        <motion.div
          key={nft.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3, delay: index * 0.1 }}
        >
          <NFTCard
            nft={nft}
            onClick={() => onNFTClick?.(nft)}
            size="medium"
          />
        </motion.div>
      ))}
    </motion.div>
  );
};