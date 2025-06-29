import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  ShoppingBag, 
  Search, 
  Filter, 
  Grid, 
  List,
  TrendingUp,
  Clock,
  Eye,
  Heart,
  Tag,
  Zap,
  Star,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { NFTCard } from '../NFT/NFTCard';
import { mockNFTs } from '../../data/mockData';

export const MarketplaceHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'trending' | 'new' | 'auctions' | 'sold'>('trending');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('price_low');

  const tabs = [
    { id: 'trending', label: 'Trending', icon: TrendingUp },
    { id: 'new', label: 'New Listings', icon: Clock },
    { id: 'auctions', label: 'Live Auctions', icon: Zap },
    { id: 'sold', label: 'Recently Sold', icon: Tag }
  ];

  const sortOptions = [
    { value: 'price_low', label: 'Price: Low to High' },
    { value: 'price_high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rarity', label: 'Rarity' },
    { value: 'evolution', label: 'Evolution Stage' }
  ];

  const marketStats = [
    {
      title: 'Total Volume',
      value: '234.7 ETH',
      change: '+12.5%',
      isPositive: true,
      icon: ShoppingBag
    },
    {
      title: 'Floor Price',
      value: '0.8 ETH',
      change: '+5.2%',
      isPositive: true,
      icon: TrendingUp
    },
    {
      title: 'Active Listings',
      value: '1,247',
      change: '+8.1%',
      isPositive: true,
      icon: Tag
    },
    {
      title: 'Unique Owners',
      value: '892',
      change: '+3.7%',
      isPositive: true,
      icon: Eye
    }
  ];

  const featuredCollections = [
    {
      name: 'Celestial Beings',
      image: 'https://images.pexels.com/photos/326212/pexels-photo-326212.jpeg?auto=compress&cs=tinysrgb&w=200',
      volume: '87.3 ETH',
      floorPrice: '2.1 ETH',
      change: '+15.2%',
      isPositive: true
    },
    {
      name: 'Crystal Guardians',
      image: 'https://images.pexels.com/photos/132037/pexels-photo-132037.jpeg?auto=compress&cs=tinysrgb&w=200',
      volume: '65.8 ETH',
      floorPrice: '1.4 ETH',
      change: '+8.7%',
      isPositive: true
    },
    {
      name: 'Digital Druids',
      image: 'https://images.pexels.com/photos/1591447/pexels-photo-1591447.jpeg?auto=compress&cs=tinysrgb&w=200',
      volume: '48.9 ETH',
      floorPrice: '0.8 ETH',
      change: '-2.1%',
      isPositive: false
    }
  ];

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
              NFT Marketplace
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Discover, buy, and sell dynamic NFTs in the premier marketplace
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              className="btn-secondary flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Heart size={16} />
              <span>Watchlist</span>
            </motion.button>
            
            <motion.button
              className="btn-primary flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Tag size={16} />
              <span>List NFT</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Market Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {marketStats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card group hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 rounded-xl bg-gradient-to-br from-primary-500/20 to-primary-600/20">
                  <Icon size={24} className="text-primary-600 dark:text-primary-400" />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  stat.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {stat.isPositive ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
                  <span>{stat.change}</span>
                </div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {stat.title}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Featured Collections */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card"
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
            Featured Collections
          </h2>
          <button className="text-primary-600 dark:text-primary-400 text-sm hover:underline">
            View All
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {featuredCollections.map((collection, index) => (
            <motion.div
              key={collection.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/20 dark:bg-black/20 rounded-xl p-4 hover:bg-white/30 dark:hover:bg-black/30 transition-colors cursor-pointer"
            >
              <div className="flex items-center space-x-4 mb-4">
                <img
                  src={collection.image}
                  alt={collection.name}
                  className="w-16 h-16 rounded-xl object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                    {collection.name}
                  </h3>
                  <div className={`text-sm ${
                    collection.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                  }`}>
                    {collection.change}
                  </div>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Volume</div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    {collection.volume}
                  </div>
                </div>
                <div>
                  <div className="text-sm text-slate-500 dark:text-slate-400">Floor</div>
                  <div className="font-semibold text-slate-900 dark:text-slate-100">
                    {collection.floorPrice}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Marketplace Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card"
      >
        {/* Filters and Controls */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-6">
          {/* Tabs */}
          <div className="flex space-x-1 bg-white/20 dark:bg-black/20 rounded-xl p-1">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-primary-500 text-white'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                  }`}
                >
                  <Icon size={16} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search and Controls */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search NFTs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-4 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>

            <button className="p-2 rounded-lg bg-white/20 dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              <Filter size={16} />
            </button>

            {/* View Mode Toggle */}
            <div className="flex items-center bg-white/20 dark:bg-black/20 rounded-lg p-1">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'grid'
                    ? 'bg-primary-500 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <Grid size={16} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2 rounded transition-colors ${
                  viewMode === 'list'
                    ? 'bg-primary-500 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* NFT Grid */}
        <div className={`grid gap-6 ${
          viewMode === 'grid' 
            ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' 
            : 'grid-cols-1'
        }`}>
          {mockNFTs.map((nft, index) => (
            <motion.div
              key={nft.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              {viewMode === 'grid' ? (
                <NFTCard nft={nft} size="medium" />
              ) : (
                <div className="bg-white/20 dark:bg-black/20 rounded-xl p-4 hover:bg-white/30 dark:hover:bg-black/30 transition-colors">
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
                        <div className="flex items-center space-x-1">
                          <Star size={14} className="text-yellow-500" />
                          <span className="text-sm text-slate-600 dark:text-slate-400">
                            Stage {nft.evolutionStage}
                          </span>
                        </div>
                        <span className="text-sm text-slate-600 dark:text-slate-400">
                          {nft.rarity}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      {nft.price && (
                        <div className="text-xl font-bold text-slate-900 dark:text-slate-100">
                          {nft.price} ETH
                        </div>
                      )}
                      <div className="text-sm text-slate-500 dark:text-slate-400">
                        Current Price
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};