/* eslint-disable @typescript-eslint/no-explicit-any */
import { LRUCache } from '../../../cache/lru';
import { Condition } from '../../../core/types';
import { optimizedHash } from '../../../hash/optimizedHash';
import React, { forwardRef, useMemo } from 'react';
import { Platform, StyleSheet } from 'react-native';
import { useTheme } from '../../../theme';
import {
  StyleContext,
  StyleOrFn,
  StyleObject,
  StyleFn,
  EngineComponent,
} from './types';

/**
 * Evaluates conditional styling rules based on context.
 * 
 * Conditions can be:
 * - Platform strings: 'ios', 'android', 'web'
 * - Prop key-value pairs: 'variant:primary'
 * - Boolean prop existence: 'disabled'
 * - Custom functions: (ctx) => boolean
 * 
 * @template P - Component props type
 * @param condition - The condition to evaluate
 * @param ctx - Style context containing theme, props, and platform
 * @returns Whether the condition is met
 * 
 * @example
 * ```tsx
 * // Platform conditions
 * evaluateCondition('ios', ctx); // true on iOS
 * evaluateCondition('android', ctx); // true on Android
 * 
 * // Prop conditions
 * evaluateCondition('variant:primary', ctx); // true if props.variant === 'primary'
 * evaluateCondition('disabled', ctx); // true if props.disabled is truthy
 * 
 * // Custom function conditions
 * evaluateCondition((ctx) => ctx.props.size > 100, ctx); // true if size > 100
 * ```
 */
function evaluateCondition<P extends object>(
  condition: Condition<StyleContext<P>>,
  ctx: StyleContext<P>,
): boolean {
  if (typeof condition === 'function') {
    return condition(ctx);
  }

  const { props, platform } = ctx;

  if (condition === 'ios' || condition === 'android' || condition === 'web') {
    return platform === condition;
  }

  if (condition.includes(':')) {
    const [key, value] = condition.split(':');
    return (props as Record<string, unknown>)[key] === value;
  }

  return !!(props as Record<string, unknown>)[condition];
}

/**
 * Resolves style objects or functions to concrete style objects.
 * 
 * This function handles both static style objects and dynamic style functions,
 * providing a unified interface for style resolution.
 * 
 * @template C - Component type
 * @template P - Component props type
 * @param style - Style object or function to resolve
 * @param ctx - Style context containing theme, props, and platform
 * @returns Resolved style object
 * 
 * @example
 * ```tsx
 * // Static style object
 * const staticStyle = { backgroundColor: 'white', padding: 16 };
 * resolveStyle(staticStyle, ctx); // Returns the same object
 * 
 * // Dynamic style function
 * const dynamicStyle = ({ theme, props }) => ({
 *   backgroundColor: props.variant === 'primary' ? theme.colors.primary : theme.colors.secondary,
 *   padding: theme.spacing.md,
 * });
 * resolveStyle(dynamicStyle, ctx); // Returns computed style object
 * ```
 */
function resolveStyle<C extends React.ComponentType<any>, P>(
  style: StyleOrFn<C, P>,
  ctx: StyleContext<P>,
): StyleObject<C> {
  return typeof style === 'function' ? (style as StyleFn<C, P>)(ctx) : style;
}

/**
 * Represents a styling rule in the builder pattern.
 * 
 * Rules can be:
 * - Style rules: Apply static or dynamic styles
 * - Conditional rules: Apply styles/attrs when conditions are met
 * - Attribute rules: Apply component attributes
 * 
 * @template C - Component type
 * @template P - Component props type
 * 
 * @example
 * ```tsx
 * // Style rule
 * { kind: 'style', style: { backgroundColor: 'white' } }
 * 
 * // Conditional rule
 * { 
 *   kind: 'when', 
 *   condition: 'variant:primary',
 *   attrs: { backgroundColor: 'blue' }
 * }
 * 
 * // Attribute rule
 * { kind: 'attrs', attrs: { accessible: true, accessibilityLabel: 'Button' } }
 * ```
 */
type Rule<C extends React.ComponentType<any>, P> =
  | { kind: 'style'; style: StyleOrFn<C, P> }
  | {
      kind: 'when';
      condition: Condition<StyleContext<P>>;
      attrs: Partial<React.ComponentPropsWithRef<C>>;
    }
  | { kind: 'attrs'; attrs: Partial<React.ComponentPropsWithRef<C>> };

/**
 * Builder class for creating styled React Native components.
 * 
 * This class implements the builder pattern for styling components with:
 * - Fluent API for chaining style rules
 * - Conditional styling based on props and platform
 * - Attribute injection for component props
 * - Performance optimization with caching
 * - Type safety throughout the building process
 * 
 * @template C - Component type to style
 * @template P - Additional props type for the styled component
 * 
 * @example Basic Usage
 * ```tsx
 * const builder = new StylizedBuilder(RN.View);
 * 
 * const StyledView = builder
 *   .style({ backgroundColor: 'white', padding: 16 })
 *   .attrs({ testID: 'styled-view' })
 *   .build();
 * ```
 * 
 * @example Conditional Styling
 * ```tsx
 * const ConditionalButton = new StylizedBuilder(RN.TouchableOpacity)
 *   .style({
 *     padding: 16,
 *     borderRadius: 8,
 *     backgroundColor: '#ccc',
 *   })
 *   .when('variant:primary', {
 *     backgroundColor: '#007AFF',
 *   })
 *   .when('disabled', {
 *     opacity: 0.5,
 *   })
 *   .when('ios', {
 *     shadowColor: '#000',
 *     shadowOffset: { width: 0, height: 2 },
 *     shadowOpacity: 0.1,
 *     shadowRadius: 4,
 *   })
 *   .build();
 * ```
 * 
 * @example Dynamic Styling with Theme
 * ```tsx
 * const ThemedCard = new StylizedBuilder(RN.View)
 *   .style(({ theme }) => ({
 *     backgroundColor: theme.colors.surface,
 *     borderRadius: theme.borderRadius.md,
 *     padding: theme.spacing.md,
 *     shadowColor: theme.colors.shadow,
 *     shadowOffset: { width: 0, height: 2 },
 *     shadowOpacity: 0.1,
 *     shadowRadius: 4,
 *   }))
 *   .when('elevated', ({ theme }) => ({
 *     shadowOpacity: 0.2,
 *     shadowRadius: 8,
 *     elevation: 4,
 *   }))
 *   .build();
 * ```
 */
export class StylizedBuilder<
  C extends React.ComponentType<unknown>,
  P extends object,
> {
  /** Array of styling rules to apply */
  private rules: Rule<C, P>[] = [];
  
  /** Cache for computed styles per theme for performance optimization */
  private cacheByTheme = new WeakMap<
    any,
    LRUCache<string, { computedStyle: any; attrs: any }>
  >();

  /**
   * Creates a new builder instance.
   * 
   * @param BaseComponent - The React Native component to style
   * @param baseRules - Optional base rules to inherit from parent builder
   * 
   * @example
   * ```tsx
   * const baseBuilder = new StylizedBuilder(RN.View);
   * const extendedBuilder = new StylizedBuilder(RN.View, baseBuilder.rules);
   * ```
   */
  constructor(
    private readonly BaseComponent: C,
    baseRules: Rule<C, P>[] = [],
  ) {
    this.rules = [...baseRules];
  }

  /**
   * Adds a style rule to the builder.
   * 
   * Style rules can be static objects or dynamic functions that receive
   * the style context (theme, props, platform) and return style objects.
   * 
   * @param styleOrFn - Style object or function to apply
   * @returns The builder instance for chaining
   * 
   * @example Static Style
   * ```tsx
   * builder.style({
   *   backgroundColor: 'white',
   *   padding: 16,
   *   borderRadius: 8,
   * });
   * ```
   * 
   * @example Dynamic Style
   * ```tsx
   * builder.style(({ theme, props }) => ({
   *   backgroundColor: props.variant === 'primary' ? theme.colors.primary : theme.colors.secondary,
   *   padding: theme.spacing.md,
   *   borderRadius: theme.borderRadius.md,
   * }));
   * ```
   */
  style(styleOrFn: StyleOrFn<C, P>): this {
    this.rules.push({ kind: 'style', style: styleOrFn });
    return this;
  }

  /**
   * Adds a conditional rule to the builder.
   * 
   * Conditional rules apply attributes only when the specified condition is met.
   * Conditions can be platform strings, prop expressions, or custom functions.
   * 
   * @param condition - Condition to evaluate
   * @param attrs - Attributes to apply when condition is met
   * @returns The builder instance for chaining
   * 
   * @example Platform Conditions
   * ```tsx
   * builder
   *   .when('ios', { shadowColor: '#000', shadowOpacity: 0.1 })
   *   .when('android', { elevation: 4 });
   * ```
   * 
   * @example Prop Conditions
   * ```tsx
   * builder
   *   .when('variant:primary', { backgroundColor: '#007AFF' })
   *   .when('variant:secondary', { backgroundColor: '#5856D6' })
   *   .when('disabled', { opacity: 0.5 });
   * ```
   * 
   * @example Custom Function Conditions
   * ```tsx
   * builder.when(
   *   ({ props }) => props.size > 100,
   *   { fontSize: 20, fontWeight: 'bold' }
   * );
   * ```
   */
  when(
    condition: Condition<StyleContext<P>>,
    attrs?: Partial<React.ComponentPropsWithRef<C>>,
  ): this {
    this.rules.push({ kind: 'when', condition, attrs });
    return this;
  }

  /**
   * Adds attribute rules to the builder.
   * 
   * Attribute rules apply component props unconditionally.
   * Useful for setting accessibility, test IDs, and other component properties.
   * 
   * @param attrs - Attributes to apply to the component
   * @returns The builder instance for chaining
   * 
   * @example
   * ```tsx
   * builder
   *   .attrs({
   *     accessible: true,
   *     accessibilityLabel: 'Submit button',
   *     accessibilityRole: 'button',
   *     testID: 'submit-button',
   *   });
   * ```
   */
  attrs(attrs: Partial<React.ComponentPropsWithRef<C>>): this {
    this.rules.push({ kind: 'attrs', attrs });
    return this;
  }

  /**
   * Creates a new builder instance that extends the current builder.
   * 
   * The new builder inherits all rules from the current builder,
   * allowing you to create variations without modifying the original.
   * 
   * @returns A new builder instance with inherited rules
   * 
   * @example
   * ```tsx
   * const BaseButton = new StylizedBuilder(RN.TouchableOpacity)
   *   .style({
   *     padding: 16,
   *     borderRadius: 8,
   *   });
   * 
   * const PrimaryButton = BaseButton.extend()
   *   .style({ backgroundColor: '#007AFF' });
   * 
   * const SecondaryButton = BaseButton.extend()
   *   .style({ backgroundColor: '#5856D6' });
   * ```
   */
  extend(): StylizedBuilder<C, P> {
    return new StylizedBuilder<C, P>(this.BaseComponent, [...this.rules]);
  }

  /**
   * Builds the final styled React Native component.
   * 
   * This method creates a React component that:
   * - Applies all style rules in order
   * - Evaluates conditional rules based on context
   * - Merges attributes from conditional and attribute rules
   * - Caches computed styles for performance
   * - Preserves ref forwarding
   * 
   * @returns A styled React Native component
   * 
   * @example
   * ```tsx
   * const StyledButton = new StylizedBuilder(RN.TouchableOpacity)
   *   .style({ backgroundColor: '#007AFF' })
   *   .attrs({ accessible: true })
   *   .when('disabled', { opacity: 0.5 })
   *   .build();
   * 
   * // Use like any other React Native component
   * <StyledButton onPress={handlePress} disabled={isDisabled}>
   *   <Text>Press Me</Text>
   * </StyledButton>
   * ```
   * 
   * @performance
   * The built component includes several performance optimizations:
   * - LRU caching of computed styles per theme
   * - Memoization of style resolution
   * - Efficient hash-based cache keys
   * - WeakMap for automatic garbage collection
   */
  build(): EngineComponent<C, P> {
    const Base = this.BaseComponent as React.ComponentType<unknown>;

    /**
     * The actual styled React component.
     * 
     * This component handles:
     * - Theme integration via useTheme hook
     * - Platform detection
     * - Style rule processing and caching
     * - Ref forwarding
     * - Attribute merging
     */
    const StylizedComponent = forwardRef<unknown, React.ComponentProps<C> & P>(
      (props, ref) => {
        // Get current theme and platform
        const theme = useTheme();
        const platform = Platform.OS;

        /**
         * Memoized computation of styles and attributes.
         * 
         * This hook:
         * - Creates the style context with theme, props, and platform
         * - Generates a hash for cache key generation
         * - Checks cache for previously computed results
         * - Processes all rules to compute final styles and attributes
         * - Caches results for future renders
         */
        const { computedStyle, attrs } = useMemo(() => {
          // Create style context for rule evaluation
          const ctx: StyleContext<P> = { theme, props: props as P, platform };

          // Generate hash for caching
          const hash = optimizedHash(ctx);

          // Get or create cache for current theme
          let cache = this.cacheByTheme.get(theme);
          if (!cache) {
            cache = new LRUCache(300);
            this.cacheByTheme.set(theme, cache);
          }

          // Check cache for computed result
          const cached = cache.get(hash);
          if (cached) {
            return cached;
          }

          // Process all rules
          const styles: StyleObject<C>[] = [];
          const attrs: Partial<React.ComponentPropsWithRef<C>> = {};

          for (let i = 0; i < this.rules.length; i++) {
            const rule = this.rules[i];

            // Handle conditional rules
            if (rule.kind === 'when') {
              if (evaluateCondition(rule.condition, ctx)) {
                Object.assign(attrs, rule?.attrs || {});
              }
            }

            // Handle style rules
            if (rule.kind === 'style') {
              styles.push(resolveStyle(rule.style, ctx));
            }

            // Handle attribute rules
            if (rule.kind === 'attrs') {
              Object.assign(attrs, rule?.attrs || {});
            }
          }

          // Create result with flattened styles
          const result = {
            computedStyle: StyleSheet.flatten(styles as unknown[]),
            attrs,
          };

          // Cache the result
          cache.set(hash, result);

          return result;
        }, [theme, props, platform]);

        /**
         * Resolves the correct ref to use.
         * 
         * This allows conditional rules to override the ref,
         * enabling advanced ref management scenarios.
         */
        const resolvedRef = useMemo(() => {
          for (const rule of this.rules) {
            if (rule.kind === 'when') {
              if ((rule.attrs as any)?.ref) {
                return (rule.attrs as any).ref;
              }
            }
          }
          return ref;
        }, [theme, props, platform, ref]);

        // Separate style prop from other props
        const { style: propStyle, ...restProps } = props as any;

        // Render the component with merged styles and attributes
        return React.createElement(Base, {
          ...attrs,
          ...restProps,
          ref: resolvedRef,
          style: propStyle ? [computedStyle, propStyle] : computedStyle,
        });
      },
    );

    return StylizedComponent as EngineComponent<C, P>;
  }
}

/**
 * Creates a styled component from a React Native component.
 * 
 * This is the main entry point for creating styled components.
 * It returns a new StylizedBuilder instance that can be used
 * to chain style rules and build the final component.
 * 
 * @param component - The React Native component to style
 * @returns A new builder instance for the component
 * 
 * @example
 * ```tsx
 * import { stylized } from './engine';
 * import { View, TouchableOpacity } from 'react-native';
 * 
 * // Create styled components
 * const StyledView = stylized(View);
 * const StyledButton = stylized(TouchableOpacity);
 * 
 * // Use the builder pattern
 * const Card = StyledView
 *   .style({ backgroundColor: 'white', borderRadius: 8 })
 *   .when('elevated', { shadowOpacity: 0.2 })
 *   .build();
 * ```
 */
export function stylized<C extends React.ComponentType<unknown>>(
  component: C,
): StylizedBuilder<C, {}> {
  return new StylizedBuilder<C, {}>(component);
}
