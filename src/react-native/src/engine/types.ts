/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as RN from 'react-native';
import { ComponentPropsWithRef, ComponentType, Ref } from 'react';
import type { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

// Component-specific style types
export type ViewStyleProp = StyleProp<ViewStyle>;
export type TextStyleProp = StyleProp<TextStyle>;
export type ImageStyleProp = StyleProp<ImageStyle>;

// Component style mapping
export type ComponentStyleMap = {
  View: ViewStyleProp;
  Text: TextStyleProp;
  Image: ImageStyleProp;
  ScrollView: ViewStyleProp;
  TouchableOpacity: ViewStyleProp;
  TextInput: TextStyleProp;
  FlatList: ViewStyleProp;
  SectionList: ViewStyleProp;
  Pressable: ViewStyleProp;
  SafeAreaView: ViewStyleProp;
  StatusBar: ViewStyleProp;
  ActivityIndicator: ViewStyleProp;
  Switch: ViewStyleProp;
  Modal: ViewStyleProp;
  TouchableHighlight: ViewStyleProp;
  TouchableWithoutFeedback: ViewStyleProp;
  KeyboardAvoidingView: ViewStyleProp;
  VirtualizedList: ViewStyleProp;
};

// Helper type to get style type for component
export type GetComponentStyle<K extends keyof ComponentStyleMap> = ComponentStyleMap[K];

export type Context<P, AdditionalProps = object> = {
  theme: EngineTheme;
} & P &
  AdditionalProps;

// @ts-ignore
export type CtxResolver<DynamicStyle, AdditionalProps, StyleType> = (
  ctx: Context<DynamicStyle & AdditionalProps>,
) => StyleProp<StyleType> | StyleProp<StyleType>[] | undefined;

export type Interpolation<P, AdditionalProps, StyleType> = CtxResolver<P, AdditionalProps, StyleType>;

export type BaseComponent<P> = ComponentType<P>;

export type ReactNativeComponentProperties<K extends keyof typeof RN> =
  (typeof RN)[K] extends ComponentType<infer P> ? P : never;

export type RNComponentNames = (typeof RN)[keyof typeof RN];

// @ts-ignore
export type InferRef<T> = ComponentPropsWithRef<T> extends { ref?: Ref<infer R> } ? R : never;
