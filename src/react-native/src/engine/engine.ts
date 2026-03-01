/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react';
import { EngineComponent } from './types';
import { makeProxy } from '../../../core/proxy';
import { StylizedBuilder } from './builder';

export function stylized<
  C extends React.ComponentType<unknown>,
  P extends object = {},
>(BaseComponent: C): EngineComponent<C, P> {
  const builder = new StylizedBuilder<C, P>(BaseComponent);
  return makeProxy(builder.build(), builder);
}
