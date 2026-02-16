import { useSyncExternalStore } from 'react';

let _theme: DefaultTheme = {};

const listeners = new Set<() => void>();

const deepMerge = <T>(base: T, partial: Partial<T>): T => {
  const result = { ...base }; // cloned from base to use as the starting point

  for (const key in partial) {
    if (
      partial[key] &&
      typeof partial[key] === 'object' &&
      !Array.isArray(partial[key])
    ) {
      result[key] = deepMerge(result[key], partial[key]);
    } else {
      result[key] = partial[key];
    }
  }
  return result;
};

const themeStore = {
  getSnapshot: () => _theme,

  subscribe: (listener: () => void) => {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
};

type ThemeUpdater<T> = T | ((_args: DefaultTheme) => T);

export const setTheme = <T extends Partial<DefaultTheme>>(
  input: ThemeUpdater<T>,
) => {
  const prev = _theme;
  const nextPartial =
    typeof input === 'function'
      ? (input as (_args: DefaultTheme) => T)(prev)
      : input;
  _theme = deepMerge(prev, nextPartial);
  listeners.forEach(listener => listener());

  return _theme as DefaultTheme;
};

export const useTheme = () => {
  return useSyncExternalStore(
    themeStore.subscribe,
    themeStore.getSnapshot,
    themeStore.getSnapshot,
  ) as DefaultTheme;
};

export const getTheme = () => {
  return _theme as DefaultTheme;
};
