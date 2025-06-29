import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, 
  Heart, 
  Share2, 
  ExternalLink, 
  Zap, 
  Star, 
  TrendingUp, 
  Clock,
  Eye,
  MessageSquare,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { NFT } from '../../types';

interface NFTDetailModalProps {
  nft: NFT | null;
  isOpen: boolean;
  onClose: () => void;
  onPrevious?: () => void;
  onNext?: () => void;
  hasPrevious?: boolean;
  hasNext?: boolean;
}

export const NFTDetailModal: React.FC<NFTDetailModalProps> = ({
  nft,
  isOpen,
  onClose,
  onPrevious,
  onNext,
  hasPrevious,
  hasNext
}) => {
  const [activeTab, setActiveTab] = useState<'details' | 'evolution' | 'activity'>('details');
  const [isLiked, setIsLiked] = useState(false);

  if (!nft) return null;

  const rarityColors = {
    Common: 'from-slate-400 to-slate-500',
    Uncommon: 'from-green-400 to-green-500',
    Rare: 'from-blue-400 to-blue-500',
    Epic: 'from-purple-400 to-purple-500',
    Legendary: 'from-yellow-400 to-orange-500'
  };

  const tabs = [
    { id: 'details', label: 'Details', icon: Eye },
    { id: 'evolution', label: 'Evolution', icon: Zap },
    { id: 'activity', label: 'Activity', icon: TrendingUp }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-6xl max-h-[90vh] glass-effect rounded-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/20 dark:border-white/10">
              <div className="flex items-center space-x-4">
                <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {nft.name}
                </h2>
                <div className={`px-3 py-1 rounded-full text-sm font-medium text-white bg-gradient-to-r ${rarityColors[nft.rarity]}`}>
                  {nft.rarity}
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                {/* Navigation arrows */}
                {hasPrevious && (
                  <button
                    onClick={onPrevious}
                    className="p-2 rounded-lg bg-white/20 dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                  >
                    <ChevronLeft size={20} />
                  </button>
                )}
                
                {hasNext && (
                  <button
                    onClick={onNext}
                    className="p-2 rounded-lg bg-white/20 dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                  >
                    <ChevronRight size={20} />
                  </button>
                )}
                
                <button
                  onClick={onClose}
                  className="p-2 rounded-lg bg-white/20 dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {/* Content */}
            <div className="flex flex-col lg:flex-row h-full max-h-[calc(90vh-80px)]">
              {/* Image Section */}
              <div className="lg:w-1/2 p-6">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={nft.imageUrl}
                    alt={nft.name}
                    className="w-full h-full object-cover"
                  />
                  
                  {/* Evolution Status Overlay */}
                  {nft.isEvolutionReady && (
                    <div className="absolute top-4 right-4">
                      <motion.div
                        className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full p-3"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        <Zap size={20} className="text-white" />
                      </motion.div>
                    </div>
                  )}

                  {/* Evolution Progress */}
                  {nft.evolutionProgress > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 bg-black/50 backdrop-blur-sm p-4">
                      <div className="flex items-center justify-between text-white text-sm mb-2">
                        <span>Evolution Progress</span>
                        <span>{nft.evolutionProgress}%</span>
                      </div>
                      <div className="w-full bg-white/20 rounded-full h-2">
                        <motion.div
                          className="bg-gradient-to-r from-primary-400 to-secondary-400 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${nft.evolutionProgress}%` }}
                          transition={{ duration: 1 }}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between mt-6">
                  <div className="flex items-center space-x-3">
                    <motion.button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                        isLiked 
                          ? 'bg-red-500 text-white' 
                          : 'bg-white/20 dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:text-red-500'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                      <span>Like</span>
                    </motion.button>
                    
                    <motion.button
                      className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-white/20 dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 size={16} />
                      <span>Share</span>
                    </motion.button>
                  </div>

                  {nft.price && (
                    <div className="text-right">
                      <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {nft.price} ETH
                      </div>
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Current Price
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Details Section */}
              <div className="lg:w-1/2 flex flex-col">
                {/* Tabs */}
                <div className="flex border-b border-white/20 dark:border-white/10">
                  {tabs.map((tab) => {
                    const Icon = tab.icon;
                    return (
                      <button
                        key={tab.id}
                        onClick={() => setActiveTab(tab.id as any)}
                        className={`flex items-center space-x-2 px-6 py-4 font-medium transition-colors ${
                          activeTab === tab.id
                            ? 'text-primary-600 dark:text-primary-400 border-b-2 border-primary-500'
                            : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                        }`}
                      >
                        <Icon size={16} />
                        <span>{tab.label}</span>
                      </button>
                    );
                  })}
                </div>

                {/* Tab Content */}
                <div className="flex-1 overflow-y-auto p-6">
                  {activeTab === 'details' && (
                    <div className="space-y-6">
                      {/* Basic Info */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                          Collection
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400">
                          {nft.collectionName}
                        </p>
                      </div>

                      {/* Description */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                          Description
                        </h3>
                        <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
                          {nft.description}
                        </p>
                      </div>

                      {/* Attributes */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                          Attributes
                        </h3>
                        <div className="grid grid-cols-2 gap-3">
                          {nft.attributes.map((attr, index) => (
                            <div
                              key={index}
                              className="bg-white/20 dark:bg-black/20 rounded-lg p-3"
                            >
                              <div className="text-sm text-slate-500 dark:text-slate-400">
                                {attr.traitType}
                              </div>
                              <div className="font-medium text-slate-900 dark:text-slate-100">
                                {attr.value}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Contract Info */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                          Contract Details
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">Token ID</span>
                            <span className="font-mono text-slate-900 dark:text-slate-100">
                              #{nft.tokenId}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-slate-500 dark:text-slate-400">Contract</span>
                            <span className="font-mono text-slate-900 dark:text-slate-100">
                              {nft.contractAddress.slice(0, 6)}...{nft.contractAddress.slice(-4)}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {activeTab === 'evolution' && (
                    <div className="space-y-6">
                      {/* Current Stage */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                          Evolution Stage
                        </h3>
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center space-x-2">
                            <Star size={20} className="text-yellow-500" />
                            <span className="text-xl font-bold text-slate-900 dark:text-slate-100">
                              Stage {nft.evolutionStage}
                            </span>
                          </div>
                          {nft.isEvolutionReady && (
                            <div className="px-3 py-1 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-white text-sm font-medium">
                              Ready to Evolve
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Evolution Progress */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                          Progress to Next Stage
                        </h3>
                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-slate-600 dark:text-slate-400">Progress</span>
                            <span className="font-medium text-slate-900 dark:text-slate-100">
                              {nft.evolutionProgress}%
                            </span>
                          </div>
                          <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-3">
                            <motion.div
                              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-3 rounded-full"
                              initial={{ width: 0 }}
                              animate={{ width: `${nft.evolutionProgress}%` }}
                              transition={{ duration: 1 }}
                            />
                          </div>
                        </div>
                      </div>

                      {/* Evolution History */}
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                          Evolution History
                        </h3>
                        {nft.evolutionHistory.length > 0 ? (
                          <div className="space-y-3">
                            {nft.evolutionHistory.map((event, index) => (
                              <div
                                key={index}
                                className="flex items-center space-x-3 p-3 bg-white/20 dark:bg-black/20 rounded-lg"
                              >
                                <div className="w-8 h-8 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center">
                                  <Zap size={16} className="text-white" />
                                </div>
                                <div className="flex-1">
                                  <div className="font-medium text-slate-900 dark:text-slate-100">
                                    Evolved from Stage {event.fromStage} to Stage {event.toStage}
                                  </div>
                                  <div className="text-sm text-slate-500 dark:text-slate-400">
                                    {event.timestamp.toLocaleDateString()}
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-slate-500 dark:text-slate-400">
                            No evolution history yet.
                          </p>
                        )}
                      </div>
                    </div>
                  )}

                  {activeTab === 'activity' && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-3">
                          Recent Activity
                        </h3>
                        <div className="space-y-3">
                          <div className="flex items-center space-x-3 p-3 bg-white/20 dark:bg-black/20 rounded-lg">
                            <Clock size={16} className="text-slate-500 dark:text-slate-400" />
                            <div className="flex-1">
                              <div className="font-medium text-slate-900 dark:text-slate-100">
                                Listed for sale
                              </div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">
                                2 hours ago
                              </div>
                            </div>
                          </div>
                          
                          <div className="flex items-center space-x-3 p-3 bg-white/20 dark:bg-black/20 rounded-lg">
                            <TrendingUp size={16} className="text-green-500" />
                            <div className="flex-1">
                              <div className="font-medium text-slate-900 dark:text-slate-100">
                                Evolution progress increased
                              </div>
                              <div className="text-sm text-slate-500 dark:text-slate-400">
                                1 day ago
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};