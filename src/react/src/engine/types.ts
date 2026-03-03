import React, { JSX } from 'react';
import { CSSProperties } from 'react';
import { 
  BaseEngineComponent, 
  BaseStyleContext,
} from '../../../core/types';

/* ----------------------------------------
 * HTML TAG MAP (REAL JSX TYPES)
 * ---------------------------------------- */

export type HTMLTag = keyof JSX.IntrinsicElements;

/**
 * Map HTML tag -> React props
 */
export type HTMLElementMap = {
  [K in HTMLTag]: JSX.IntrinsicElements[K];
};

/* ----------------------------------------
 * STYLE TYPES
 * ---------------------------------------- */

/**
 * Web style type
 */
export type ComponentStyle = CSSProperties;

/**
 * Style object
 */
export type StyleObject = CSSProperties;

/**
 * Style context
 */
export interface StyleContext<P> extends BaseStyleContext<P> {
  platform: 'web';
}

/**
 * Style function
 */
export type StyleFn<P> = (ctx: StyleContext<P>) => StyleObject;

/**
 * Style or function
 */
export type StyleOrFn<P> = StyleObject | StyleFn<P>;

/* ----------------------------------------
 * ENGINE COMPONENT
 * ---------------------------------------- */

export interface EngineComponent<
  C extends React.ComponentType<unknown> | HTMLTag,
  P extends object = object,
  // @ts-ignore
> extends BaseEngineComponent<C extends React.ComponentType<unknown> ? C : HTMLTag, P> {

  /**
   * Adds styles to the component
   */
  style(s: StyleFn<P>): EngineComponent<C, P>;

  /**
   * Adds static styles to the component
   */
  style(s: StyleObject): EngineComponent<C, P>;
}

/* ----------------------------------------
 * ENGINE INTERFACE
 * ---------------------------------------- */

export interface Engine {

  /**
   * HTML element engine
   */
  <K extends HTMLTag, P extends object = {}>(
    component: K,
    style?: StyleOrFn<P>
  ): EngineComponent<K, P>;

  /**
   * React component engine
   */
  <C extends React.ComponentType<unknown>, P extends object = {}>(
    component: C,
    style?: StyleOrFn<P>
  ): EngineComponent<C, P>;
}