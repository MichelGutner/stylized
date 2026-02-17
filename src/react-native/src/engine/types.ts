/* eslint-disable @typescript-eslint/ban-ts-comment */
import * as RN from 'react-native';
import React from 'react';

export type Ctx = { theme: EngineTheme };

export type CtxResolver<
  P extends {
    style?: unknown;
  },
> = (ctx: Ctx & P) => P['style'] | P['style'][];

export type Interpolation<P> = CtxResolver<P>;

export type BaseComponent<P> = React.ComponentType<P>;

export type RNComponentProps<K extends keyof typeof RN> =
  (typeof RN)[K] extends React.ComponentType<infer P> ? P : never;

export type RNComponentNames = (typeof RN)[keyof typeof RN];

// @ts-ignore
export type InferRef<T> = React.ComponentPropsWithRef<T> extends { ref?: React.Ref<infer R> }
    ? R
    : never;
