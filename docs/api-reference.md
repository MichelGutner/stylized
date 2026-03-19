---
title: API Reference
description: Complete API documentation for React Native Stylish
---

# 📚 API Reference

Complete API documentation for React Native Stylish with detailed examples and type definitions.

---

## Core API

### Engine Functions

#### `engine<T, P>(component, style?)`

Creates a styled React Native component with method chaining support.

**Type Signature:**
```typescript
function engine<
  T extends React.ComponentType<any>,
  P extends object = {}
>(
  component: T | string,
  style?: StyleFunction<T, P>
): EngineComponent<T, P>
```

**Parameters:**
- `component` (string | ComponentType) - React Native component name or custom component
- `style` (object | function, optional) - Initial styles or style function

**Returns:** Styled component with chaining methods

**Examples:**

```tsx
import { engine } from 'react-native-stylized';

// Basic usage with component name
const StyledView = engine('View');
const StyledText = engine('Text');
const StyledButton = engine('TouchableOpacity');

// With initial static styles
const Container = engine('View', {
  flex: 1,
  padding: 16,
  backgroundColor: '#FFFFFF'
});

// With function styles (theme-aware)
const ThemedText = engine('Text', ({ theme }) => ({
  color: theme.colors.text,
  fontSize: theme.typography.fontSize.md,
}));

// With TypeScript props
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onPress?: () => void;
}

const Button = engine<ButtonProps>('TouchableOpacity', ({ theme, variant, size, disabled }) => ({
  backgroundColor: disabled ? theme.colors.disabled : theme.colors[variant],
  padding: theme.spacing[size],
  borderRadius: theme.borderRadius.md,
}));

// Custom component styling
import CustomCard from './CustomCard';

const StyledCard = engine(CustomCard, ({ theme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: theme.borderRadius.md,
  padding: theme.spacing.md,
}));
```

---

### Theme Functions

#### `setTheme(theme)`

Updates the global theme with deep merging. Supports both object and functional updates.

**Type Signature:**
```typescript
function setTheme<T extends Partial<EngineTheme>>(
  input: T | ((prev: EngineTheme) => T)
): EngineTheme
```

**Parameters:**
- `input` (object | function) - Theme object or updater function

**Returns:** Complete merged theme object

**Examples:**

```tsx
import { setTheme } from 'react-native-stylized';

// Object form - direct merge
setTheme({
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
});

// Function form - functional updates
setTheme((prevTheme) => ({
  colors: {
    ...prevTheme.colors,
    primary: prevTheme.colors.primary === '#007AFF' ? '#FF3B30' : '#007AFF',
  },
  spacing: {
    ...prevTheme.spacing,
    md: prevTheme.spacing.md + 2,
  },
}));

// Dark mode toggle
const toggleDarkMode = () => {
  setTheme((prev) => ({
    colors: {
      primary: '#0A84FF',
      secondary: '#FF9500',
      background: prev.colors.background === '#FFFFFF' ? '#000000' : '#FFFFFF',
      surface: prev.colors.surface === '#F2F2F7' ? '#1C1C1E' : '#F2F2F7',
      text: prev.colors.text === '#000000' ? '#FFFFFF' : '#000000',
    },
  }));
};
```

#### `useTheme()`

React hook for accessing the current theme with reactivity.

**Type Signature:**
```typescript
function useTheme(): EngineTheme
```

**Returns:** Current theme object

**Example:**
```tsx
import { useTheme } from 'react-native-stylized';

const ThemeDisplay = () => {
  const theme = useTheme();
  
  return (
    <View style={{ padding: 16 }}>
      <Text>Primary: {theme.colors.primary}</Text>
      <Text>Background: {theme.colors.background}</Text>
      <Text>Spacing MD: {theme.spacing.md}</Text>
    </View>
  );
};

// Use in styled components
const ThemedComponent = engine('View', ({ theme }) => ({
  backgroundColor: theme.colors.background,
  padding: theme.spacing.md,
}));

const ComponentWithTheme = () => {
  const theme = useTheme();
  
  return (
    <ThemedComponent>
      <Text style={{ color: theme.colors.text }}>
        Themed content
      </Text>
    </ThemedComponent>
  );
};
```

#### `getTheme()`

Non-reactive access to the current theme state.

**Type Signature:**
```typescript
function getTheme(): EngineTheme
```

**Returns:** Current theme object

**Example:**
```tsx
import { getTheme } from 'react-native-stylized';

// For non-React usage
const currentTheme = getTheme();
console.log('Primary color:', currentTheme.colors.primary);

// Utility functions
const getPrimaryColor = () => getTheme().colors.primary || '#007AFF';

// Event handlers (non-reactive)
const handlePress = () => {
  const theme = getTheme();
  Analytics.track('button_press', {
    color_scheme: theme.colors.primary === '#007AFF' ? 'blue' : 'other'
  });
};

// Server-side rendering
const getInitialTheme = () => {
  const theme = getTheme();
  return {
    primary: theme.colors.primary,
    background: theme.colors.background,
  };
};
```

---

## Component Methods

### `.style(style)`

Adds styles to the component. Can be called multiple times for chaining.

**Type Signature:**
```typescript
style<T extends React.ComponentType<any>, P extends object>(
  styleOrFn: StyleObject | StyleFunction<T, P>
): EngineComponent<T, P>
```

**Parameters:**
- `styleOrFn` (object | function) - Style object or function that returns styles

**Returns:** Styled component for chaining

**Examples:**

```tsx
// Static styles
const Button = engine('TouchableOpacity')
  .style({
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  });

// Function styles (theme-aware)
const ThemedButton = engine('TouchableOpacity')
  .style(({ theme }) => ({
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  }));

// Multiple style calls
const ComplexButton = engine('TouchableOpacity')
  .style({
    alignItems: 'center',
    justifyContent: 'center',
  })
  .style(({ theme }) => ({
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  }))
  .style(({ theme, size = 'medium' }) => ({
    paddingVertical: theme.spacing[size === 'small' ? 'sm' : 'md'],
    paddingHorizontal: theme.spacing[size === 'small' ? 'md' : 'lg'],
  }));

// With props
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
}

const PropsButton = engine<ButtonProps>('TouchableOpacity')
  .style(({ theme, variant = 'primary', size = 'medium' }) => ({
    backgroundColor: theme.colors[variant],
    padding: theme.spacing[size],
    borderRadius: theme.borderRadius.md,
  }));
```

### `.when(condition, attrs)`

Applies conditional styling based on conditions.

**Type Signature:**
```typescript
when<T extends React.ComponentType<any>, P extends object>(
  condition: Condition<P>,
  attrs: ConditionalAttrs<T, P>
): EngineComponent<T, P>
```

**Parameters:**
- `condition` (string | function | boolean) - Condition to evaluate
- `attrs` (object | function) - Attributes to apply when condition is true

**Returns:** Styled component for chaining

**Condition Types:**

1. **Platform strings**: `'ios'`, `'android'`
2. **Prop expressions**: `'variant:primary'`, `'disabled'`, `'size:large'`
3. **Custom functions**: `({ theme, props }) => boolean`
4. **Boolean values**: `true`, `false`

**Examples:**

```tsx
// Platform-based conditions
const AdaptiveButton = engine('TouchableOpacity')
  .style({ padding: 16, borderRadius: 8 })
  .when('ios', ({ theme }) => ({
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  }))
  .when('android', { elevation: 4 });

// Prop-based conditions
const VariantButton = engine('TouchableOpacity')
  .style({ padding: 16, borderRadius: 8 })
  .when('variant:primary', { backgroundColor: '#007AFF' })
  .when('variant:secondary', { backgroundColor: '#5856D6' })
  .when('variant:outline', ({ theme }) => ({
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  }))
  .when('variant:ghost', { backgroundColor: 'transparent' });

// Boolean prop conditions
const StateButton = engine('TouchableOpacity')
  .style({ padding: 16, borderRadius: 8 })
  .when('disabled', { opacity: 0.5 })
  .when('loading', { opacity: 0.7 })
  .when('focused', ({ theme }) => ({
    borderWidth: 2,
    borderColor: theme.colors.primary,
  }));

// Size-based conditions
const SizeButton = engine('TouchableOpacity')
  .style({ borderRadius: 8 })
  .when('size:small', ({ theme }) => ({
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  }))
  .when('size:medium', ({ theme }) => ({
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  }))
  .when('size:large', ({ theme }) => ({
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  }));

// Custom function conditions
const CustomButton = engine('TouchableOpacity')
  .style({ padding: 16, borderRadius: 8 })
  .when(({ props }) => props.priority === 'high', ({ theme }) => ({
    backgroundColor: theme.colors.error,
  }))
  .when(({ theme, props }) => props.size > 100, {
    fontSize: 20,
  })
  .when(({ props }) => props.count > 5, {
    backgroundColor: '#FF9500',
  });

// Complex conditions with function attributes
const AdvancedButton = engine('TouchableOpacity')
  .style({ padding: 16, borderRadius: 8 })
  .when('variant:primary', ({ theme }) => ({
    backgroundColor: theme.colors.primary,
  }))
  .when('variant:outline', ({ theme }) => ({
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  }))
  .when('disabled', ({ theme }) => ({
    opacity: 0.5,
    backgroundColor: theme.colors.disabled,
  }));
```

### `.attrs(attrs)`

Adds component attributes unconditionally.

**Type Signature:**
```typescript
attrs<T extends React.ComponentType<any>, P extends object>(
  attrs: AttrsObject<T, P> | AttrsFunction<T, P>
): EngineComponent<T, P>
```

**Parameters:**
- `attrs` (object | function) - Component attributes to apply

**Returns:** Styled component for chaining

**Examples:**

```tsx
// Static attributes
const AccessibleButton = engine('TouchableOpacity')
  .style({ backgroundColor: '#007AFF' })
  .attrs({
    accessible: true,
    accessibilityRole: 'button',
    accessibilityLabel: 'Submit button',
    testID: 'submit-button',
  });

// Function attributes
const DynamicButton = engine('TouchableOpacity')
  .style({ backgroundColor: '#007AFF' })
  .attrs(({ variant, size }) => ({
    accessibilityLabel: `${variant} button, ${size} size`,
    testID: `${variant}-${size}-button`,
  }));

// Input component attributes
const SecureInput = engine('TextInput')
  .style({
    borderWidth: 1,
    borderColor: '#E5E5E7',
    borderRadius: 8,
    padding: 12,
  })
  .attrs({
    secureTextEntry: true,
    autoComplete: 'password',
    textContentType: 'password',
    placeholderTextColor: '#8E8E93',
  });

// Image attributes
const OptimizedImage = engine('Image')
  .style({
    width: '100%',
    height: 200,
    borderRadius: 8,
  })
  .attrs({
    resizeMode: 'cover',
    blurRadius: 0,
  });

// Modal attributes
const FullScreenModal = engine('Modal')
  .style({})
  .attrs({
    animationType: 'slide',
    presentationStyle: 'fullScreen',
    statusBarTranslucent: true,
  });

// ScrollView attributes
const CustomScrollView = engine('ScrollView')
  .style({ flex: 1 })
  .attrs({
    showsVerticalScrollIndicator: false,
    keyboardShouldPersistTaps: 'handled',
    contentContainerStyle: { flexGrow: 1 },
  });
```

---

## Available Components

### React Native Core Components

All standard React Native components are supported by string name:

```tsx
// Layout Components
const StyledView = engine('View');
const StyledScrollView = engine('ScrollView');
const StyledFlatList = engine('FlatList');
const StyledSectionList = engine('SectionList');
const StyledSafeAreaView = engine('SafeAreaView');
const StyledKeyboardAvoidingView = engine('KeyboardAvoidingView');

// Text Components
const StyledText = engine('Text');

// Image Components
const StyledImage = engine('Image');
const StyledImageBackground = engine('ImageBackground');

// Input Components
const StyledTextInput = engine('TextInput');

// Touchable Components
const StyledTouchableOpacity = engine('TouchableOpacity');
const StyledPressable = engine('Pressable');
const StyledTouchableHighlight = engine('TouchableHighlight');
const StyledTouchableWithoutFeedback = engine('TouchableWithoutFeedback');

// Interactive Components
const StyledSwitch = engine('Switch');
const StyledSlider = engine('Slider');

// Display Components
const StyledActivityIndicator = engine('ActivityIndicator');
const StyledModal = engine('Modal');
const StyledStatusBar = engine('StatusBar');
```

### Component-Specific Props

Each styled component inherits all the props of the underlying React Native component:

```tsx
// TouchableOpacity specific props
const Button = engine('TouchableOpacity')
  .style({ padding: 16 })
  .attrs({
    activeOpacity: 0.8,
    delayPressIn: 0,
  });

// TextInput specific props
const Input = engine('TextInput')
  .style({ borderWidth: 1, padding: 12 })
  .attrs({
    keyboardType: 'email-address',
    autoCapitalize: 'none',
    autoComplete: 'email',
    textContentType: 'emailAddress',
  });

// FlatList specific props
const List = engine('FlatList')
  .style({ flex: 1 })
  .attrs({
    data: [],
    keyExtractor: (item) => item.id,
    renderItem: ({ item }) => <Text>{item.title}</Text>,
    showsVerticalScrollIndicator: false,
  });

// Image specific props
const Avatar = engine('Image')
  .style({ width: 50, height: 50, borderRadius: 25 })
  .attrs({
    resizeMode: 'cover',
    defaultSource: require('./assets/default-avatar.png'),
  });
```

---

## Type Definitions

### EngineTheme Interface

The global theme interface that can be extended by applications:

```typescript
interface EngineTheme {
  [key: string]: any;
}

// Example extension
declare global {
  export interface EngineTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      surface: string;
      text: string;
      textSecondary: string;
      border: string;
      disabled: string;
      success: string;
      warning: string;
      error: string;
      shadow: string;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    borderRadius: {
      sm: number;
      md: number;
      lg: number;
      xl: number;
      full: number;
    };
    typography: {
      fontSize: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
        xxl: number;
      };
      fontWeight: {
        normal: FontWeight;
        medium: FontWeight;
        bold: FontWeight;
      };
      lineHeight: {
        tight: number;
        normal: number;
        relaxed: number;
      };
    };
    shadows: {
      sm: ViewStyle;
      md: ViewStyle;
      lg: ViewStyle;
    };
  }
}

export {};
```

### Component Props

Type-safe props for styled components:

```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  children?: React.ReactNode;
}

const Button = engine<ButtonProps>('TouchableOpacity', ({ theme, variant, size, disabled }) => ({
  backgroundColor: disabled ? theme.colors.disabled : theme.colors[variant],
  padding: theme.spacing[size],
  borderRadius: theme.borderRadius.md,
  opacity: disabled ? 0.5 : 1,
}));

// Usage with full type safety
const App = () => {
  return (
    <Button variant="primary" size="large" disabled onPress={() => {}}>
      <Text>Press me</Text>
    </Button>
  );
};
```

### Style Functions

Type definitions for style functions:

```typescript
type StyleFunction<T extends React.ComponentType<any>, P extends object> = (
  context: StyleContext<P>
) => StyleProps;

type StyleContext<P extends object> = {
  theme: EngineTheme;
  props: P;
  platform?: 'ios' | 'android';
};

// Example usage
const ThemedComponent = engine<View, ButtonProps>('View', ({ theme, props, platform }) => ({
  backgroundColor: theme.colors.background,
  padding: theme.spacing.md,
  ...(platform === 'ios' && {
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.1,
  }),
  ...(props.disabled && {
    opacity: 0.5,
  }),
}));
```

---

## Performance Optimization

### Caching

The library automatically caches style calculations to prevent unnecessary re-renders:

```tsx
// Efficient - styles are cached
const OptimizedButton = engine('TouchableOpacity')
  .style(({ theme }) => ({
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
  }))
  .when('disabled', { opacity: 0.5 });

// Avoid - creates new objects on each render
const BadButton = engine('TouchableOpacity')
  .style(({ theme }) => ({
    backgroundColor: theme.colors.primary,
    padding: 16, // Hardcoded value
    ...getDynamicStyles(), // Avoid this
  }));
```

### Memoization

For complex calculations, use memoization:

```tsx
import { useMemo } from 'react';

const ComplexComponent = engine('View', ({ theme, data }) => {
  const processedData = useMemo(() => {
    return data.map(item => ({
      ...item,
      computed: expensiveCalculation(item),
    }));
  }, [data]);

  return {
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  };
});
```

### Conditional Optimization

Order conditions from most specific to least specific for optimal performance:

```tsx
const OptimizedButton = engine('TouchableOpacity')
  .style({ padding: 16, borderRadius: 8 })
  // Most specific conditions first
  .when('variant:primary', { backgroundColor: '#007AFF' })
  .when('variant:secondary', { backgroundColor: '#5856D6' })
  .when('variant:outline', { backgroundColor: 'transparent' })
  // General conditions last
  .when('disabled', { opacity: 0.5 })
  .when('loading', { opacity: 0.7 });
```

---

## Advanced Usage

### Composition

Compose multiple styled components:

```tsx
const BaseButton = engine('TouchableOpacity')
  .style({
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  });

const PrimaryButton = BaseButton
  .style(({ theme }) => ({
    backgroundColor: theme.colors.primary,
  }))
  .attrs({
    accessibilityRole: 'button',
  });

const LargeButton = BaseButton
  .style(({ theme }) => ({
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  }));

// Combine styles
const PrimaryLargeButton = engine('TouchableOpacity')
  .style({ alignItems: 'center', justifyContent: 'center' })
  .style(({ theme }) => ({
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  }));
```

### Extension

Create base components and extend them:

```tsx
const BaseCard = engine('View')
  .style(({ theme }) => ({
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  }));

const ElevatedCard = BaseCard
  .when('elevated', ({ theme }) => ({
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  }));

const OutlinedCard = BaseCard
  .when('outlined', ({ theme }) => ({
    borderWidth: 1,
    borderColor: theme.colors.border,
  }));
```

### Theme Variants

Create theme-aware variants:

```tsx
const createButtonVariant = (variant: string, styles: any) => {
  return engine('TouchableOpacity')
    .style(({ theme }) => ({
      padding: theme.spacing.md,
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
    }))
    .when(`variant:${variant}`, ({ theme }) => styles(theme));
};

const PrimaryButton = createButtonVariant('primary', (theme) => ({
  backgroundColor: theme.colors.primary,
}));

const SecondaryButton = createButtonVariant('secondary', (theme) => ({
  backgroundColor: theme.colors.secondary,
}));
```

---

## Migration Guide

### From StyleSheet

```tsx
// Before
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
});

// After
import { engine, setTheme } from 'react-native-stylized';

setTheme({
  colors: { primary: '#007AFF', background: '#FFFFFF', text: '#000000' },
  spacing: { md: 16 },
  typography: { fontSize: { md: 16, xl: 24 } },
  borderRadius: { md: 8 },
});

const Container = engine('View', ({ theme }) => ({
  flex: 1,
  padding: theme.spacing.md,
  backgroundColor: theme.colors.background,
}));

const Title = engine('Text', ({ theme }) => ({
  fontSize: theme.typography.fontSize.xl,
  fontWeight: 'bold',
  color: theme.colors.text,
  marginBottom: theme.spacing.md,
}));

const Button = engine('TouchableOpacity', ({ theme }) => ({
  backgroundColor: theme.colors.primary,
  padding: theme.spacing.md,
  borderRadius: theme.borderRadius.md,
  alignItems: 'center',
}));
```

### From Styled Components

```tsx
// Before
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.background};
`;

const Button = styled.TouchableOpacity`
  background-color: ${({ theme, variant }) => theme.colors[variant]};
  padding: 16px;
  border-radius: 8px;
  align-items: center;
  
  ${({ disabled }) => disabled && `
    opacity: 0.5;
  `}
`;

// After
import { engine } from 'react-native-stylized';

const Container = engine('View', ({ theme }) => ({
  flex: 1,
  padding: 16,
  backgroundColor: theme.background,
}));

const Button = engine('TouchableOpacity')
  .style(({ theme }) => ({
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  }))
  .when('variant:primary', ({ theme }) => ({
    backgroundColor: theme.colors.primary,
  }))
  .when('variant:secondary', ({ theme }) => ({
    backgroundColor: theme.colors.secondary,
  }))
  .when('disabled', { opacity: 0.5 });
```

---

## Export Structure

```typescript
// Main exports
import { 
  engine,           // Styling engine
  setTheme,         // Theme management
  useTheme,         // React hook
  getTheme,         // Non-reactive access
} from 'react-native-stylized';

// Type exports
import type { 
  EngineTheme,       // Theme interface
  EngineComponent,   // Styled component type
  StyleFunction,     // Style function type
  Condition,         // Condition type
} from 'react-native-stylized';
```

---

## Troubleshooting

### Common Issues

1. **TypeScript errors with theme**
   ```tsx
   // Fix: Extend the EngineTheme interface
   declare global {
     export interface EngineTheme {
       colors: {
         primary: string;
         // ... your theme properties
       };
     }
   }
   export {};
   ```

2. **Performance issues**
   ```tsx
   // Avoid: Creating new objects in render
   .style(() => ({ padding: 16 }))
   
   // Use: Static objects or theme values
   .style({ padding: 16 })
   .style(({ theme }) => ({ padding: theme.spacing.md }))
   ```

3. **Conditions not working**
   ```tsx
   // Check condition syntax
   .when('variant:primary', { backgroundColor: 'blue' })  // ✅
   .when('variant', 'primary', { backgroundColor: 'blue' })  // ❌
   ```

### Debug Tools

```tsx
// Debug theme values
const DebugComponent = engine('View', ({ theme }) => {
  console.log('Theme:', theme);
  return { backgroundColor: theme.colors.background };
});

// Debug conditions
const DebugButton = engine('TouchableOpacity')
  .when(({ props }) => {
    console.log('Condition props:', props);
    return props.disabled;
  }, { opacity: 0.5 });
```

---

## License

MIT
