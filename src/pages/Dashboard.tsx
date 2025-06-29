import React from 'react';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Zap,
  Users,
  Star,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Clock,
  Flame,
  DollarSign
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { useNFTStore } from '../store/nftStore';
import { useUserStore } from '../store/userStore';
import { mockAnalytics } from '../data/mockData';
import { NFTCard } from '../components/NFT/NFTCard';
import { CashoutModal } from '../components/Cashout/CashoutModal';
import { useState } from 'react';

const portfolioData = [
  { date: 'Jan 15', value: 8.2 },
  { date: 'Jan 16', value: 9.1 },
  { date: 'Jan 17', value: 8.8 },
  { date: 'Jan 18', value: 10.3 },
  { date: 'Jan 19', value: 11.7 },
  { date: 'Jan 20', value: 12.1 },
  { date: 'Jan 21', value: 12.7 },
];

const evolutionData = [
  { stage: 'Stage 1', count: 4 },
  { stage: 'Stage 2', count: 8 },
  { stage: 'Stage 3', count: 5 },
  { stage: 'Stage 4', count: 1 },
];

const rarityData = [
  { name: 'Common', value: 2, color: '#64748b' },
  { name: 'Uncommon', value: 3, color: '#22c55e' },
  { name: 'Rare', value: 4, color: '#3b82f6' },
  { name: 'Epic', value: 2, color: '#a855f7' },
  { name: 'Legendary', value: 1, color: '#f59e0b' },
];

export const Dashboard: React.FC = () => {
  const { nfts } = useNFTStore();
  const { user, wallet, isAuthenticated } = useUserStore();
  const [showCashoutModal, setShowCashoutModal] = useState(false);

  const stats = [
    {
      title: 'Portfolio Value',
      value: '12.7 ETH',
      change: '+8.2%',
      isPositive: true,
      icon: TrendingUp,
      color: 'primary'
    },
    {
      title: 'Total NFTs',
      value: '18',
      change: '+2',
      isPositive: true,
      icon: Star,
      color: 'secondary'
    },
    {
      title: 'Evolutions',
      value: '42',
      change: '+5',
      isPositive: true,
      icon: Zap,
      color: 'accent'
    },
    {
      title: 'Community Rank',
      value: '#127',
      change: '+15',
      isPositive: true,
      icon: Users,
      color: 'purple'
    }
  ];

  const recentActivity = [
    {
      type: 'evolution',
      title: 'Phoenix evolved to Stage 4',
      time: '2 hours ago',
      icon: Zap,
      color: 'text-yellow-500'
    },
    {
      type: 'community',
      title: 'New comment on your post',
      time: '4 hours ago',
      icon: Users,
      color: 'text-blue-500'
    },
    {
      type: 'activity',
      title: 'Rule "Solar Flare" triggered',
      time: '6 hours ago',
      icon: Activity,
      color: 'text-green-500'
    },
    {
      type: 'evolution',
      title: 'Guardian ready for evolution',
      time: '1 day ago',
      icon: Flame,
      color: 'text-red-500'
    }
  ];

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold text-slate-900 dark:text-slate-100 mb-2">
              Welcome back, {user?.username || 'Explorer'}! 👋
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Here's what's happening with your dynamic NFT collection today.
            </p>
          </div>
          <div className="flex items-center space-x-4">
            {/* Quick Cashout Button */}
            {isAuthenticated && wallet && wallet.balance > 0 && (
              <motion.button
                onClick={() => setShowCashoutModal(true)}
                className="hidden lg:flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <DollarSign size={20} />
                <div className="text-left">
                  <div className="text-sm font-medium">Quick Cashout</div>
                  <div className="text-xs opacity-90">{wallet.balance.toFixed(2)} ETH Available</div>
                </div>
              </motion.button>
            )}
            
            <div className="hidden lg:block">
              <motion.div
                className="w-32 h-32 bg-gradient-to-br from-primary-500/20 to-secondary-500/20 rounded-2xl flex items-center justify-center"
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 6, repeat: Infinity }}
              >
                <Zap size={48} className="text-primary-600 dark:text-primary-400" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
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
                <div className={`p-3 rounded-xl bg-gradient-to-br from-${stat.color}-500/20 to-${stat.color}-600/20`}>
                  <Icon size={24} className={`text-${stat.color}-600 dark:text-${stat.color}-400`} />
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

      {/* Earnings & Cashout Section */}
      {isAuthenticated && wallet && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
        >
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="flex-1">
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Your Earnings
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Available Balance</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    {wallet.balance.toFixed(4)} ETH
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    ≈ ${(wallet.balance * 2400).toLocaleString()} USD
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">This Month</p>
                  <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                    +0.85 ETH
                  </p>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    +12.5% from last month
                  </p>
                </div>
                <div>
                  <p className="text-sm text-slate-500 dark:text-slate-400">Total Earned</p>
                  <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                    8.42 ETH
                  </p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Since joining
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col space-y-3">
              <motion.button
                onClick={() => setShowCashoutModal(true)}
                className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <DollarSign size={20} />
                <span>Cashout Now</span>
              </motion.button>
              <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
                Instant withdrawals available
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Portfolio Performance */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Portfolio Performance
            </h3>
            <div className="text-sm text-slate-500 dark:text-slate-400">
              Last 7 days
            </div>
          </div>
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={portfolioData}>
                <defs>
                  <linearGradient id="portfolioGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.05} />
                  </linearGradient>
                </defs>
                <XAxis 
                  dataKey="date" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis hide />
                <Area
                  type="monotone"
                  dataKey="value"
                  stroke="#3b82f6"
                  strokeWidth={2}
                  fill="url(#portfolioGradient)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </motion.div>

        {/* Evolution Distribution */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="glass-card"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Evolution Stages
            </h3>
          </div>
          
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={evolutionData}>
                <XAxis 
                  dataKey="stage" 
                  axisLine={false}
                  tickLine={false}
                  tick={{ fontSize: 12, fill: '#64748b' }}
                />
                <YAxis hide />
                <Bar 
                  dataKey="count" 
                  fill="#22c55e"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>

      {/* Content Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card lg:col-span-2"
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
              Recent Activity
            </h3>
            <button className="text-primary-600 dark:text-primary-400 text-sm hover:underline">
              View All
            </button>
          </div>
          
          <div className="space-y-4">
            {recentActivity.map((activity, index) => {
              const Icon = activity.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
                >
                  <div className={`p-2 rounded-lg bg-white/20 dark:bg-black/20 ${activity.color}`}>
                    <Icon size={16} />
                  </div>
                  <div className="flex-1">
                    <div className="font-medium text-slate-900 dark:text-slate-100">
                      {activity.title}
                    </div>
                    <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                      <Clock size={12} />
                      <span>{activity.time}</span>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Rarity Distribution */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card"
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-6">
            Rarity Distribution
          </h3>
          
          <div className="h-48 mb-4">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={rarityData}
                  cx="50%"
                  cy="50%"
                  innerRadius={40}
                  outerRadius={80}
                  paddingAngle={2}
                  dataKey="value"
                >
                  {rarityData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
          
          <div className="space-y-2">
            {rarityData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div 
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: item.color }}
                  />
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    {item.name}
                  </span>
                </div>
                <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                  {item.value}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Featured NFTs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card"
      >
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Evolution Ready NFTs
          </h3>
          <button className="text-primary-600 dark:text-primary-400 text-sm hover:underline">
            View Collection
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {nfts
            .filter(nft => nft.isEvolutionReady)
            .slice(0, 4)
            .map((nft, index) => (
              <motion.div
                key={nft.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NFTCard nft={nft} size="small" />
              </motion.div>
            ))}
        </div>
      </motion.div>

      {/* Cashout Modal */}
      <CashoutModal 
        isOpen={showCashoutModal} 
        onClose={() => setShowCashoutModal(false)} 
      />
    </div>
  );
};