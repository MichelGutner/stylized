import * as RN from 'react-native';
import { useMemo, memo, forwardRef } from 'react';
import { useTheme } from '../theme';
import { Interpolation, RNComponentProps, BaseComponent, InferRef } from './types';

/**
 * Resolves a single interpolation entry.
 *
 * Interpolations can be:
 * - Static style objects
 * - Functions that receive runtime context
 *
 * The context includes:
 * - `theme` → global theme object
 * - `props` → component props
 *
 * @param item - Interpolation item
 * @param ctx - Resolution context (theme + props)
 * @returns Resolved style object
 */
function resolveInterpolation<P>(
  item: Interpolation<P>,
  ctx: { theme: EngineTheme } & P,
) {
  if (typeof item === 'function') {
    return item(ctx);
  }
  return item;
}

/**
 * Core enhancer that transforms a base React Native component
 * into a styled component powered by template literals.
 *
 * This function:
 * - Attaches dynamic style resolution
 * - Injects theme support
 * - Enables prop-based styling
 * - Preserves original component behavior
 * - Adds memoization for render optimization
 *
 * Architecture:
 * BaseComponent → Template Factory → Styled Component
 *
 * @param BaseComponent - React Native base component
 * @returns Styled component factory
 */
function enhanceWithStyles<Ref, PBase, PExtra = object>(
  BaseComponent: BaseComponent<PBase>,
) {
  return <P extends PExtra>(
    _: TemplateStringsArray,
    ...interpolations: Interpolation<P>[]
  ) => {
    const Component = forwardRef<Ref, PBase & P>((props, ref) => {
      const theme = useTheme();

      const resolvedStyles = useMemo(() => {
        if (!interpolations) return [];

        const ctx = { theme, ...(props as P) };

        return interpolations.reduce((acc, item) => {
          const style = resolveInterpolation(item, ctx);
          return [...acc, style].filter(Boolean);
        }, []);
      }, [theme, props]);
      
      const { style, ...restProps } = props as PBase & {
        style?: [];
      };

      return (
        <BaseComponent
          ref={ref}
          {...(restProps as PBase)}
          style={resolvedStyles ? [resolvedStyles, style] : style}
        />
      );
    });

    return memo(Component);
  };
}

export const createStyledComponent = <
  T,
  K extends keyof typeof RN = keyof typeof RN,
>(
  component: K,
) => {
  type Props = RNComponentProps<K> & T;
  type RefType = InferRef<(typeof RN)[K]>;

  const BaseComponent = RN[component] as React.ComponentType<Props>;

  return enhanceWithStyles<RefType, Props, T>(BaseComponent);
};
