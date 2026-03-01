/* eslint-disable @typescript-eslint/no-empty-object-type */
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

function evaluateCondition<P extends object>(
  condition: Condition<P, StyleContext<P>>,
  ctx: StyleContext<P>,
): boolean {
  if (typeof condition === 'boolean') {
    return condition;
  }

  if (typeof condition === 'function') {
    return condition(ctx);
  }

  const { props, platform } = ctx;

  if (condition === 'ios' || condition === 'android' || condition === 'web') {
    return platform === condition;
  }

  if (typeof condition === 'string' && condition.includes(':')) {
    const [key, value] = condition.split(':');
    return (props as Record<string, unknown>)[key] === value;
  }

  return !!(props as Record<string, unknown>)[condition as string];
}

function resolveStyle<C extends React.ComponentType<any>, P>(
  style: StyleOrFn<C, P>,
  ctx: StyleContext<P>,
): StyleObject<C> {
  return typeof style === 'function' ? (style as StyleFn<C, P>)(ctx) : style;
}

type Rule<C extends React.ComponentType<any>, P> =
  | { kind: 'style'; style: StyleOrFn<C, P> }
  | {
      kind: 'when';
      condition: Condition<P, StyleContext<P>>;
      attrs?:
        | Partial<React.ComponentPropsWithRef<C> & P>
        | ((ctx: StyleContext<P>) => Partial<React.ComponentPropsWithRef<C> & P>);
    }
  | { kind: 'attrs'; attrs: Partial<React.ComponentPropsWithRef<C> & P> };

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
    condition: Condition<P, StyleContext<P>>,
    attrs?:
      | Partial<React.ComponentPropsWithRef<C> & P>
      | ((ctx: StyleContext<P>) => Partial<React.ComponentPropsWithRef<C> & P>),
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
  attrs(attrs: Partial<React.ComponentPropsWithRef<C> & P>): this {
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

  build(): EngineComponent<C, P> {
    const Base = this.BaseComponent as React.ComponentType<unknown>;

    const StylizedComponent = forwardRef<unknown, React.ComponentProps<C> & P>(
      (props, ref) => {
        const theme = useTheme();
        const platform = Platform.OS;

        const { computedStyle, attrs } = useMemo(() => {
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
          const attrs: Partial<React.ComponentPropsWithRef<C> & P> = {};

          for (let i = 0; i < this.rules.length; i++) {
            const rule = this.rules[i];

            const currentCtx: StyleContext<P> = {
              theme,
              platform,
              props: { ...attrs, ...props } as P,
            };

            // Handle conditional rules
            if (rule.kind === 'when') {
              if (evaluateCondition(rule.condition, currentCtx)) {
                const ruleAttrs = typeof rule.attrs === 'function' ? rule.attrs(currentCtx) : rule.attrs;
                Object.assign(attrs, ruleAttrs || {});
              }
            }

            // Handle style rules
            if (rule.kind === 'style') {
              styles.push(resolveStyle(rule.style, currentCtx));
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

export function stylized<C extends React.ComponentType<unknown>>(
  component: C,
): StylizedBuilder<C, {}> {
  return new StylizedBuilder<C, {}>(component);
}
