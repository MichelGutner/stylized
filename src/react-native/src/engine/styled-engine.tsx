import * as RN from 'react-native';
import { useMemo, memo, forwardRef } from 'react';
import { useTheme } from '../theme';
import {
  Interpolation,
  ReactNativeComponentProperties,
  BaseComponent,
  InferRef,
  ComponentStyleMap,
  GetComponentStyle,
} from './types';

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
function resolveInterpolation<P, AdditionalProps, StyleType>(
  item: Interpolation<P, AdditionalProps, StyleType>,
  ctx: { theme: EngineTheme } & P & AdditionalProps,
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
function enhanceWithStyles<
  Ref,
  BaseProps,
  StyleOverrides = object,
  AdditionalProps = object,
  StyleType = unknown,
>(BaseComponent: BaseComponent<BaseProps>) {
  return (
    _: TemplateStringsArray,
    ...interpolations: Interpolation<
      StyleOverrides,
      AdditionalProps,
      StyleType
    >[]
  ) => {
    const Component = forwardRef<Ref, BaseProps & StyleOverrides>(
      (props, ref) => {
        const theme = useTheme();

        const resolvedStyles = useMemo(() => {
          if (!interpolations) return [];

          const ctx = { theme, ...(props as StyleOverrides & AdditionalProps) };

          return interpolations.reduce((acc, item) => {
            const style = resolveInterpolation(item, ctx);
            return [...acc, style].filter(Boolean);
          }, []);
        }, [theme, props]);

        const { style, ...restProps } = props as BaseProps & {
          style?: [];
        };

        return (
          <BaseComponent
            ref={ref}
            {...(restProps as BaseProps)}
            style={resolvedStyles ? [resolvedStyles, style] : style}
          />
        );
      },
    );

    return memo(Component);
  };
}

export const createStyledComponent = <
  AdditionalProps,
  K extends keyof ComponentStyleMap = keyof ComponentStyleMap,
>(
  component: K,
) => {
  type ComponentStyleType = GetComponentStyle<K>;
  type StyledEngineProps = ReactNativeComponentProperties<K> &
    AdditionalProps & { style?: ComponentStyleType };
  type RefType = InferRef<(typeof RN)[K]>;

  type StyleProps = Pick<StyledEngineProps, 'style'>;

  const BaseComponent = RN[component] as React.ComponentType<StyledEngineProps>;

  return enhanceWithStyles<
    RefType,
    StyledEngineProps,
    StyleProps,
    AdditionalProps,
    ComponentStyleType
  >(BaseComponent);
};
