/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */

import * as RN from 'react-native';
import React, { ComponentType } from 'react';
import type { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import {
  BaseStyleContext,
  ExtractStyle,
  BaseEngineComponent,
} from '../../../core/types';

export type ViewStyleProp = StyleProp<ViewStyle>;
export type TextStyleProp = StyleProp<TextStyle>;
export type ImageStyleProp = StyleProp<ImageStyle>;

export type ComponentStyle<C extends ComponentType<unknown>> =
  C extends typeof RN.Text
    ? RN.StyleProp<RN.TextStyle>
    : RN.StyleProp<ExtractStyle<C>>;

export type StyleObject<C extends ComponentType<unknown>> = ComponentStyle<C>;

export interface StyleContext<P> extends BaseStyleContext<P> {
  platform: RN.PlatformOSType;
}

export type StyleFn<C extends ComponentType<unknown>, P> = (
  ctx: StyleContext<P>,
) => StyleObject<C>;

export type StyleOrFn<C extends ComponentType<unknown>, P> =
  | StyleObject<C>
  | StyleFn<C, P>;

export type EngineComponent<
  C extends ComponentType<unknown>,
  P extends object = {},
> = BaseEngineComponent<C, P> & {
  __engine: true;
  __component: C;
  __props: P;

  /**
   * @param s style function that receives the style context and returns a style object to be applied to the component
   * @returns the builder instance for chaining
   */
  style(s: StyleFn<C, P>): EngineComponent<C, P>;
  /**
   * @param args style object to be applied to the component
   * @returns the builder instance for chaining
   */
  style(args: StyleObject<C>): EngineComponent<C, P>;
};

type RNComponents = {
  View: typeof RN.View;
  Text: typeof RN.Text;
  Image: typeof RN.Image;
  ScrollView: typeof RN.ScrollView;
  TouchableOpacity: typeof RN.TouchableOpacity;
  TextInput: typeof RN.TextInput;
  Pressable: typeof RN.Pressable;
  StatusBar: typeof RN.StatusBar;
  ActivityIndicator: typeof RN.ActivityIndicator;
  Switch: typeof RN.Switch;
  Modal: typeof RN.Modal;
  KeyboardAvoidingView: typeof RN.KeyboardAvoidingView;
  ImageBackground: typeof RN.ImageBackground;
  TouchableHighlight: typeof RN.TouchableHighlight;
  TouchableWithoutFeedback: typeof RN.TouchableWithoutFeedback;
  SafeAreaView: typeof RN.SafeAreaView;
};

type ExtractComponent<T> = T extends { __engine: true; __component: infer C }
  ? C extends ComponentType<unknown>
    ? C
    : never
  : T extends ComponentType<unknown>
    ? T
    : never;

type ExtractProps<T> = T extends { __engine: true; __props: infer P } ? P : {};

export interface Engine {
  // RN components
  <K extends keyof RNComponents, P extends object = {}>(
    component: K,
    style?: StyleOrFn<RNComponents[K], P>,
  ): EngineComponent<RNComponents[K], P>;

  // EngineComponents
  <C extends { __engine: true }, P extends object = {}>(
    component: C,
    style?: StyleOrFn<ExtractComponent<C>, P & ExtractProps<C>>,
  ): EngineComponent<ExtractComponent<C>, P & ExtractProps<C>>;

  // React components and others
  <C extends ComponentType<unknown>, P extends object = {}>(
    component: C,
    style?: StyleOrFn<C, P>,
  ): EngineComponent<C, P>;
}

export const engine: Engine = (component: any, style?: any) => {
  const Base = typeof component === 'string' ? RN[component] : component;

  const Comp = React.forwardRef<any, any>((props, ref) => {
    return React.createElement(Base, {
      ...props,
      ref,
    });
  }) as any;

  Comp.__engine = true;

  Comp.__component =
    component?.__engine === true ? component.__component : Base;

  Comp.__props = component?.__engine === true ? component.__props : {};

  if (style && '__baseStyle' in Comp) {
    Comp.__baseStyle = style;
  }

  return Comp as EngineComponent<any, any>;
};
