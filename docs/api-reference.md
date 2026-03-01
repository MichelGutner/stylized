---
title: API Reference
description: Complete API documentation for Stylized
---

# 📚 API Reference

## Core API

### Engine Functions

#### `engine(component, style?)`
Creates a styled component from React Native components.

**Parameters:**
- `component` (string | ComponentType) - Component name or custom component
- `style` (object | function, optional) - Initial styles

**Returns:** Styled component with chaining methods

**Examples:**
```tsx
import { engine } from 'stylized/react-native';

// With component name
const StyledView = engine('View');
const StyledText = engine('Text');
const StyledButton = engine('TouchableOpacity');

// With initial styles
const Container = engine('View', { flex: 1, padding: 16 });

// With function styles
const ThemedText = engine('Text', ({ theme }) => ({
  color: theme.colors.text,
  fontSize: theme.typography.fontSize.md,
}));

// Custom component
const StyledCard = engine(CustomCardComponent, {
  backgroundColor: 'white',
  borderRadius: 12,
});
```

### Theme Functions

#### `setTheme(theme)`
Updates the global theme with deep merging.

**Parameters:**
- `theme` (object | function) - Theme object or updater function

**Returns:** Complete merged theme object

**Examples:**
```tsx
import { setTheme } from 'stylized/react-native';

// Object form
setTheme({
  colors: { primary: '#007AFF', background: '#FFFFFF' },
  spacing: { sm: 8, md: 16, lg: 24 },
});

// Function form
setTheme(prev => ({
  ...prev,
  colors: { 
    ...prev.colors,
    primary: prev.colors.primary === '#007AFF' ? '#FF3B30' : '#007AFF'
  }
}));
```

#### `useTheme()`
React hook for accessing current theme.

**Returns:** Current theme object

**Example:**
```tsx
import { useTheme } from 'stylized/react-native';

const MyComponent = () => {
  const theme = useTheme();
  
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Hello</Text>
    </View>
  );
};
```

#### `getTheme()`
Non-reactive access to current theme.

**Returns:** Current theme object

**Example:**
```tsx
import { getTheme } from 'stylized/react-native';

// For non-React usage
const currentTheme = getTheme();
console.log('Primary color:', currentTheme.colors.primary);
```

## Component Methods

### `.style(style)`
Adds styles to the component. Can be called multiple times for chaining.

**Parameters:**
- `style` (object | function) - Style object or function

**Returns:** Styled component for chaining

**Examples:**
```tsx
const Button = engine('TouchableOpacity')
  .style({ backgroundColor: '#007AFF' })
  .style(({ theme }) => ({
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  }));

// Single call with function
const Container = engine('View', ({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
}));
```

### `.when(condition, attrs)`
Applies conditional styling based on conditions.

**Parameters:**
- `condition` (string | function) - Condition to evaluate
- `attrs` (object) - Attributes to apply when condition is true

**Returns:** Styled component for chaining

**Condition Types:**
- **Platform strings**: `'ios'`, `'android'`, `'web'`
- **Prop expressions**: `'variant:primary'`, `'disabled'`
- **Custom functions**: `({ theme, props }) => boolean`

**Examples:**
```tsx
const AdaptiveButton = engine('TouchableOpacity')
  .style({ padding: 16, borderRadius: 8 })
  .when('variant:primary', { backgroundColor: '#007AFF' })
  .when('variant:secondary', { backgroundColor: '#5856D6' })
  .when('disabled', { opacity: 0.5 })
  .when('ios', { shadowColor: '#000', shadowOpacity: 0.1 })
  .when('android', { elevation: 4 })
  .when(({ props }) => props.size > 100, { fontSize: 20 });
```

### `.attrs(attrs)`
Adds component attributes unconditionally.

**Parameters:**
- `attrs` (object) - Component attributes to apply

**Returns:** Styled component for chaining

**Examples:**
```tsx
const AccessibleButton = engine('TouchableOpacity')
  .style({ backgroundColor: '#007AFF' })
  .attrs({
    accessible: true,
    accessibilityLabel: 'Submit button',
    accessibilityRole: 'button',
    testID: 'submit-button',
  });
```

## Available Components

### React Native Components
- `View`
- `Text`
- `Image`
- `ScrollView`
- `TouchableOpacity`
- `TextInput`
- `Pressable`
- `StatusBar`
- `ActivityIndicator`
- `Switch`
- `Modal`
- `KeyboardAvoidingView`
- `ImageBackground`
- `TouchableHighlight`
- `TouchableWithoutFeedback`
- `SafeAreaView`

## Theme Interface

### Default Theme Structure
```typescript
interface EngineTheme {}
```

## Type Safety

### Component Props
```typescript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onPress?: () => void;
}

const Button = engine<ButtonProps>('TouchableOpacity', ({ theme, variant = 'primary', size = 'medium', disabled }) => ({
  backgroundColor: disabled ? '#ccc' : theme.colors[variant],
  padding: theme.spacing[size],
  borderRadius: theme.borderRadius.md,
  opacity: disabled ? 0.5 : 1,
}));
```

### Custom Theme Types
```typescript
// types.d.ts
declare global {
  export interface EngineTheme {
    colors: {
      primary: string;
      secondary: string;
      // Your custom colors
    };
    spacing: {
      sm: number;
      md: number;
      lg: number;
      // Your custom spacing
    };
    // Your custom theme sections
  }
}

export {};
```

## Performance Tips

1. **Use function styles for dynamic theming**
2. **Chain .style() methods for complex styling**
3. **Avoid inline objects in render**
4. **Use theme values consistently**
5. **Leverage component memoization**

## Migration

### From StyleSheet
```tsx
// Before
const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 24, fontWeight: 'bold' },
});

// After
const Container = engine('View', { flex: 1, padding: 16 });
const Title = engine('Text', { fontSize: 24, fontWeight: 'bold' });
```

### From Styled Components
```tsx
// Before
const Container = styled.View`
  flex: 1;
  padding: 16px;
`;

// After
const Container = engine('View', { flex: 1, padding: 16 });
```

## Export Structure

```typescript
// Main exports
import { 
  engine,           // Styling engine
  setTheme,         // Theme management
  useTheme,         // React hook
  getTheme,         // Non-reactive access
} from 'stylized/react-native';

// Type exports
import type { 
  EngineTheme,       // Theme interface
} from 'stylized/react-native';
```
