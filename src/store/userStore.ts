import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { User, WalletConnection, Notification } from '../types';

interface UserState {
  user: User | null;
  wallet: WalletConnection | null;
  notifications: Notification[];
  isAuthenticated: boolean;
  isConnecting: boolean;
  setUser: (user: User | null) => void;
  setWallet: (wallet: WalletConnection | null) => void;
  connectWallet: (provider: string) => Promise<void>;
  disconnectWallet: () => void;
  addNotification: (notification: Omit<Notification, 'id' | 'createdAt'>) => void;
  markNotificationRead: (id: string) => void;
  clearNotifications: () => void;
  updateUserPreferences: (preferences: Partial<User['preferences']>) => void;
}

export const useUserStore = create<UserState>()(
  persist(
    (set, get) => ({
      user: null,
      wallet: null,
      notifications: [],
      isAuthenticated: false,
      isConnecting: false,

      setUser: (user) => set({ 
        user, 
        isAuthenticated: !!user 
      }),

      setWallet: (wallet) => set({ wallet }),

      connectWallet: async (provider) => {
        set({ isConnecting: true });
        
        try {
          // Simulate wallet connection
          await new Promise(resolve => setTimeout(resolve, 1000));
          
          const mockWallet: WalletConnection = {
            address: '0x1234567890123456789012345678901234567890',
            balance: 1.5,
            chainId: 1,
            isConnected: true,
            provider: provider as any,
          };
          
          const mockUser: User = {
            id: '1',
            address: mockWallet.address,
            username: 'Web3Explorer',
            joinedAt: new Date(),
            preferences: {
              theme: 'auto',
              notifications: {
                evolution: true,
                community: true,
                marketplace: true,
                system: true,
              },
              privacy: {
                showProfile: true,
                showCollection: true,
                showActivity: true,
              },
              display: {
                gridSize: 'medium',
                sortBy: 'name',
                showDetails: true,
              },
            },
            stats: {
              totalNFTs: 0,
              totalEvolutions: 0,
              portfolioValue: 0,
              communityRank: 0,
              evolutionSuccessRate: 0,
              joinedCommunities: 0,
              createdRules: 0,
              helpfulVotes: 0,
            },
          };
          
          set({ 
            wallet: mockWallet, 
            user: mockUser, 
            isAuthenticated: true,
            isConnecting: false 
          });
          
        } catch (error) {
          console.error('Failed to connect wallet:', error);
          set({ isConnecting: false });
        }
      },

      disconnectWallet: () => set({ 
        wallet: null, 
        user: null, 
        isAuthenticated: false 
      }),

      addNotification: (notification) => set((state) => ({
        notifications: [
          {
            ...notification,
            id: Date.now().toString(),
            createdAt: new Date(),
          },
          ...state.notifications,
        ].slice(0, 50), // Keep only latest 50 notifications
      })),

      markNotificationRead: (id) => set((state) => ({
        notifications: state.notifications.map((notification) =>
          notification.id === id 
            ? { ...notification, isRead: true }
            : notification
        ),
      })),

      clearNotifications: () => set({ notifications: [] }),

      updateUserPreferences: (preferences) => set((state) => ({
        user: state.user ? {
          ...state.user,
          preferences: { ...state.user.preferences, ...preferences },
        } : null,
      })),
    }),
    {
      name: 'user-storage',
      partialize: (state) => ({ 
        user: state.user, 
        wallet: state.wallet,
        isAuthenticated: state.isAuthenticated 
      }),
    }
  )
);