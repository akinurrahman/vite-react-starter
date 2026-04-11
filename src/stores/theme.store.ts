import { useEffect } from 'react';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export type Theme = string;

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    set => ({
      theme: 'light',
      setTheme: theme => {
        set({ theme });
        applyTheme(theme);
      },
    }),
    { name: 'theme-storage' }
  )
);

const ALL_THEME_CLASSES = [
  'light',
  'dark',
  'forest',
  'forest-light',
  'crimson',
  'crimson-dark',
  'amber',
  'amber-dark',
  'obsidian',
  'obsidian-light',
  'violet-light',
  'violet-dark',
];

function applyTheme(theme: string) {
  const root = document.documentElement;
  root.classList.remove(...ALL_THEME_CLASSES);
  if (theme === 'system') {
    const isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.classList.add(isDark ? 'dark' : 'light');
  } else {
    root.classList.add(theme);
  }
}

export function useThemeInit() {
  const theme = useThemeStore(s => s.theme);
  useEffect(() => applyTheme(theme), [theme]);
}
