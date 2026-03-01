/* eslint-disable @typescript-eslint/no-explicit-any */

import * as RN from 'react-native';
import { ComponentType } from 'react';
import React from 'react';

export type ExtractStyle<C extends ComponentType<any>> =
  React.ComponentPropsWithRef<C> extends { style?: infer S }
    ? Exclude<S, (...args: any[]) => any>
    : never;

export type ComponentStyle<C extends ComponentType<any>> =
  C extends typeof RN.Text
    ? RN.StyleProp<RN.TextStyle>
    : RN.StyleProp<ExtractStyle<C>>;

export type StyleObject<C extends ComponentType<unknown>> = ComponentStyle<C>;

export interface StyleContext<P> {
  theme: EngineTheme;
  props: P;
  platform: RN.PlatformOSType;
}

export type StyleFn<C extends ComponentType<any>, P> = (
  ctx: StyleContext<P>,
) => StyleObject<C>;
export type StyleOrFn<C extends ComponentType<any>, P> =
  | StyleObject<C>
  | StyleFn<C, P>;

// Condition parsed types
export type ConditionString = string;
export type ConditionFn<P> = (ctx: StyleContext<P>) => boolean;
export type Condition<P> = ConditionString | ConditionFn<P>;

export type EngineComponent<
  C extends ComponentType<unknown>,
  P extends object = object,
> = React.ForwardRefExoticComponent<React.ComponentPropsWithRef<C> & P> & {
  style(s: StyleFn<C, P>): EngineComponent<C, P>;
  style(s: StyleObject<C>): EngineComponent<C, P>;
  when(
    condition: Condition<P>,
    attrs: Partial<React.ComponentPropsWithRef<C>>,
  ): EngineComponent<C, P>;
  attrs: (
    attrs: Partial<React.ComponentPropsWithRef<C>>,
  ) => EngineComponent<C, P>;
  extend(): EngineComponent<C, P>;
};
