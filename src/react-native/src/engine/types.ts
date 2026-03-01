/* eslint-disable @typescript-eslint/no-empty-object-type */
 
import * as RN from 'react-native';
import { ComponentType } from 'react';
import type { StyleProp, ViewStyle, TextStyle, ImageStyle } from 'react-native';

import {
  BaseStyleContext,
  ExtractStyle,
  BaseEngineComponent,
} from '../../../core/types';

/**
 * Style prop types for React Native components
 * 
 * These types provide type-safe styling for different component categories.
 * 
 * @example
 * ```tsx
 * // For View-like components
 * const viewStyles: ViewStyleProp = {
 *   backgroundColor: 'white',
 *   padding: 16,
 *   borderRadius: 8,
 * };
 * 
 * // For Text components  
 * const textStyles: TextStyleProp = {
 *   fontSize: 16,
 *   fontWeight: '600',
 *   color: '#333',
 * };
 * 
 * // For Image components
 * const imageStyles: ImageStyleProp = {
 *   width: 100,
 *   height: 100,
 *   borderRadius: 50,
 *   resizeMode: 'cover',
 * };
 * ```
 */
// Component-specific style types
export type ViewStyleProp = StyleProp<ViewStyle>;
export type TextStyleProp = StyleProp<TextStyle>;
export type ImageStyleProp = StyleProp<ImageStyle>;

/**
 * Style prop type for a component
 * 
 * This type is a generic style prop type that can be used for any component.
 * It is a union of the component's style prop type and the style prop type of its parent component.
 * 
 * @template C - Component type
 */
export type ComponentStyle<C extends ComponentType<unknown>> =
  C extends typeof RN.Text
    ? RN.StyleProp<RN.TextStyle>
    : RN.StyleProp<ExtractStyle<C>>;

/**
 * Style object type for a component
 * 
 * This type is a generic style object type that can be used for any component.
 * It is a union of the component's style object type and the style object type of its parent component.
 * 
 * @template C - Component type
 */
export type StyleObject<C extends ComponentType<unknown>> = ComponentStyle<C>;

/**
 * Style context type for a component
 * 
 * This type provides the style context for a component, including the platform and theme.
 * 
 * @template P - Component props type
 */
export interface StyleContext<P> extends BaseStyleContext<P> {
  platform: RN.PlatformOSType;
}

/**
 * Style function type for a component
 * 
 * This type is a function that returns a style object for a component.
 * It takes the style context as an argument.
 * 
 * @template C - Component type
 * @template P - Component props type
 */
export type StyleFn<C extends ComponentType<any>, P> = (
  ctx: StyleContext<P>,
) => StyleObject<C>;

/**
 * Style or function type for a component
 * 
 * This type is a union of the style object type and the style function type for a component.
 * 
 * @template C - Component type
 * @template P - Component props type
 */
export type StyleOrFn<C extends ComponentType<any>, P> =
  | StyleObject<C>
  | StyleFn<C, P>;

/**
 * Engine component type
 * 
 * This type is a styled version of a React Native component.
 * It provides additional methods for styling and theming.
 * 
 * @template C - Component type
 * @template P - Component props type
 */
export type EngineComponent<
  C extends ComponentType<unknown>,
  P extends object = object,
> = BaseEngineComponent<C, P> & {
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

/**
 * React Native components type
 * 
 * This type is a mapping of React Native components to their corresponding types.
 */
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

/**
 * Engine function type definition
 * 
 * This type is a function that creates a styled version of a React Native component.
 * It can be called with either a string representing a React Native component or a custom React component,
 * along with an optional style object or function.
 * 
 * @template K - Key of RNComponents
 * @template P - Component props type
 */
export interface Engine {
  <K extends keyof RNComponents, P extends object = {}>(
    component: K,
    style?: StyleOrFn<RNComponents[K], P>,
  ): EngineComponent<RNComponents[K], P>;

  <C extends React.ComponentType<any>, P extends object = {}>(
    component: C,
    style?: StyleOrFn<C, P>,
  ): EngineComponent<C, P>;
}
