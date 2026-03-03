import React from 'react';
import { forwardRef, useMemo } from 'react';
import { useTheme } from '../../../theme';
import { makeProxy } from '../../../core/proxy';
import { 
  Condition, 
  Rule 
} from '../../../core/types';
import { 
  StyleContext as WebStyleContext,
  StyleObject,
  StyleFn,
  EngineComponent as WebEngineComponent
} from './types';

// Rule types for web styling
export type WebRule<C extends React.ComponentType<any>, P extends object> = Rule<C, P, StyleObject | StyleFn<P>>;

// Evaluate condition for web
function evaluateCondition<P extends object>(
  condition: Condition<P>,
  ctx: WebStyleContext<P>,
): boolean {
  if (typeof condition === 'boolean') {
    return condition;
  }

  if (typeof condition === 'function') {
    return (condition as any)(ctx);
  }

  if (typeof condition === 'string') {
    // Platform conditions
    if (condition === 'web' || condition === 'browser') {
      return true;
    }
    
    // Prop conditions (prop:value)
    if (condition.includes(':')) {
      const [key, value] = condition.split(':');
      return (ctx.props as Record<string, unknown>)[key] === value;
    }
    
    // Boolean prop conditions
    if (condition in (ctx.props as object)) {
      return Boolean((ctx.props as Record<string, unknown>)[condition]);
    }
  }

  return false;
}

// Resolve style function or object
function resolveStyle<P>(
  style: StyleObject | StyleFn<P>,
  ctx: WebStyleContext<P>,
): StyleObject {
  if (typeof style === 'function') {
    return style(ctx);
  }
  return style;
}

/**
 * Builder class for creating styled React web components.
 * 
 * This class manages the accumulation of styling rules and provides
 * a fluent API for chaining style and attribute modifications.
 * 
 * @template C - Base component type
 * @template P - Component props type
 */
export class StylizedBuilder<
  C extends React.ComponentType<any>,
  P extends object = {},
> {
  private rules: WebRule<C, P>[] = [];

  constructor(
    private readonly BaseComponent: C,
    baseRules: WebRule<C, P>[] = [],
  ) {
    this.rules = [...baseRules];
  }

  /**
   * Apply styles to the component.
   * 
   * @param styleOrFn - Style object or function that returns styles
   * @returns Builder instance for chaining
   * 
   * @example
   * ```tsx
   * const StyledDiv = engine('div')
   *   .style({ backgroundColor: 'red', padding: '16px' })
   *   .style(({ theme }) => ({ color: theme.colors.text }));
   * ```
   */
  style(styleOrFn: StyleObject | StyleFn<P>): this {
    this.rules.push({ kind: 'style', style: styleOrFn });
    return this;
  }

  /**
   * Apply conditional attributes based on specified condition.
   * 
   * @param condition - Condition to evaluate
   * @param attrs - Attributes to apply when condition is true
   * @returns Builder instance for chaining
   * 
   * @example
   * ```tsx
   * const StyledButton = engine('button')
   *   .style({ padding: '8px 16px' })
   *   .when('disabled', { opacity: 0.5, cursor: 'not-allowed' })
   *   .when('variant:primary', { backgroundColor: '#007AFF' });
   * ```
   */
  when(
    condition: Condition<P>,
    attrs?: Partial<React.ComponentPropsWithRef<C>>,
  ): this {
    this.rules.push({ kind: 'when', condition, attrs });
    return this;
  }

  /**
   * Apply static attributes to the component.
   * 
   * @param attrs - Attributes to apply
   * @returns Builder instance for chaining
   * 
   * @example
   * ```tsx
   * const StyledInput = engine('input')
   *   .style({ padding: '8px' })
   *   .attrs({ type: 'text', placeholder: 'Enter text...' });
   * ```
   */
  attrs(attrs: Partial<React.ComponentPropsWithRef<C>>): this {
    this.rules.push({ kind: 'attrs', attrs });
    return this;
  }

  /**
   * Create a new builder instance with inherited rules.
   * 
   * @returns New builder instance with current rules
   * 
   * @example
   * ```tsx
   * const BaseButton = engine('button').style({ padding: '8px 16px' });
   * const PrimaryButton = BaseButton.extend()
   *   .style({ backgroundColor: '#007AFF' });
   * ```
   */
  extend(): StylizedBuilder<C, P> {
    return new StylizedBuilder<C, P>(this.BaseComponent, [...this.rules]);
  }

  /**
   * Build the final styled component.
   * 
   * @returns Enhanced React component with styling capabilities
   */
  build(): WebEngineComponent<C, P> {
    const Base = this.BaseComponent as React.ComponentType<any>;

    const StylizedComponent = forwardRef<unknown, React.ComponentProps<C> & P>(
      (props, ref) => {
        const theme = useTheme();
        const platform = 'web';

        const { computedStyle, attrs } = useMemo(() => {
          const ctx: WebStyleContext<P> = { theme, props: props as P, platform: 'web' };

          const styles: StyleObject[] = [];
          const attrs: Partial<React.ComponentPropsWithRef<C>> = {};

          for (let i = 0; i < this.rules.length; i++) {
            const rule = this.rules[i];

            if (rule.kind === 'when') {
              if (evaluateCondition(rule.condition, ctx)) {
                Object.assign(attrs, rule?.attrs || {});
              }
            }

            if (rule.kind === 'style') {
              styles.push(resolveStyle(rule.style, ctx));
            }

            if (rule.kind === 'attrs') {
              Object.assign(attrs, rule?.attrs || {});
            }
          }

          // Merge all styles
          const result = {
            computedStyle: styles.reduce((acc, style) => ({ ...acc, ...style }), {}),
            attrs,
          };

          return result;
        }, [theme, props, platform]);

        const { style: propStyle, ...restProps } = props as any;

        return React.createElement(Base, {
          ...attrs,
          ...restProps,
          ref,
          style: propStyle ? [computedStyle, propStyle] : computedStyle,
        });
      },
    );

    StylizedComponent.displayName = `Styled(${Base.displayName || Base.name || 'Component'})`;

    return StylizedComponent as WebEngineComponent<C, P>;
  }
}

/**
 * Create a stylized component with enhanced styling capabilities.
 * 
 * @param BaseComponent - Base React component to enhance
 * @returns Enhanced component with styling methods
 * 
 * @example
 * ```tsx
 * const StyledComponent = stylized(BaseComponent);
 * const EnhancedComponent = StyledComponent
 *   .style({ backgroundColor: 'red' })
 *   .when('disabled', { opacity: 0.5 });
 * ```
 */
export function stylized<
  C extends React.ComponentType<any>,
  P extends object = {},
>(BaseComponent: C): WebEngineComponent<C, P> {
  const builder = new StylizedBuilder<C, P>(BaseComponent);
  return makeProxy(builder.build(), builder);
}
