import React from 'react';
import { motion } from 'framer-motion';
import { 
  Home,
  Grid3X3,
  Zap,
  Users,
  BarChart3,
  ShoppingBag,
  Settings,
  HelpCircle,
  Star,
  TrendingUp,
  MessageSquare,
  Calendar
} from 'lucide-react';
import { useLocation, Link } from 'react-router-dom';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigationItems = [
  { 
    name: 'Dashboard', 
    href: '/', 
    icon: Home, 
    description: 'Overview & stats' 
  },
  { 
    name: 'My Collection', 
    href: '/collection', 
    icon: Grid3X3, 
    description: 'Your NFTs' 
  },
  { 
    name: 'Evolution Center', 
    href: '/evolution', 
    icon: Zap, 
    description: 'Manage evolutions' 
  },
  { 
    name: 'Community', 
    href: '/community', 
    icon: Users, 
    description: 'Connect & share' 
  },
  { 
    name: 'Analytics', 
    href: '/analytics', 
    icon: BarChart3, 
    description: 'Insights & trends' 
  },
  { 
    name: 'Marketplace', 
    href: '/marketplace', 
    icon: ShoppingBag, 
    description: 'Buy & sell' 
  },
];

const secondaryItems = [
  { name: 'Favorites', href: '/favorites', icon: Star },
  { name: 'Activity', href: '/activity', icon: TrendingUp },
  { name: 'Messages', href: '/messages', icon: MessageSquare },
  { name: 'Events', href: '/events', icon: Calendar },
];

const bottomItems = [
  { name: 'Settings', href: '/settings', icon: Settings },
  { name: 'Help & Support', href: '/help', icon: HelpCircle },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const location = useLocation();

  const isActive = (href: string) => {
    if (href === '/') {
      return location.pathname === '/';
    }
    return location.pathname.startsWith(href);
  };

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <motion.aside
        initial={{ x: -300 }}
        animate={{ x: isOpen ? 0 : -300 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className="fixed left-0 top-0 h-full w-80 glass-effect border-r border-white/20 dark:border-white/10 z-50 lg:relative lg:translate-x-0 lg:z-auto"
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-6 border-b border-white/20 dark:border-white/10">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <div>
                <h1 className="text-xl font-display font-bold gradient-text">
                  NeoVerse
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Dynamic NFT Platform
                </p>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="flex-1 overflow-y-auto py-6">
            {/* Main Navigation */}
            <nav className="px-4 space-y-2">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                Main
              </div>
              {navigationItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={`sidebar-nav group ${active ? 'active' : ''}`}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="font-medium">{item.name}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              })}
            </nav>

            {/* Secondary Navigation */}
            <nav className="px-4 space-y-2 mt-8">
              <div className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-4">
                Quick Access
              </div>
              {secondaryItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={`sidebar-nav group ${active ? 'active' : ''}`}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Bottom Navigation */}
          <div className="border-t border-white/20 dark:border-white/10 p-4">
            <nav className="space-y-2">
              {bottomItems.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href);
                
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={onClose}
                    className={`sidebar-nav group ${active ? 'active' : ''}`}
                  >
                    <Icon size={20} className="flex-shrink-0" />
                    <span className="font-medium">{item.name}</span>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
      </motion.aside>
    </>
  );
};