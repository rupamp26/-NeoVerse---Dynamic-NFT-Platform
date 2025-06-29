import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { Layout } from './components/Layout/Layout';
import { Dashboard } from './pages/Dashboard';
import { Collection } from './pages/Collection';
import { EvolutionCenter } from './components/Evolution/EvolutionCenter';
import { CommunityHub } from './components/Community/CommunityHub';
import { AnalyticsDashboard } from './components/Analytics/AnalyticsDashboard';
import { MarketplaceHub } from './components/Marketplace/MarketplaceHub';
import { useTheme } from './hooks/useTheme';
import { useNFTStore } from './store/nftStore';
import { mockNFTs } from './data/mockData';

function App() {
  const { theme } = useTheme();
  const { setNFTs } = useNFTStore();

  useEffect(() => {
    // Initialize with mock data
    setNFTs(mockNFTs);
  }, [setNFTs]);

  return (
    <Router>
      <div className="App">
        <Layout>
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/collection" element={<Collection />} />
            <Route path="/evolution" element={<EvolutionCenter />} />
            <Route path="/community" element={<CommunityHub />} />
            <Route path="/analytics" element={<AnalyticsDashboard />} />
            <Route path="/marketplace" element={<MarketplaceHub />} />
            <Route path="/favorites" element={<div className="glass-card p-8 text-center"><h2 className="text-2xl font-bold mb-4">Favorites</h2><p>Your favorite NFTs and collections will appear here.</p></div>} />
            <Route path="/activity" element={<div className="glass-card p-8 text-center"><h2 className="text-2xl font-bold mb-4">Activity Feed</h2><p>Track all your NFT activities and transactions.</p></div>} />
            <Route path="/messages" element={<div className="glass-card p-8 text-center"><h2 className="text-2xl font-bold mb-4">Messages</h2><p>Communicate with other collectors and creators.</p></div>} />
            <Route path="/events" element={<div className="glass-card p-8 text-center"><h2 className="text-2xl font-bold mb-4">Events</h2><p>Discover upcoming NFT events and community gatherings.</p></div>} />
            <Route path="/settings" element={<div className="glass-card p-8 text-center"><h2 className="text-2xl font-bold mb-4">Settings</h2><p>Customize your experience and manage your account.</p></div>} />
            <Route path="/help" element={<div className="glass-card p-8 text-center"><h2 className="text-2xl font-bold mb-4">Help & Support</h2><p>Get help and learn how to use the platform effectively.</p></div>} />
            <Route path="*" element={<div className="glass-card p-8 text-center"><h2 className="text-2xl font-bold mb-4">Page Not Found</h2><p>The page you're looking for doesn't exist.</p></div>} />
          </Routes>
        </Layout>
        
        <Toaster
          position="top-right"
          toastOptions={{
            className: 'glass-effect text-slate-900 dark:text-slate-100',
            duration: 4000,
          }}
        />
      </div>
    </Router>
  );
}

export default App;