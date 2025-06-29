import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface ThemeState {
  theme: 'light' | 'dark' | 'auto';
  setTheme: (theme: 'light' | 'dark' | 'auto') => void;
  isDark: boolean;
}

export const useTheme = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: 'auto',
      isDark: false,
      setTheme: (theme) => {
        set({ theme });
        updateTheme(theme);
      },
    }),
    {
      name: 'theme-storage',
      onRehydrate: () => {
        updateTheme(get().theme);
      },
    }
  )
);

function updateTheme(theme: 'light' | 'dark' | 'auto') {
  const root = document.documentElement;
  
  if (theme === 'dark') {
    root.classList.add('dark');
    useTheme.setState({ isDark: true });
  } else if (theme === 'light') {
    root.classList.remove('dark');
    useTheme.setState({ isDark: false });
  } else {
    // Auto mode
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      root.classList.add('dark');
      useTheme.setState({ isDark: true });
    } else {
      root.classList.remove('dark');
      useTheme.setState({ isDark: false });
    }
  }
}

// Listen for system theme changes
if (typeof window !== 'undefined') {
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
    const currentTheme = useTheme.getState().theme;
    if (currentTheme === 'auto') {
      updateTheme('auto');
    }
  });
}