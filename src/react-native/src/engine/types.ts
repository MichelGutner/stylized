import * as RN from 'react-native';
import React from 'react';
import { RNComponents } from './constants';

export type StyleObject = RN.StyleProp<RN.ViewStyle>;

export type Resolver<P> = (ctx: { theme: EngineTheme } & P) => StyleObject;

type StyleModifier<P> = Resolver<P>;

export type Interpolation<P> = StyleObject | StyleModifier<P>;

export type BaseComponent<P> = React.ComponentType<P & { style?: StyleObject }>;

export type RNComponentProps<K extends keyof typeof RN> =
  (typeof RN)[K] extends React.ComponentType<infer P> ? P : never;

export type RNComponentNames = (typeof RNComponents)[number];
