import React, { useState } from 'react';
import { Header } from './Header';
import { Sidebar } from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleMobileMenuClose = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen flex">
      {/* Sidebar */}
      <div className="hidden lg:block w-80 flex-shrink-0">
        <Sidebar isOpen={true} onClose={() => {}} />
      </div>
      
      {/* Mobile Sidebar */}
      <Sidebar isOpen={isMobileMenuOpen} onClose={handleMobileMenuClose} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header 
          onMobileMenuToggle={handleMobileMenuToggle}
          isMobileMenuOpen={isMobileMenuOpen}
        />
        
        <main className="flex-1 overflow-hidden">
          <div className="h-full p-4 sm:p-6 lg:p-8">
            <div className="max-w-7xl mx-auto h-full">
              {children}
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};