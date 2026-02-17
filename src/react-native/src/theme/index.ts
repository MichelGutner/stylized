import { useSyncExternalStore } from 'react';
import { setTheme, themeStore } from './store';

/**
 * Reactive hook that returns the current theme.
 *
 * This hook provides a reactive interface to the global theme store using
 * React's `useSyncExternalStore`, ensuring consistent updates across concurrent
 * renders and strict mode.
 *
 * It automatically subscribes to theme changes and triggers re-renders in
 * all consuming components whenever the theme is updated.
 *
 * Designed to work without Context Providers, enabling:
 * - Global theming
 * - Provider-less architecture
 * - Cross-tree reactivity
 * - External store compatibility
 * - Concurrent-safe updates
 *
 * @returns The current theme object.
 */
export const useTheme = () => {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getSnapshot,
  ) as EngineTheme;

  return theme;
};

export { setTheme, getTheme } from './store';
