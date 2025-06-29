import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  MessageSquare, 
  TrendingUp, 
  Plus, 
  Search, 
  Filter,
  Heart,
  Share2,
  MessageCircle,
  Eye,
  Clock,
  Star,
  Award,
  Flame
} from 'lucide-react';
import { mockCommunities, mockPosts } from '../../data/mockData';

export const CommunityHub: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'feed' | 'communities' | 'discussions'>('feed');
  const [searchTerm, setSearchTerm] = useState('');

  const tabs = [
    { id: 'feed', label: 'Feed', icon: TrendingUp },
    { id: 'communities', label: 'Communities', icon: Users },
    { id: 'discussions', label: 'Discussions', icon: MessageSquare }
  ];

  const mockFeedPosts = [
    {
      id: '1',
      author: 'EvolutionPro',
      avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=100',
      time: '2 hours ago',
      content: 'Just discovered an amazing correlation between solar flare activity and Phoenix evolution rates! 🔥 My Phoenix evolved to Stage 4 during yesterday\'s solar storm.',
      image: 'https://images.pexels.com/photos/326212/pexels-photo-326212.jpeg?auto=compress&cs=tinysrgb&w=500',
      likes: 42,
      comments: 18,
      shares: 7,
      tags: ['evolution', 'phoenix', 'solar']
    },
    {
      id: '2',
      author: 'CrystalHunter',
      avatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100',
      time: '5 hours ago',
      content: 'My Crystal Guardian collection just hit a major milestone! All 5 guardians are now synchronized and evolving together. The community power is real! 💎',
      likes: 73,
      comments: 31,
      shares: 12,
      tags: ['crystal', 'guardian', 'milestone']
    },
    {
      id: '3',
      author: 'WeatherWatcher',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      time: '1 day ago',
      content: 'Temperature-based evolution patterns are fascinating! I\'ve been tracking my Storm Caller for 3 months and found some incredible insights. Check out this data visualization!',
      image: 'https://images.pexels.com/photos/1118873/pexels-photo-1118873.jpeg?auto=compress&cs=tinysrgb&w=500',
      likes: 56,
      comments: 24,
      shares: 9,
      tags: ['weather', 'data', 'storm']
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
              Community Hub
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Connect, share, and learn with the dynamic NFT community
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              className="btn-secondary flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Search size={16} />
              <span>Explore</span>
            </motion.button>
            
            <motion.button
              className="btn-primary flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={16} />
              <span>New Post</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Active Members',
            value: '12.4K',
            change: '+8.2%',
            icon: Users,
            color: 'primary'
          },
          {
            title: 'Daily Posts',
            value: '247',
            change: '+15%',
            icon: MessageSquare,
            color: 'secondary'
          },
          {
            title: 'Community Score',
            value: '9.2',
            change: '+0.3',
            icon: Star,
            color: 'accent'
          },
          {
            title: 'Your Rank',
            value: '#127',
            change: '+15',
            icon: Award,
            color: 'purple'
          }
        ].map((stat, index) => {
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
                <div className="text-sm text-green-600 dark:text-green-400 font-medium">
                  {stat.change}
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

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Navigation
            </h3>
            <div className="space-y-2">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors ${
                      activeTab === tab.id
                        ? 'bg-primary-500 text-white'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-white/20 dark:hover:bg-black/20 hover:text-slate-900 dark:hover:text-slate-100'
                    }`}
                  >
                    <Icon size={16} />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>

          {/* Trending Topics */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Trending Topics
            </h3>
            <div className="space-y-3">
              {[
                { tag: '#evolution', posts: 245 },
                { tag: '#phoenix', posts: 189 },
                { tag: '#crystal', posts: 156 },
                { tag: '#weather', posts: 134 },
                { tag: '#community', posts: 98 }
              ].map((topic, index) => (
                <div key={topic.tag} className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Flame size={14} className="text-orange-500" />
                    <span className="text-sm font-medium text-slate-900 dark:text-slate-100">
                      {topic.tag}
                    </span>
                  </div>
                  <span className="text-xs text-slate-500 dark:text-slate-400">
                    {topic.posts} posts
                  </span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Top Communities */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="glass-card"
          >
            <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-4">
              Top Communities
            </h3>
            <div className="space-y-3">
              {mockCommunities.slice(0, 3).map((community, index) => (
                <div key={community.id} className="flex items-center space-x-3">
                  <img
                    src={community.image}
                    alt={community.name}
                    className="w-8 h-8 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium text-slate-900 dark:text-slate-100 truncate">
                      {community.name}
                    </div>
                    <div className="text-xs text-slate-500 dark:text-slate-400">
                      {community.memberCount.toLocaleString()} members
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-card"
          >
            {/* Search and Filter */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
                <input
                  type="text"
                  placeholder="Search posts, users, or topics..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
                />
              </div>
              
              <button className="flex items-center space-x-2 px-4 py-2 bg-white/20 dark:bg-black/20 rounded-lg text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                <Filter size={16} />
                <span>Filter</span>
              </button>
            </div>

            {/* Content */}
            {activeTab === 'feed' && (
              <div className="space-y-6">
                {mockFeedPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/20 dark:bg-black/20 rounded-xl p-6 hover:bg-white/30 dark:hover:bg-black/30 transition-colors"
                  >
                    {/* Post Header */}
                    <div className="flex items-center space-x-3 mb-4">
                      <img
                        src={post.avatar}
                        alt={post.author}
                        className="w-10 h-10 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <div className="font-semibold text-slate-900 dark:text-slate-100">
                          {post.author}
                        </div>
                        <div className="text-sm text-slate-500 dark:text-slate-400 flex items-center space-x-1">
                          <Clock size={12} />
                          <span>{post.time}</span>
                        </div>
                      </div>
                    </div>

                    {/* Post Content */}
                    <div className="mb-4">
                      <p className="text-slate-700 dark:text-slate-300 leading-relaxed mb-3">
                        {post.content}
                      </p>
                      
                      {post.image && (
                        <div className="rounded-xl overflow-hidden">
                          <img
                            src={post.image}
                            alt="Post content"
                            className="w-full h-64 object-cover"
                          />
                        </div>
                      )}
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-primary-500/20 text-primary-700 dark:text-primary-300 rounded-full text-xs font-medium"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    {/* Post Actions */}
                    <div className="flex items-center justify-between pt-4 border-t border-white/20 dark:border-white/10">
                      <div className="flex items-center space-x-6">
                        <button className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-red-500 transition-colors">
                          <Heart size={16} />
                          <span className="text-sm">{post.likes}</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-blue-500 transition-colors">
                          <MessageCircle size={16} />
                          <span className="text-sm">{post.comments}</span>
                        </button>
                        
                        <button className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-green-500 transition-colors">
                          <Share2 size={16} />
                          <span className="text-sm">{post.shares}</span>
                        </button>
                      </div>

                      <button className="flex items-center space-x-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                        <Eye size={16} />
                        <span className="text-sm">View Details</span>
                      </button>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'communities' && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {mockCommunities.map((community, index) => (
                  <motion.div
                    key={community.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="bg-white/20 dark:bg-black/20 rounded-xl p-6 hover:bg-white/30 dark:hover:bg-black/30 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src={community.image}
                        alt={community.name}
                        className="w-16 h-16 rounded-xl object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                          {community.name}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {community.memberCount.toLocaleString()} members
                        </p>
                      </div>
                    </div>

                    <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
                      {community.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mb-4">
                      {community.tags.slice(0, 3).map((tag, tagIndex) => (
                        <span
                          key={tagIndex}
                          className="px-2 py-1 bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400 rounded-full text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <button className="w-full btn-primary">
                      Join Community
                    </button>
                  </motion.div>
                ))}
              </div>
            )}

            {activeTab === 'discussions' && (
              <div className="text-center py-12">
                <div className="w-32 h-32 mx-auto mb-6 opacity-50">
                  <MessageSquare size={128} className="w-full h-full text-slate-400" />
                </div>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  Discussion Forums
                </h3>
                <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                  Engage in detailed discussions about evolution strategies, market trends, and community governance.
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
};