import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Search, 
  Bell, 
  Settings, 
  User, 
  Moon, 
  Sun, 
  Monitor,
  Menu,
  X,
  Wallet,
  LogOut,
  DollarSign
} from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useUserStore } from '../../store/userStore';
import { CashoutModal } from '../Cashout/CashoutModal';

interface HeaderProps {
  onMobileMenuToggle: () => void;
  isMobileMenuOpen: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onMobileMenuToggle, isMobileMenuOpen }) => {
  const { theme, setTheme, isDark } = useTheme();
  const { user, wallet, isAuthenticated, connectWallet, disconnectWallet, notifications } = useUserStore();
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showThemeMenu, setShowThemeMenu] = useState(false);
  const [showCashoutModal, setShowCashoutModal] = useState(false);

  const unreadNotifications = notifications.filter(n => !n.isRead).length;

  const handleConnectWallet = async () => {
    await connectWallet('metamask');
  };

  const themeIcons = {
    light: Sun,
    dark: Moon,
    auto: Monitor,
  };

  const ThemeIcon = themeIcons[theme];

  return (
    <>
      <header className="glass-effect border-b border-white/20 dark:border-white/10 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Mobile menu button */}
            <button
              onClick={onMobileMenuToggle}
              className="lg:hidden p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <div className="flex items-center space-x-3">
              <motion.div
                className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span className="text-white font-bold text-lg">N</span>
              </motion.div>
              <div className="hidden sm:block">
                <h1 className="text-xl font-display font-bold gradient-text">
                  NeoVerse
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Dynamic NFT Platform
                </p>
              </div>
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-lg mx-8">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search NFTs, collections, or users..."
                  className="w-full pl-10 pr-4 py-2 bg-white/20 dark:bg-black/20 backdrop-blur-sm border border-white/30 dark:border-white/10 rounded-xl text-slate-900 dark:text-slate-100 placeholder-slate-500 dark:placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-primary-500/50 focus:border-primary-500/50 transition-all"
                />
              </div>
            </div>

            {/* Right side buttons */}
            <div className="flex items-center space-x-2">
              {/* Cashout Button */}
              {isAuthenticated && wallet && wallet.balance > 0 && (
                <motion.button
                  onClick={() => setShowCashoutModal(true)}
                  className="hidden sm:flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-xl shadow-lg hover:shadow-xl transition-all duration-200"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <DollarSign size={16} />
                  <span>Cashout</span>
                </motion.button>
              )}

              {/* Mobile Cashout Button */}
              {isAuthenticated && wallet && wallet.balance > 0 && (
                <button
                  onClick={() => setShowCashoutModal(true)}
                  className="sm:hidden p-2 rounded-lg bg-gradient-to-r from-green-500 to-green-600 text-white transition-colors"
                >
                  <DollarSign size={20} />
                </button>
              )}

              {/* Theme Toggle */}
              <div className="relative">
                <button
                  onClick={() => setShowThemeMenu(!showThemeMenu)}
                  className="p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
                >
                  <ThemeIcon size={20} />
                </button>
                
                {showThemeMenu && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="absolute right-0 mt-2 w-48 glass-effect rounded-xl shadow-xl border border-white/20 dark:border-white/10 py-1 z-50"
                  >
                    {(['light', 'dark', 'auto'] as const).map((themeOption) => {
                      const Icon = themeIcons[themeOption];
                      return (
                        <button
                          key={themeOption}
                          onClick={() => {
                            setTheme(themeOption);
                            setShowThemeMenu(false);
                          }}
                          className={`w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-white/20 dark:hover:bg-black/20 transition-colors ${
                            theme === themeOption ? 'text-primary-600 dark:text-primary-400' : 'text-slate-700 dark:text-slate-300'
                          }`}
                        >
                          <Icon size={16} />
                          <span className="capitalize">{themeOption}</span>
                        </button>
                      );
                    })}
                  </motion.div>
                )}
              </div>

              {/* Notifications */}
              <div className="relative">
                <button
                  onClick={() => setShowNotifications(!showNotifications)}
                  className="relative p-2 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
                >
                  <Bell size={20} />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-accent-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </button>
              </div>

              {/* User Profile / Connect Wallet */}
              {isAuthenticated ? (
                <div className="relative">
                  <button
                    onClick={() => setShowProfileMenu(!showProfileMenu)}
                    className="flex items-center space-x-2 p-2 rounded-lg hover:bg-white/20 dark:hover:bg-black/20 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center">
                      <User size={16} className="text-white" />
                    </div>
                    <div className="hidden sm:block text-left">
                      <p className="text-sm font-medium text-slate-900 dark:text-slate-100">
                        {user?.username}
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        {wallet?.balance?.toFixed(2)} ETH
                      </p>
                    </div>
                  </button>

                  {showProfileMenu && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="absolute right-0 mt-2 w-64 glass-effect rounded-xl shadow-xl border border-white/20 dark:border-white/10 py-2 z-50"
                    >
                      <div className="px-4 py-3 border-b border-white/20 dark:border-white/10">
                        <p className="font-medium text-slate-900 dark:text-slate-100">
                          {user?.username}
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 font-mono">
                          {wallet?.address?.slice(0, 6)}...{wallet?.address?.slice(-4)}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm text-slate-500 dark:text-slate-400">Balance:</span>
                          <span className="font-medium text-slate-900 dark:text-slate-100">
                            {wallet?.balance?.toFixed(4)} ETH
                          </span>
                        </div>
                      </div>
                      
                      {/* Cashout Button in Profile Menu */}
                      <button 
                        onClick={() => {
                          setShowCashoutModal(true);
                          setShowProfileMenu(false);
                        }}
                        className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-white/20 dark:hover:bg-black/20 transition-colors text-green-600 dark:text-green-400"
                      >
                        <DollarSign size={16} />
                        <span>Cashout</span>
                      </button>
                      
                      <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-white/20 dark:hover:bg-black/20 transition-colors text-slate-700 dark:text-slate-300">
                        <User size={16} />
                        <span>Profile</span>
                      </button>
                      
                      <button className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-white/20 dark:hover:bg-black/20 transition-colors text-slate-700 dark:text-slate-300">
                        <Settings size={16} />
                        <span>Settings</span>
                      </button>
                      
                      <div className="border-t border-white/20 dark:border-white/10 mt-2 pt-2">
                        <button
                          onClick={disconnectWallet}
                          className="w-full flex items-center space-x-3 px-4 py-2 text-left hover:bg-white/20 dark:hover:bg-black/20 transition-colors text-red-600 dark:text-red-400"
                        >
                          <LogOut size={16} />
                          <span>Disconnect</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              ) : (
                <motion.button
                  onClick={handleConnectWallet}
                  className="btn-primary flex items-center space-x-2"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Wallet size={16} />
                  <span className="hidden sm:inline">Connect Wallet</span>
                </motion.button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Cashout Modal */}
      <CashoutModal 
        isOpen={showCashoutModal} 
        onClose={() => setShowCashoutModal(false)} 
      />
    </>
  );
};