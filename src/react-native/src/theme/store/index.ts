import { deepMerge } from './helpers';

const defaultTheme: EngineTheme = {};

let _currentTheme: EngineTheme = defaultTheme;

const listeners = new Set<() => void>();

export const themeStore = {
  getSnapshot: () => _currentTheme,

  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

/**
 * Updates the global theme state.
 *
 * Accepts either a partial theme object or an updater function.
 * The provided values are **deeply merged** into the existing theme,
 * preserving all untouched properties.
 *
 * This API mirrors React's `setState` semantics:
 * - Object form → shallow intent, deep structural merge
 * - Function form → receives previous theme snapshot
 *
 * After updating the theme:
 * - The global store is updated
 * - All subscribers are notified
 * - All `useTheme()` consumers re-render
 *
 * @param input - A partial theme object or a function that receives the previous
 * theme and returns a partial theme update.
 *
 * @returns The fully resolved theme after the merge.
 *
 * @example
 * setTheme({ colors: { primary: '#000' } })
 *
 * @example
 * setTheme(prev => ({
 *   colors: { primary: prev.colors.primary === '#000' ? '#fff' : '#000' }
 * }))
 */
export const setTheme = <T extends Partial<EngineTheme>>(
  input: T | ((prev: EngineTheme) => T),
) => {
  const prev = _currentTheme;
  const nextPartial =
    typeof input === 'function'
      ? (input as (prev: EngineTheme) => T)(prev)
      : input;

  _currentTheme = deepMerge(prev, nextPartial);
  listeners.forEach(listener => listener());

  return _currentTheme as EngineTheme;
};

/**
 * Returns the current global theme snapshot.
 *
 * This is a non-reactive accessor and does not subscribe to updates.
 * Useful for:
 * - Imperative logic
 * - Non-React modules
 * - Services
 * - Utils
 * - One-off reads
 *
 * @returns The current theme object.
 */
export const getTheme = () => _currentTheme;
