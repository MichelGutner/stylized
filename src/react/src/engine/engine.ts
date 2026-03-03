/* eslint-disable @typescript-eslint/no-empty-object-type */
import React from 'react';
import { Engine, EngineComponent } from './types';
import { stylized } from './builder';

/**
 * Creates a styling engine instance for React web components.
 * 
 * The engine provides a unified interface for styling React components
 * with theme support, type safety, and a fluent API for web applications.
 * 
 * @returns An Engine instance that can style React components
 * 
 * @example Basic Usage
 * ```tsx
 * import { engine } from 'stylized/web';
 * 
 * // Style HTML elements
 * const Container = engine('div', {
 *   display: 'flex',
 *   flexDirection: 'column',
 *   padding: '16px',
 *   backgroundColor: '#ffffff',
 * });
 * 
 * // Style with function for dynamic theming
 * const Title = engine('h1', ({ theme, props }) => ({
 *   fontSize: props.size === 'large' ? '2rem' : '1.5rem',
 *   color: theme.colors.text,
 *   fontWeight: '600',
 *   margin: '0 0 1rem 0',
 * }));
 * 
 * // Chain styles for complex components
 * const Button = engine('button')
 *   .style({
 *     backgroundColor: '#007AFF',
 *     padding: '12px 24px',
 *     borderRadius: '8px',
 *     border: 'none',
 *     cursor: 'pointer',
 *     fontSize: '16px',
 *   })
 *   .style(({ theme }) => ({
 *     boxShadow: theme.colors.mode === 'dark' 
 *       ? '0 2px 4px rgba(255,255,255,0.1)'
 *       : '0 2px 4px rgba(0,0,0,0.1)',
 *   }));
 * ```
 * 
 * @example Custom Components
 * ```tsx
 * import { engine } from 'stylized/web';
 * 
 * // Style custom React components
 * const CustomCard = engine(CustomCardComponent, {
 *   backgroundColor: 'white',
 *   borderRadius: '12px',
 *   padding: '16px',
 *   boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
 * });
 * 
 * // Style with props for dynamic behavior
 * const DynamicComponent = engine(CustomComponent, ({ theme, props }) => ({
 *   backgroundColor: props.variant === 'primary' ? theme.colors.primary : theme.colors.secondary,
 *   opacity: props.disabled ? 0.5 : 1,
 * }));
 * ```
 * 
 * @example Theme Integration
 * ```tsx
 * import { engine } from 'stylized/web';
 * 
 * // Access theme colors and spacing
 * const ThemedContainer = engine('div', ({ theme }) => ({
 *   backgroundColor: theme.colors.background,
 *   padding: `${theme.spacing.md}px`,
 *   margin: `${theme.spacing.sm}px`,
 *   borderRadius: `${theme.borderRadius.md}px`,
 * }));
 * 
 * // Use theme typography
 * const StyledText = engine('p', ({ theme }) => ({
 *   fontSize: `${theme.typography.fontSize.md}px`,
 *   fontFamily: theme.typography.fontFamily.regular,
 *   color: theme.colors.text,
 *   lineHeight: theme.typography.fontSize.md * 1.5,
 * }));
 * ```
 * 
 * @example Responsive Design
 * ```tsx
 * import { engine } from 'stylized/web';
 * 
 * const ResponsiveContainer = engine('div', ({ theme }) => ({
 *   display: 'flex',
 *   flexDirection: 'column',
 *   padding: `${theme.spacing.sm}px`,
 *   
 *   // Media queries
 *   '@media (min-width: 768px)': {
 *     padding: `${theme.spacing.md}px`,
 *     flexDirection: 'row',
 *   },
 *   
 *   '@media (min-width: 1024px)': {
 *     padding: `${theme.spacing.lg}px`,
 *     maxWidth: '1200px',
 *     margin: '0 auto',
 *   },
 * }));
 * ```
 */
function createEngine(): Engine {
  const engineFn = (component: any, style?: any) => {
    let BaseComponent = component;

    // Handle HTML element strings
    if (typeof component === 'string') {
      // Convert string HTML element to React component
      BaseComponent = React.forwardRef((props: any, ref) => {
        return React.createElement(component, { ...props, ref });
      });
      BaseComponent.displayName = `Styled(${component})`;
    }

    const styledComp = stylized(BaseComponent);
    
    if (style) {
      return (styledComp as any).style(style);
    }

    return styledComp;
  };

  return engineFn as Engine;
}

/**
 * Global styling engine instance for React web.
 * 
 * This is the main entry point for styling React components in web applications.
 * Use this engine to create styled versions of any React component or HTML element.
 * 
 * @example
 * ```tsx
 * import { engine } from 'stylized/web';
 * 
 * // Create styled components
 * const StyledDiv = engine('div', ({ theme }) => ({
 *    backgroundColor: theme.colors.background 
 * }));
 * const StyledButton = engine('button', {
 *   backgroundColor: '#007AFF',
 *   padding: '16px',
 *   borderRadius: '8px',
 *   border: 'none',
 *   cursor: 'pointer',
 * });
 * 
 * // Use in your components
 * const MyComponent = () => (
 *   <StyledDiv>
 *     <h1>Hello World</h1>
 *     <StyledButton onClick={() => console.log('clicked')}>
 *       Click me
 *     </StyledButton>
 *   </StyledDiv>
 * );
 * ```
 */
export const engine = createEngine();
export type { EngineTheme };
