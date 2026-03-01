# 🎨 Stylized

Modern styling library for React Native with template literals and global theming.

## Quick Start

### Installation
```bash
npm install stylized
# or
yarn add stylized
```

### React Native
```tsx
import { engine, setTheme } from 'stylized/react-native';

// Set theme
setTheme({
  colors: { primary: '#007AFF', background: '#FFFFFF' },
  spacing: { md: 16 },
});

// Create components
const Container = engine('View', ({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  padding: theme.spacing.md,
}));

const Button = engine('TouchableOpacity', ({ theme }) => ({
  backgroundColor: theme.colors.primary,
  padding: theme.spacing.md,
  borderRadius: 8,
}));

// Chain styles
const StyledCard = engine('View')
  .style({ backgroundColor: 'white' })
  .style(({ theme }) => ({
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  }));
```

## Core API

### Engine Functions
- `engine(component, style?)` - Create styled component
- `setTheme(theme)` - Update global theme
- `useTheme()` - Access current theme (React hook)
- `getTheme()` - Access current theme (non-reactive)

### Component Methods
- `.style(style)` - Add styles (object or function)
- `.when(condition, attrs)` - Conditional styling
- `.attrs(attrs)` - Add component attributes

### Available React Native Components
View, Text, Image, ScrollView, TouchableOpacity, TextInput, Pressable, StatusBar, ActivityIndicator, Switch, Modal, KeyboardAvoidingView, ImageBackground, TouchableHighlight, TouchableWithoutFeedback, SafeAreaView

## Examples

### Basic Component
```tsx
const Card = engine('View', ({ theme }) => ({
  backgroundColor: theme.colors.surface,
  padding: theme.spacing.md,
  borderRadius: theme.borderRadius.md,
}));
```

### Chained Styles
```tsx
const Button = engine('TouchableOpacity')
  .style({ backgroundColor: '#007AFF' })
  .style(({ theme }) => ({
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
  }));
```

### Conditional Styling
```tsx
const AdaptiveButton = engine('TouchableOpacity')
  .style({ padding: 16, borderRadius: 8 })
  .when('variant:primary', { backgroundColor: '#007AFF' })
  .when('variant:secondary', { backgroundColor: '#5856D6' })
  .when('disabled', { opacity: 0.5 });
```

### With Props
```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const Button = engine<ButtonProps>('TouchableOpacity', ({ theme, variant = 'primary', size = 'medium', disabled }) => ({
  backgroundColor: disabled ? '#ccc' : theme.colors[variant],
  padding: theme.spacing[size],
  borderRadius: theme.borderRadius.md,
  opacity: disabled ? 0.5 : 1,
}));
```

### Theme Switching
```tsx
const ThemeToggler = () => {
  const theme = useTheme();
  
  const toggleTheme = () => {
    setTheme({
      colors: {
        primary: theme.colors.primary === '#007AFF' ? '#FF3B30' : '#007AFF',
        background: theme.colors.background === '#FFFFFF' ? '#000000' : '#FFFFFF',
      },
    });
  };
  
  return (
    <Button onPress={toggleTheme}>
      <Text>Toggle Theme</Text>
    </Button>
  );
};
```

## Documentation

- [📚 API Reference](./api-reference.md) - Complete API documentation
- [🚀 Getting Started](./getting-started.md) - Detailed setup guide
- [🎨 Styling Guide](./styling-guide.md) - Advanced styling techniques
- [🌍 Theme System](./theme-system.md) - Theme architecture
- [📱 Components](./components.md) - Component reference

## Features

- ✅ Template literal styling
- ✅ Global theme system (no providers needed)
- ✅ Full TypeScript support
- ✅ Performance optimized
- ✅ Conditional styling
- ✅ Component prop inference
- ✅ Deep theme merging

## License

MIT
