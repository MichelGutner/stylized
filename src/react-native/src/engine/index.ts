/* eslint-disable @typescript-eslint/no-explicit-any */

import * as RN from 'react-native';
import { stylized } from './engine';
import { Engine } from './types';

/**
 * Creates a styling engine instance for React Native components.
 * 
 * The engine provides a unified interface for styling React Native components
 * with theme support, type safety, and a fluent API.
 * 
 * @returns An Engine instance that can style React Native components
 * 
 * @example Basic Usage
 * ```tsx
 * import { engine } from 'stylized/react-native';
 * 
 * // Style a View component
 * const Container = engine('View', {
 *   flex: 1,
 *   backgroundColor: '#ffffff',
 *   padding: 16,
 * });
 * 
 * // Style with function for dynamic theming
 * const ThemedText = engine('Text', ({ theme, props }) => ({
 *   fontSize: props.size === 'large' ? 24 : 16,
 *   color: theme.colors.text,
 *   fontWeight: '600',
 * }));
 * 
 * // Chain styles for complex components
 * const Button = engine('TouchableOpacity')
 *   .style({
 *     backgroundColor: '#007AFF',
 *     paddingVertical: 12,
 *     paddingHorizontal: 24,
 *     borderRadius: 8,
 *   })
 *   .style(({ theme }) => ({
 *     shadowColor: theme.colors.shadow,
 *     shadowOffset: { width: 0, height: 2 },
 *     shadowOpacity: 0.1,
 *     shadowRadius: 4,
 *   }));
 * ```
 * 
 * @example Custom Components
 * ```tsx
 * import { engine } from 'stylized/react-native';
 * 
 * // Style custom React Native components
 * const CustomCard = engine(CustomCardComponent, {
 *   backgroundColor: 'white',
 *   borderRadius: 12,
 *   padding: 16,
 *   shadowColor: '#000',
 *   shadowOffset: { width: 0, height: 2 },
 *   shadowOpacity: 0.1,
 *   shadowRadius: 4,
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
 * import { engine } from 'stylized/react-native';
 * 
 * // Access theme colors and spacing
 * const ThemedContainer = engine('View', ({ theme }) => ({
 *   backgroundColor: theme.colors.background,
 *   padding: theme.spacing.md,
 *   margin: theme.spacing.sm,
 *   borderRadius: theme.borderRadius.md,
 * }));
 * 
 * // Use theme typography
 * const StyledText = engine('Text', ({ theme }) => ({
 *   fontSize: theme.typography.fontSize.md,
 *   fontFamily: theme.typography.fontFamily.regular,
 *   color: theme.colors.text,
 *   lineHeight: theme.typography.fontSize.md * 1.5,
 * }));
 * ```
 * 
 * @example Platform-Specific Styling
 * ```tsx
 * import { engine } from 'stylized/react-native';
 * 
 * const PlatformComponent = engine('View', ({ platform, theme }) => ({
 *   // Platform-specific styling
 *   paddingTop: platform === 'ios' ? theme.spacing.lg : theme.spacing.md,
 *   backgroundColor: platform === 'android' ? theme.colors.surface : theme.colors.background,
 *   
 *   // Platform-specific shadows
 *   shadowColor: theme.colors.shadow,
 *   shadowOffset: { width: 0, height: platform === 'ios' ? 2 : 4 },
 *   shadowOpacity: platform === 'ios' ? 0.1 : 0.2,
 *   shadowRadius: platform === 'ios' ? 4 : 8,
 *   elevation: platform === 'android' ? 4 : 0,
 * }));
 * ```
 */
function createEngine(): Engine {
  const engineFn = (component: any, style?: any) => {
    let BaseComponent = component;

    if (typeof component === 'string') {
      BaseComponent = (RN)[component];
    }

    const styledComp = stylized(BaseComponent);
    
    if (style) {
      return styledComp.style(style);
    }

    return styledComp;
  };

  return engineFn as Engine;
}

/**
 * Global styling engine instance.
 * 
 * This is the main entry point for styling React Native components.
 * Use this engine to create styled versions of any React Native component.
 * 
 * @example
 * ```tsx
 * import { engine } from 'stylized/react-native';
 * 
 * // Create styled components
 * const StyledView = engine('View', ({ theme }) => ({
 *    backgroundColor: theme.colors.background 
 * }));
 * const StyledText = engine('Text', { fontSize: 16, color: '#0a0909' });
 * const StyledButton = engine('TouchableOpacity', {
 *   backgroundColor: '#007AFF',
 *   padding: 16,
 *   borderRadius: 8,
 * });
 * 
 * // Use in your components
 * const MyComponent = () => (
 *   <StyledView>
 *     <StyledText>Hello World</StyledText>
 *     <StyledButton onPress={() => console.log('pressed')}>
 *       <StyledText>Press Me</StyledText>
 *     </StyledButton>
 *   </StyledView>
 * );
 * ```
 */
export const engine = createEngine();

export * from './types';