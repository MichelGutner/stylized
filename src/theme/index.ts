import { useSyncExternalStore } from 'react';
import { themeStore } from './store';

/**
 * Reactive hook for accessing the current theme in React components.
 *
 * This hook provides a reactive interface to the global theme store using
 * React's `useSyncExternalStore`, ensuring consistent updates across
 * concurrent renders and strict mode compatibility.
 *
 * Key features:
 * - **Automatic subscription**: Subscribes to theme changes on mount
 * - **Concurrent-safe**: Works correctly with React 18+ concurrent features
 * - **Strict mode compatible**: Handles double-rendering in strict mode
 * - **Provider-less**: No Theme Provider wrapper required
 * - **Global reactivity**: All components update when theme changes
 * - **Type safety**: Fully typed theme object access
 *
 * @returns The current theme object with full type safety
 *
 * @example Basic Usage
 * ```tsx
 * import { useTheme } from 'react-native-stylish';
 * 
 * const MyComponent = () => {
 *   const theme = useTheme();
 *   
 *   return (
 *     <View style={{ backgroundColor: theme.colors?.background }}>
 *       <Text style={{ color: theme.colors?.text }}>
 *         Hello, World!
 *       </Text>
 *     </View>
 *   );
 * };
 * ```
 * @performance
 * - Uses React's optimized useSyncExternalStore for minimal re-renders
 * - Only triggers re-render when theme actually changes
 * - No provider wrapper overhead
 * - Efficient subscription management
 *
 * @note
 * This hook automatically handles subscription cleanup on component unmount.
 * No manual cleanup is required.
 */
export const useTheme = () => {
  const theme = useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getSnapshot,
  ) as EngineTheme;

  return theme as EngineTheme;
};

export { setTheme, getTheme } from './store';
