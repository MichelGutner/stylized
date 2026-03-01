/* eslint-disable @typescript-eslint/no-explicit-any */
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
  
  // Condition parsed types
  export type ConditionString = string;
  export type ConditionFn<Ctx> = (ctx: Ctx) => boolean;
  export type Condition<P> = ConditionString | ConditionFn<P>;
  
  export interface BaseEngineComponent<
    C extends ComponentType<unknown>,
    P extends object = object,
  > extends React.ForwardRefExoticComponent<React.ComponentPropsWithRef<C> & P> {
    /**
     *
     * @param condition when conditional is `true` attrs attributes will be applied
     * @param attrs all component props
     * @returns the builder instance for chaining
     */
    when(
      condition: Condition<BaseStyleContext<P>>,
      attrs: Partial<React.ComponentPropsWithRef<C>>,
    ): BaseEngineComponent<C, P>;
    attrs: (
      attrs: Partial<React.ComponentPropsWithRef<C>>,
    ) => BaseEngineComponent<C, P>;
    extend(): BaseEngineComponent<C, P>;
  }
  