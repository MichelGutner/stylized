/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import React, { useMemo, forwardRef } from 'react';
import { StyleSheet, Platform } from 'react-native';
import { useTheme } from '../theme';
import { optimizedHash } from '../../../hash/optimizedHash';
import { LRUCache } from '../../../cache/lru';
import {
  StyleObject,
  StyleFn,
  StyleOrFn,
  StyleContext,
  Condition,
  EngineComponent,
} from './types';

function evaluateCondition<P extends object>(
  condition: Condition<P>,
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

function resolveStyle<C extends React.ComponentType<any>, P>(
  style: StyleOrFn<C, P>,
  ctx: StyleContext<P>,
): StyleObject<C> {
  return typeof style === 'function' ? (style as StyleFn<C, P>)(ctx) : style;
}

function resolveAttrs<C extends React.ComponentType<any>, P>(
  attrs: Partial<React.ComponentPropsWithRef<C>>,
  ctx: StyleContext<P>,
): Partial<React.ComponentPropsWithRef<C>> {
  return attrs;
}

type Rule<C extends React.ComponentType<any>, P> =
  | { kind: 'style'; style: StyleOrFn<C, P> }
  | {
      kind: 'when';
      condition: Condition<P>;
      attrs: Partial<React.ComponentPropsWithRef<C>>;
    }
  | { kind: 'attrs'; attrs: Partial<React.ComponentPropsWithRef<C>> };

export class StylizedBuilder<
  C extends React.ComponentType<unknown>,
  P extends object,
> {
  private rules: Rule<C, P>[] = [];
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

  style(styleOrFn: StyleOrFn<C, P>): this {
    this.rules.push({ kind: 'style', style: styleOrFn });
    return this;
  }

  when(
    condition: Condition<P>,
    attrs?: Partial<React.ComponentPropsWithRef<C>>,
  ): this {
    this.rules.push({ kind: 'when', condition, attrs });
    return this;
  }
  
  attrs(attrs: Partial<React.ComponentPropsWithRef<C>>): this {
    this.rules.push({ kind: 'attrs', attrs });
    return this;
  }

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
          const attrs: Partial<React.ComponentPropsWithRef<C>> = {};

          for (let i = 0; i < this.rules.length; i++) {
            const rule = this.rules[i];

            if (rule.kind === 'when') {
              if (evaluateCondition(rule.condition, ctx)) {
                Object.assign(attrs, resolveAttrs(rule.attrs ?? {}, ctx));
              }
            }

            if (rule.kind === 'style') {
              styles.push(resolveStyle(rule.style, ctx));
            }

            if (rule.kind === 'attrs') {
              Object.assign(attrs, resolveAttrs(rule.attrs ?? {}, ctx));
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

function makeProxy<C extends React.ComponentType<unknown>, P extends object>(
  builder: StylizedBuilder<C, P>,
): EngineComponent<C, P> {
  const component = builder.build();

  const proxy = new Proxy(component, {
    get(target, prop) {
      if (prop in builder) {
        const original = builder[prop];
        if (typeof original === 'function') {
          return (...args: unknown[]) => {
            const result = original.apply(builder, args);
            if (result instanceof StylizedBuilder) {
              return makeProxy(result);
            }
            return makeProxy(builder);
          };
        }
      }
      return target[prop];
    },
  });

  return proxy;
}

export function stylized<
  C extends React.ComponentType<unknown>,
  P extends object = {},
>(BaseComponent: C): EngineComponent<C, P> {
  const builder = new StylizedBuilder<C, P>(BaseComponent);
  return makeProxy(builder);
}
