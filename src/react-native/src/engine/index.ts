import { RNComponentNames, RNComponentProps } from './types';
import { RNComponents } from './constants';
import { createStyledComponent } from './factory';

/**
 * Type map for all styled engine components.
 *
 * Automatically maps every React Native core component
 * into a styled template-based version.
 */
type EngineComponents = {
  [K in RNComponentNames]: ReturnType<
    typeof createStyledComponent<K, RNComponentProps<K>>
  >;
};

/**
 * Global styled engine registry.
 *
 * Provides styled versions of all core React Native components.
 *
 * Features:
 * - Template literal styling
 * - Theme-aware styles
 * - Prop-based dynamic styles
 * - Provider-less global theming
 * - Memoized rendering
 * - Type-safe component mapping
 * - Full RN API compatibility
 *
 * Example:
 * ```tsx
 * const Box = engine.View`
 *   ${({ theme }) => ({
 *     flex: 1,
 *     backgroundColor: theme.colors.background,
 *     padding: theme.spacing.md,
 *   })}
 * `;
 * ```
 */
export const engine = RNComponents.reduce((acc, component) => {
  acc[component] = createStyledComponent(component);
  return acc;
}, {} as EngineComponents);
