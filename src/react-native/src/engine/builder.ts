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

/**
 * Evaluates a condition rule.
 *
 * Supported formats:
 * - boolean
 * - function: (ctx) => boolean
 * - platform string: 'ios' | 'android' | 'web'
 * - prop condition: 'variant:primary'
 * - prop existence: 'disabled'
 */
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

/**
 * Internal rule representation used by the styling system.
 *
 * There are three types of rules:
 * - style: defines styles
 * - when: conditional logic
 * - attrs: fixed props applied to the component
 */
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
  /**
   * List of rules applied to the component.
   * Each rule modifies style or props.
   */
  private rules: Rule<C, P>[] = [];

  /**
   * Cache of computed styles per theme.
   *
   * Purpose:
   * - avoid recalculating styles
   * - improve performance
   * - reduce unnecessary renders
   */
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
   * Adds a style rule.
   *
   * Can be:
   * - a static object
   * - a dynamic function using:
   *   - theme
   *   - props
   *   - platform
   *
   * @example
   * style({ padding: 16 })
   *
   * @example
   * style(({ theme }) => ({ backgroundColor: theme.color.primary }))
   */
  style(styleOrFn: StyleOrFn<C, P>): this {
    this.rules.push({ kind: 'style', style: styleOrFn });
    return this;
  }

  /**
   * Adds a conditional rule.
   *
   * The rule is only applied if the condition is true.
   *
   * Supported conditions:
   * - platform: 'ios' | 'android' | 'web'
   * - prop checks: 'variant:primary', 'disabled'
   * - custom function: (ctx) => boolean
   *
   * @example
   * when('ios', { shadowOpacity: 0.2 })
   *
   * @example
   * when('variant:primary', { backgroundColor: 'blue' })
   *
   * @example
   * when(({ props }) => props.size > 40, { opacity: 0.5 })
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
   * Adds fixed props to the component.
   *
   * These props are always applied,
   * regardless of theme, platform, or conditions.
   *
   * Useful for:
   * - accessibility
   * - testID
   * - roles
   * - static configuration
   */
  attrs(attrs: Partial<React.ComponentPropsWithRef<C> & P>): this {
    this.rules.push({ kind: 'attrs', attrs });
    return this;
  }

  /**
   * Creates a new builder based on the current one.
   *
   * Copies all existing rules and allows creating variations
   * without changing the original component.
   *
   * Mental model:
   * "clone + add new rules"
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

          const hash = optimizedHash(ctx);

          let cache = this.cacheByTheme.get(theme);
          if (!cache) {
            cache = new LRUCache(300);
            this.cacheByTheme.set(theme, cache);
          }

          const cached = cache.get(hash);
          if (cached) {
            return cached;
          }

          const styles: StyleObject<C>[] = [];
          const attrs: Partial<React.ComponentPropsWithRef<C> & P> = {};

          for (let i = 0; i < this.rules.length; i++) {
            const rule = this.rules[i];

            const currentCtx: StyleContext<P> = {
              theme,
              platform,
              props: { ...attrs, ...props } as P,
            };

            if (rule.kind === 'when') {
              if (evaluateCondition(rule.condition, currentCtx)) {
                const ruleAttrs =
                  typeof rule.attrs === 'function'
                    ? rule.attrs(currentCtx)
                    : rule.attrs;
                Object.assign(attrs, ruleAttrs || {});
              }
            }

            if (rule.kind === 'style') {
              styles.push(resolveStyle(rule.style, currentCtx));
            }

            if (rule.kind === 'attrs') {
              Object.assign(attrs, rule?.attrs || {});
            }
          }

          const result = {
            computedStyle: StyleSheet.flatten(styles as unknown[]),
            attrs,
          };

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

        const { style: propStyle, ...restProps } = props as any;

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