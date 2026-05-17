/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { EngineComponent, StyleFn, StyleObject } from '@/react-native/src/engine/types';
import { ComponentType } from 'react';
import React from 'react';

export type Rule<C extends React.ComponentType<unknown>, P, StyleProps> =
  | { kind: 'style'; style: StyleProps }
  | {
      kind: 'when';
      condition: Condition<P>;
      attrs: Partial<React.ComponentPropsWithRef<C>>;
    }
  | { kind: 'attrs'; attrs: Partial<React.ComponentPropsWithRef<C>> };

export type ExtractStyle<C extends ComponentType<any>> =
  React.ComponentPropsWithRef<C> extends { style?: infer S }
    ? Exclude<S, (...args: any[]) => any>
    : never;

export interface BaseStyleContext<P> {
  theme: EngineTheme;
  props: P;
  platform?: string;
}

export type Platform = 'ios' | 'android' | 'web';

export type PropConditionKeys<P> =
  P extends Record<string, any>
    ? {
        [K in keyof P]-?: NonNullable<P[K]> extends string | number | boolean
          ? NonNullable<P[K]> extends boolean
            ? `${string & K}` | `${string & K}:true` | `${string & K}:false`
            :
                | `${string & K}`
                | `${string & K}:${NonNullable<P[K]> extends string | number ? NonNullable<P[K]> : never}`
          : never;
      }[keyof P]
    : P;

export type ConditionString<P> = Platform | PropConditionKeys<P>;
export type ConditionFn<Ctx> = (ctx: Ctx) => boolean;

export type Condition<P, Ctx = BaseStyleContext<P>> =
  | ConditionString<P> // 'ios' | 'android' | 'web' | 'prop:value'
  | ConditionFn<Ctx> // (ctx) => boolean
  | boolean // true | false
  | (string & NonNullable<unknown>); // fallback string support

export interface BaseEngineComponent<
  C extends ComponentType<unknown>,
  P extends object = object,
> extends React.ForwardRefExoticComponent<React.ComponentPropsWithRef<C> & P> {
  /**
   * Applies attributes when a condition is true.
   *
   * Supported conditions:
   * - Platform: 'ios' | 'android' | 'web'
   * - Prop match: 'variant:primary'
   * - Boolean prop: 'disabled'
   * - Function: (ctx) => boolean
   * - Boolean: true | false
   *
   * TypeScript:
   * - Platform strings are autocompleted
   * - Prop keys are autocompleted
   * - Prop values are autocompleted when typed
   */
  when(
    condition: Condition<P, BaseStyleContext<P>>,
    attrs:
      | Partial<React.ComponentPropsWithRef<C> & P>
      | ((
          ctx: BaseStyleContext<P>,
        ) => Partial<React.ComponentPropsWithRef<C> & P>),
  ): BaseEngineComponent<C, P>;

  /**
   * Applies attributes unconditionally.
   */
  attrs: (
    attrs: Partial<React.ComponentPropsWithRef<C> & P>,
  ) => BaseEngineComponent<C, P>;

  /**
   * Applies a style function or style object.
   * @param s Style function with access to props and theme, or a plain style object.
   * @returns A new EngineComponent with the style applied.
   *
   * TypeScript:
   * - Style function receives correct props and theme types.
   * - Style object is type-checked against the component's style prop.
   */
  style(s: StyleFn<C, P>): EngineComponent<C, P>;

  /**
   * Applies a style object directly.
   * @param args Style object matching the component's style prop.
   * @returns A new EngineComponent with the style applied.
   *
   * TypeScript:
   * - Style object is type-checked against the component's style prop.
   */
  style(args: StyleObject<C>): EngineComponent<C, P>;
}
