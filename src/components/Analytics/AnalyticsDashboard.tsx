import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  TrendingDown, 
  BarChart3, 
  PieChart, 
  Activity,
  DollarSign,
  Zap,
  Users,
  Calendar,
  Download,
  RefreshCw,
  Filter
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  ResponsiveContainer, 
  PieChart as RechartsPieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar,
  LineChart,
  Line,
  Tooltip,
  Legend
} from 'recharts';
import { mockAnalytics } from '../../data/mockData';

export const AnalyticsDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'portfolio' | 'evolution' | 'community' | 'market'>('portfolio');
  const [timeRange, setTimeRange] = useState<'7d' | '30d' | '90d' | '1y'>('30d');

  const tabs = [
    { id: 'portfolio', label: 'Portfolio', icon: BarChart3 },
    { id: 'evolution', label: 'Evolution', icon: Zap },
    { id: 'community', label: 'Community', icon: Users },
    { id: 'market', label: 'Market', icon: TrendingUp }
  ];

  const timeRanges = [
    { id: '7d', label: '7 Days' },
    { id: '30d', label: '30 Days' },
    { id: '90d', label: '90 Days' },
    { id: '1y', label: '1 Year' }
  ];

  const portfolioData = [
    { date: 'Jan 15', value: 8.2, volume: 12 },
    { date: 'Jan 16', value: 9.1, volume: 15 },
    { date: 'Jan 17', value: 8.8, volume: 18 },
    { date: 'Jan 18', value: 10.3, volume: 22 },
    { date: 'Jan 19', value: 11.7, volume: 19 },
    { date: 'Jan 20', value: 12.1, volume: 25 },
    { date: 'Jan 21', value: 12.7, volume: 28 },
  ];

  const rarityData = [
    { name: 'Common', value: 2, color: '#64748b' },
    { name: 'Uncommon', value: 3, color: '#22c55e' },
    { name: 'Rare', value: 4, color: '#3b82f6' },
    { name: 'Epic', value: 2, color: '#a855f7' },
    { name: 'Legendary', value: 1, color: '#f59e0b' },
  ];

  const evolutionTrends = mockAnalytics.evolution.evolutionTrends.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

  const communityEngagement = mockAnalytics.community.engagement.map(item => ({
    ...item,
    date: new Date(item.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }));

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
              Analytics Dashboard
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Comprehensive insights into your NFT portfolio and market performance
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value as any)}
              className="px-4 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-lg text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            >
              {timeRanges.map((range) => (
                <option key={range.id} value={range.id}>
                  {range.label}
                </option>
              ))}
            </select>
            
            <motion.button
              className="btn-secondary flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <RefreshCw size={16} />
              <span>Refresh</span>
            </motion.button>
            
            <motion.button
              className="btn-primary flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Download size={16} />
              <span>Export</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Portfolio Value',
            value: `${mockAnalytics.portfolio.totalValue} ETH`,
            change: `${mockAnalytics.portfolio.valueChange24h > 0 ? '+' : ''}${mockAnalytics.portfolio.valueChange24h}%`,
            isPositive: mockAnalytics.portfolio.valueChange24h > 0,
            icon: DollarSign,
            color: 'primary'
          },
          {
            title: 'Total Evolutions',
            value: mockAnalytics.evolution.totalEvolutions.toString(),
            change: `${mockAnalytics.evolution.successRate}% success`,
            isPositive: true,
            icon: Zap,
            color: 'secondary'
          },
          {
            title: 'Community Posts',
            value: mockAnalytics.community.totalPosts.toString(),
            change: '+12 this week',
            isPositive: true,
            icon: Users,
            color: 'accent'
          },
          {
            title: 'Market Volume',
            value: `${mockAnalytics.market.totalVolume} ETH`,
            change: '+8.2% vs last month',
            isPositive: true,
            icon: Activity,
            color: 'purple'
          }
        ].map((metric, index) => {
          const Icon = metric.icon;
          return (
            <motion.div
              key={metric.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="glass-card group hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-xl bg-gradient-to-br from-${metric.color}-500/20 to-${metric.color}-600/20`}>
                  <Icon size={24} className={`text-${metric.color}-600 dark:text-${metric.color}-400`} />
                </div>
                <div className={`flex items-center space-x-1 text-sm ${
                  metric.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                }`}>
                  {metric.isPositive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
                  <span>{metric.change}</span>
                </div>
              </div>
              
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-1">
                  {metric.value}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  {metric.title}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
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

          <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 dark:bg-black/20 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
            <Filter size={16} />
            <span>Filter</span>
          </button>
        </div>

        {/* Tab Content */}
        <div className="space-y-6">
          {activeTab === 'portfolio' && (
            <>
              {/* Portfolio Performance Chart */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Portfolio Performance
                  </h3>
                  <div className="h-64">
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
                        <Tooltip 
                          contentStyle={{
                            backgroundColor: 'rgba(255, 255, 255, 0.1)',
                            backdropFilter: 'blur(10px)',
                            border: '1px solid rgba(255, 255, 255, 0.2)',
                            borderRadius: '8px'
                          }}
                        />
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
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Rarity Distribution
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <RechartsPieChart>
                        <Pie
                          data={rarityData}
                          cx="50%"
                          cy="50%"
                          innerRadius={60}
                          outerRadius={100}
                          paddingAngle={2}
                          dataKey="value"
                        >
                          {rarityData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                      </RechartsPieChart>
                    </ResponsiveContainer>
                  </div>
                </div>
              </div>

              {/* Collection Breakdown */}
              <div>
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Collection Breakdown
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockAnalytics.portfolio.distribution.byCollection.map((collection, index) => (
                    <div key={collection.name} className="bg-white/20 dark:bg-black/20 rounded-xl p-4">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium text-slate-900 dark:text-slate-100">
                          {collection.name}
                        </h4>
                        <span className="text-sm text-slate-500 dark:text-slate-400">
                          {collection.count} NFTs
                        </span>
                      </div>
                      <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                        {collection.value} ETH
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === 'evolution' && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Evolution Trends
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={evolutionTrends}>
                        <XAxis 
                          dataKey="date" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#64748b' }}
                        />
                        <YAxis hide />
                        <Tooltip />
                        <Line
                          type="monotone"
                          dataKey="count"
                          stroke="#22c55e"
                          strokeWidth={2}
                          dot={{ fill: '#22c55e', strokeWidth: 2, r: 4 }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Trigger Types Performance
                  </h3>
                  <div className="space-y-3">
                    {mockAnalytics.evolution.triggerTypes.map((trigger, index) => (
                      <div key={trigger.type} className="bg-white/20 dark:bg-black/20 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-900 dark:text-slate-100 capitalize">
                            {trigger.type}
                          </span>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {trigger.successRate}% success
                          </span>
                        </div>
                        <div className="flex items-center justify-between">
                          <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                            {trigger.count}
                          </div>
                          <div className="w-24 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-green-500 to-green-600 h-2 rounded-full"
                              style={{ width: `${trigger.successRate}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'community' && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Community Engagement
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={communityEngagement}>
                        <XAxis 
                          dataKey="date" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#64748b' }}
                        />
                        <YAxis hide />
                        <Tooltip />
                        <Bar dataKey="posts" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                        <Bar dataKey="comments" fill="#22c55e" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Popular Tags
                  </h3>
                  <div className="space-y-3">
                    {mockAnalytics.community.popularTags.map((tag, index) => (
                      <div key={tag.tag} className="flex items-center justify-between">
                        <span className="font-medium text-slate-900 dark:text-slate-100">
                          #{tag.tag}
                        </span>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            {tag.count} posts
                          </span>
                          <div className="w-20 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                            <div
                              className="bg-gradient-to-r from-primary-500 to-secondary-500 h-2 rounded-full"
                              style={{ width: `${(tag.count / Math.max(...mockAnalytics.community.popularTags.map(t => t.count))) * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'market' && (
            <>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Market Trends
                  </h3>
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mockAnalytics.market.priceHistory}>
                        <defs>
                          <linearGradient id="marketGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <XAxis 
                          dataKey="date" 
                          axisLine={false}
                          tickLine={false}
                          tick={{ fontSize: 12, fill: '#64748b' }}
                        />
                        <YAxis hide />
                        <Tooltip />
                        <Area
                          type="monotone"
                          dataKey="price"
                          stroke="#f59e0b"
                          strokeWidth={2}
                          fill="url(#marketGradient)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
                    Top Collections
                  </h3>
                  <div className="space-y-3">
                    {mockAnalytics.market.topCollections.map((collection, index) => (
                      <div key={collection.name} className="bg-white/20 dark:bg-black/20 rounded-lg p-3">
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-medium text-slate-900 dark:text-slate-100">
                            {collection.name}
                          </span>
                          <span className="text-sm text-slate-500 dark:text-slate-400">
                            Floor: {collection.floorPrice} ETH
                          </span>
                        </div>
                        <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          {collection.volume} ETH
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </div>
      </motion.div>
    </div>
  );
};