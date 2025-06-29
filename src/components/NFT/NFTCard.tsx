import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Heart, Share2, Zap, Star, TrendingUp } from 'lucide-react';
import { NFT } from '../../types';

interface NFTCardProps {
  nft: NFT;
  onClick?: () => void;
  showActions?: boolean;
  size?: 'small' | 'medium' | 'large';
}

export const NFTCard: React.FC<NFTCardProps> = ({ 
  nft, 
  onClick, 
  showActions = true,
  size = 'medium' 
}) => {
  const sizeClasses = {
    small: 'w-full max-w-xs',
    medium: 'w-full max-w-sm',
    large: 'w-full max-w-md'
  };

  const rarityColors = {
    Common: 'from-slate-400 to-slate-500',
    Uncommon: 'from-green-400 to-green-500',
    Rare: 'from-blue-400 to-blue-500',
    Epic: 'from-purple-400 to-purple-500',
    Legendary: 'from-yellow-400 to-orange-500'
  };

  const getRarityColor = (rarity: NFT['rarity']) => {
    return rarityColors[rarity] || rarityColors.Common;
  };

  return (
    <motion.div
      className={`nft-card group ${sizeClasses[size]}`}
      onClick={onClick}
      whileHover={{ y: -8 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-xl mb-4">
        <img
          src={nft.imageUrl}
          alt={nft.name}
          className="w-full h-64 object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Evolution Status Overlay */}
        {nft.isEvolutionReady && (
          <div className="absolute top-3 right-3">
            <motion.div
              className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full p-2"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Zap size={16} className="text-white" />
            </motion.div>
          </div>
        )}

        {/* Rarity Badge */}
        <div className="absolute top-3 left-3">
          <div className={`bg-gradient-to-r ${getRarityColor(nft.rarity)} px-2 py-1 rounded-full text-white text-xs font-medium`}>
            {nft.rarity}
          </div>
        </div>

        {/* Evolution Progress */}
        {nft.evolutionProgress > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-2">
            <div className="flex items-center justify-between text-white text-xs mb-1">
              <span>Evolution Progress</span>
              <span>{nft.evolutionProgress}%</span>
            </div>
            <div className="w-full bg-white/20 rounded-full h-1.5">
              <motion.div
                className="bg-gradient-to-r from-primary-400 to-secondary-400 h-1.5 rounded-full"
                initial={{ width: 0 }}
                animate={{ width: `${nft.evolutionProgress}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Title and Collection */}
        <div>
          <h3 className="font-semibold text-lg text-slate-900 dark:text-slate-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
            {nft.name}
          </h3>
          <p className="text-sm text-slate-500 dark:text-slate-400">
            {nft.collectionName}
          </p>
        </div>

        {/* Evolution Stage */}
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <Star size={14} className="text-yellow-500" />
            <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
              Stage {nft.evolutionStage}
            </span>
          </div>
          {nft.evolutionHistory.length > 0 && (
            <div className="flex items-center space-x-1">
              <TrendingUp size={14} className="text-green-500" />
              <span className="text-xs text-slate-500 dark:text-slate-400">
                {nft.evolutionHistory.length} evolutions
              </span>
            </div>
          )}
        </div>

        {/* Attributes Preview */}
        <div className="flex flex-wrap gap-1">
          {nft.attributes.slice(0, 3).map((attr, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-white/20 dark:bg-black/20 rounded-full text-xs text-slate-600 dark:text-slate-400"
            >
              {attr.traitType}: {attr.value}
            </span>
          ))}
          {nft.attributes.length > 3 && (
            <span className="px-2 py-1 bg-white/20 dark:bg-black/20 rounded-full text-xs text-slate-500 dark:text-slate-500">
              +{nft.attributes.length - 3} more
            </span>
          )}
        </div>

        {/* Price and Actions */}
        <div className="flex items-center justify-between pt-2">
          <div>
            {nft.price && (
              <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                {nft.price} ETH
              </div>
            )}
          </div>

          {showActions && (
            <div className="flex items-center space-x-2">
              <motion.button
                className="p-2 rounded-lg bg-white/20 dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Heart size={16} />
              </motion.button>
              
              <motion.button
                className="p-2 rounded-lg bg-white/20 dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Share2 size={16} />
              </motion.button>
              
              <motion.button
                className="p-2 rounded-lg bg-white/20 dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Eye size={16} />
              </motion.button>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};