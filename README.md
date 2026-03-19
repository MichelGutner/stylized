# 🎨 React Native Stylish

> Modern styling library for React Native with conditional styling and global theming

[![npm version](https://badge.fury.io/js/react-native-stylized.svg)](https://badge.fury.io/js/react-native-stylized)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## � Introduction

**React Native Stylish** is a modern styling library designed specifically for React Native applications. It provides a powerful, type-safe way to create styled components with conditional styling, global theming, and excellent performance.

### Who It's For

- **React Native developers** who want a cleaner styling approach than StyleSheet
- Teams building **cross-platform apps** that need consistent theming
- Developers who need **conditional styling** without complex ternary operators
- Projects requiring **TypeScript support** with full autocomplete

### What It Does

- Create styled React Native components with method chaining
- Apply conditional styles based on props, platform, or custom logic
- Manage global themes without providers
- Provide full TypeScript support with type inference
- Optimize performance with intelligent caching

---

## 🚀 Installation

```bash
npm install react-native-stylized
# or
yarn add react-native-stylized
```

### Peer Dependencies

```json
{
  "react": ">=18",
  "react-native": ">=0.70"
}
```

---

## ⚡ Quick Start

```tsx
import { engine, setTheme } from 'react-native-stylized';

// Set up your theme
setTheme({
  colors: { 
    primary: '#007AFF', 
    background: '#FFFFFF',
    text: '#000000' 
  },
  spacing: { sm: 8, md: 16, lg: 24 },
  borderRadius: { sm: 4, md: 8, lg: 12 },
});

// Create styled components
const Button = engine('TouchableOpacity')
  .style({ 
    padding: 16, 
    borderRadius: 8,
    backgroundColor: '#007AFF',
    alignItems: 'center',
    justifyContent: 'center'
  })
  .when('disabled', { opacity: 0.5 })
  .when('variant:secondary', { backgroundColor: '#5856D6' });

const Container = engine('View', ({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  padding: theme.spacing.md,
}));

const Title = engine('Text', ({ theme }) => ({
  fontSize: 24,
  fontWeight: 'bold',
  color: theme.colors.text,
}));

// Use in your app
export default function App() {
  return (
    <Container>
      <Title>Welcome to React Native Stylish</Title>
      <Button variant="primary">
        <Text style={{ color: 'white' }}>Primary Button</Text>
      </Button>
      <Button variant="secondary">
        <Text style={{ color: 'white' }}>Secondary Button</Text>
      </Button>
    </Container>
  );
}
```

---

## ✨ Features

### 🎨 **Conditional Styling**
Apply styles based on props, platform, or custom conditions without complex ternary operators.

```tsx
const AdaptiveButton = engine('TouchableOpacity')
  .style({ padding: 16, borderRadius: 8 })
  .when('variant:primary', { backgroundColor: '#007AFF' })
  .when('variant:secondary', { backgroundColor: '#5856D6' })
  .when('disabled', { opacity: 0.5 })
  .when('ios', { shadowColor: '#000', shadowOpacity: 0.1 })
  .when('android', { elevation: 4 });
```

### 🌍 **Global Theme System**
No providers required. Set a global theme and access it anywhere in your app.

```tsx
// Set theme once
setTheme({
  colors: { primary: '#007AFF', background: '#FFFFFF' },
  spacing: { md: 16 },
});

// Use anywhere
const ThemedComponent = engine('View', ({ theme }) => ({
  backgroundColor: theme.colors.background,
  padding: theme.spacing.md,
}));
```

### 🔒 **Full TypeScript Support**
Get autocomplete and type safety for your themes and components.

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const Button = engine<ButtonProps>('TouchableOpacity', ({ theme, variant, size, disabled }) => ({
  backgroundColor: disabled ? '#ccc' : theme.colors[variant],
  padding: theme.spacing[size],
  borderRadius: theme.borderRadius.md,
  opacity: disabled ? 0.5 : 1,
}));
```

### ⚡ **Performance Optimized**
Built-in caching and smart updates ensure your app stays fast even with complex styling.

### 📱 **React Native First**
Designed specifically for React Native with support for all built-in components.

---

## � Documentation

### 🚀 [Getting Started](./docs/README.md)
Installation, setup, and basic usage for React Native.

### 📖 [API Reference](./docs/api-reference.md)
Complete API documentation with examples and TypeScript support.

---

## 🔧 Available Components

All standard React Native components are supported:

- `View`, `Text`, `Image`
- `ScrollView`, `FlatList`, `SectionList`
- `TouchableOpacity`, `Pressable`, `TouchableHighlight`, `TouchableWithoutFeedback`
- `TextInput`, `Button`
- `ActivityIndicator`, `Switch`, `Slider`
- `Modal`, `StatusBar`
- `SafeAreaView`, `KeyboardAvoidingView`, `ImageBackground`

---

## 🤝 Community

- [🐛 Report Issues](https://github.com/MichelGutner/stylized/issues)
- [💡 Feature Requests](https://github.com/MichelGutner/stylized/discussions)
- [📖 Full Documentation](./docs/README.md)

---

## 📄 License

MIT © [Michel Gutner]

---

<div align="center">

**Built with ❤️ for the React Native community**

[📚 View Full Documentation](./docs/README.md)

</div>