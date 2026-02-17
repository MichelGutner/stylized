import * as RN from 'react-native';
import { useMemo, memo } from "react";
import { useTheme } from "../theme";
import { StyleObject, Interpolation, RNComponentProps, BaseComponent } from "./types";

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
): StyleObject {
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
function enhanceWithStyles<PBase, PExtra = object>(
  BaseComponent: BaseComponent<PBase>,
) {
  return <P extends PExtra>(
    _: TemplateStringsArray,
    ...interpolations: Interpolation<P>[]
  ) => {
    const Component: React.FC<PBase & P> = props => {
      const theme = useTheme();

      const resolvedStyles = useMemo<StyleObject[]>(() => {
        if (!interpolations) return [];

        const ctx = { theme, ...(props as P) };

        return interpolations.reduce<StyleObject[]>((acc, item) => {
          const style = resolveInterpolation(item, ctx);
          return [...acc, style].filter(Boolean);
        }, []);
      }, [theme, props]);

      /**
       * Extracts the original `style` prop to preserve
       * React Native's native styling API compatibility.
       */
      const { style, ...restProps } = props as PBase & {
        style?: StyleObject;
      };

      return (
        <BaseComponent
          {...(restProps as PBase)}
          style={resolvedStyles ? [resolvedStyles, style] : style}
        />
      );
    };

    /**
     * Memoization ensures:
     * - Referential stability
     * - Reduced re-renders
     * - Performance consistency in large trees
     */
    return memo(Component);
  };
}

/**
 * Factory that creates a styled version of a React Native core component.
 *
 * Example:
 * `createStyledComponent('View')` → styled View factory
 *
 * @param component - React Native component key
 * @returns Styled component factory
 */
export const createStyledComponent = <K extends keyof typeof RN, T = object>(
  component: K,
) => {
  type Props = RNComponentProps<K>;

  const BaseComponent = RN[component] as React.ComponentType<
    Props & { style?: StyleObject }
  >;

  return enhanceWithStyles<Props, T>(BaseComponent);
};
