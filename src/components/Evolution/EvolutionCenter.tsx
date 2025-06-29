import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Zap, 
  Plus, 
  Settings, 
  Play, 
  Pause, 
  Clock, 
  TrendingUp,
  AlertCircle,
  CheckCircle,
  Filter,
  Search
} from 'lucide-react';
import { useNFTStore } from '../../store/nftStore';
import { EvolutionRule } from '../../types';

export const EvolutionCenter: React.FC = () => {
  const { nfts, evolutionRules } = useNFTStore();
  const [activeTab, setActiveTab] = useState<'active' | 'rules' | 'history'>('active');
  const [searchTerm, setSearchTerm] = useState('');

  const evolutionReadyNFTs = nfts.filter(nft => nft.isEvolutionReady);
  const activeRules = evolutionRules.filter(rule => rule.isActive);

  const tabs = [
    { id: 'active', label: 'Active Evolutions', count: evolutionReadyNFTs.length },
    { id: 'rules', label: 'Evolution Rules', count: activeRules.length },
    { id: 'history', label: 'Evolution History', count: 42 }
  ];

  const mockActiveEvolutions = [
    {
      id: '1',
      nftName: 'Celestial Phoenix #001',
      progress: 85,
      timeRemaining: '2h 15m',
      trigger: 'Solar Activity',
      status: 'ready'
    },
    {
      id: '2',
      nftName: 'Digital Dryad #127',
      progress: 90,
      timeRemaining: '45m',
      trigger: 'Environmental Data',
      status: 'ready'
    },
    {
      id: '3',
      nftName: 'Storm Caller #089',
      progress: 65,
      timeRemaining: '4h 30m',
      trigger: 'Weather Patterns',
      status: 'in-progress'
    }
  ];

  const mockRules = [
    {
      id: '1',
      name: 'Solar Flare Evolution',
      description: 'Triggers when solar activity exceeds threshold',
      nftCount: 3,
      successRate: 87,
      isActive: true,
      lastTriggered: '2 hours ago'
    },
    {
      id: '2',
      name: 'Temperature Shift',
      description: 'Evolves based on local temperature changes',
      nftCount: 5,
      successRate: 92,
      isActive: true,
      lastTriggered: '1 day ago'
    },
    {
      id: '3',
      name: 'Community Milestone',
      description: 'Triggers when community reaches certain goals',
      nftCount: 8,
      successRate: 100,
      isActive: false,
      lastTriggered: '3 days ago'
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
              Evolution Center
            </h1>
            <p className="text-slate-600 dark:text-slate-400">
              Manage and monitor your NFT evolution processes
            </p>
          </div>
          
          <div className="flex items-center space-x-3">
            <motion.button
              className="btn-secondary flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Settings size={16} />
              <span>Settings</span>
            </motion.button>
            
            <motion.button
              className="btn-primary flex items-center space-x-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={16} />
              <span>New Rule</span>
            </motion.button>
          </div>
        </div>
      </motion.div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
          {
            title: 'Ready to Evolve',
            value: evolutionReadyNFTs.length,
            change: '+2',
            icon: Zap,
            color: 'primary'
          },
          {
            title: 'Active Rules',
            value: activeRules.length,
            change: '+1',
            icon: Settings,
            color: 'secondary'
          },
          {
            title: 'Success Rate',
            value: '87%',
            change: '+5%',
            icon: TrendingUp,
            color: 'accent'
          },
          {
            title: 'Total Evolutions',
            value: '42',
            change: '+8',
            icon: CheckCircle,
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

      {/* Tabs */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card"
      >
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6">
          <div className="flex space-x-1 bg-white/20 dark:bg-black/20 rounded-xl p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'bg-primary-500 text-white'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100'
                }`}
              >
                {tab.label}
                {tab.count > 0 && (
                  <span className={`ml-2 px-2 py-0.5 rounded-full text-xs ${
                    activeTab === tab.id
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}>
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {/* Search and Filter */}
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 pr-4 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-lg text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
            </div>
            
            <button className="p-2 rounded-lg bg-white/20 dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
              <Filter size={16} />
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <div className="space-y-4">
          {activeTab === 'active' && (
            <div className="space-y-4">
              {mockActiveEvolutions.map((evolution, index) => (
                <motion.div
                  key={evolution.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/20 dark:bg-black/20 rounded-xl p-4 hover:bg-white/30 dark:hover:bg-black/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        evolution.status === 'ready' 
                          ? 'bg-gradient-to-r from-primary-500 to-secondary-500' 
                          : 'bg-gradient-to-r from-slate-400 to-slate-500'
                      }`}>
                        <Zap size={20} className="text-white" />
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                          {evolution.nftName}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          Trigger: {evolution.trigger}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          {evolution.progress}%
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Progress
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          {evolution.timeRemaining}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Remaining
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        {evolution.status === 'ready' ? (
                          <motion.button
                            className="btn-primary flex items-center space-x-2"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            <Play size={16} />
                            <span>Evolve</span>
                          </motion.button>
                        ) : (
                          <button className="btn-secondary flex items-center space-x-2">
                            <Clock size={16} />
                            <span>Waiting</span>
                          </button>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="mt-4">
                    <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                      <motion.div
                        className={`h-2 rounded-full ${
                          evolution.status === 'ready'
                            ? 'bg-gradient-to-r from-primary-500 to-secondary-500'
                            : 'bg-gradient-to-r from-slate-400 to-slate-500'
                        }`}
                        initial={{ width: 0 }}
                        animate={{ width: `${evolution.progress}%` }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                      />
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'rules' && (
            <div className="space-y-4">
              {mockRules.map((rule, index) => (
                <motion.div
                  key={rule.id}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="bg-white/20 dark:bg-black/20 rounded-xl p-4 hover:bg-white/30 dark:hover:bg-black/30 transition-colors"
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        rule.isActive 
                          ? 'bg-gradient-to-r from-green-500 to-green-600' 
                          : 'bg-gradient-to-r from-slate-400 to-slate-500'
                      }`}>
                        {rule.isActive ? (
                          <CheckCircle size={20} className="text-white" />
                        ) : (
                          <Pause size={20} className="text-white" />
                        )}
                      </div>
                      
                      <div>
                        <h3 className="font-semibold text-slate-900 dark:text-slate-100">
                          {rule.name}
                        </h3>
                        <p className="text-sm text-slate-500 dark:text-slate-400">
                          {rule.description}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          {rule.nftCount}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          NFTs
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-lg font-bold text-slate-900 dark:text-slate-100">
                          {rule.successRate}%
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Success
                        </div>
                      </div>

                      <div className="text-center">
                        <div className="text-sm font-medium text-slate-900 dark:text-slate-100">
                          {rule.lastTriggered}
                        </div>
                        <div className="text-xs text-slate-500 dark:text-slate-400">
                          Last Triggered
                        </div>
                      </div>

                      <div className="flex items-center space-x-2">
                        <button
                          className={`p-2 rounded-lg transition-colors ${
                            rule.isActive
                              ? 'bg-green-500 text-white'
                              : 'bg-slate-300 dark:bg-slate-600 text-slate-600 dark:text-slate-400'
                          }`}
                        >
                          {rule.isActive ? <Pause size={16} /> : <Play size={16} />}
                        </button>
                        
                        <button className="p-2 rounded-lg bg-white/20 dark:bg-black/20 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors">
                          <Settings size={16} />
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {activeTab === 'history' && (
            <div className="text-center py-12">
              <div className="w-32 h-32 mx-auto mb-6 opacity-50">
                <Clock size={128} className="w-full h-full text-slate-400" />
              </div>
              <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                Evolution History
              </h3>
              <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto">
                Track all your past evolution events, success rates, and performance metrics.
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};