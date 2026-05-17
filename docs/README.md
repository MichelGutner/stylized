# 📚 React Native Stylish Documentation

Modern styling library for React Native with conditional styling and global theming.

---

## 🚀 Getting Started

### Installation

```bash
npm install react-native-stylized
# or
yarn add react-native-stylized
```

### Basic Setup

```tsx
import { engine, setTheme } from 'react-native-stylized';

// 1. Set up your theme
setTheme({
  colors: { 
    primary: '#007AFF', 
    background: '#FFFFFF',
    text: '#000000'
  },
  spacing: { sm: 8, md: 16, lg: 24 },
  borderRadius: { sm: 4, md: 8, lg: 12 },
});

// 2. Create styled components
const Container = engine('View', ({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
}));

const Button = engine('TouchableOpacity')
  .style(({ theme }) => ({
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center'
  }))
  .when('disabled', { opacity: 0.5 });

const Text = engine('Text', ({ theme }) => ({
  color: theme.colors.text,
  fontSize: 16,
}));

// 3. Use in your components
export default function App() {
  return (
    <Container>
      <Button>
        <Text>Click Me</Text>
      </Button>
    </Container>
  );
}
```

---

## 🎯 Core Concepts

### Engine Function

Create styled React Native components:

```tsx
// Basic usage
const StyledView = engine('View');

// With initial styles
const Container = engine('View', { flex: 1, padding: 16 });

// With theme-aware styles
const ThemedContainer = engine('View', ({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  padding: theme.spacing.md,
}));
```

### Method Chaining

Chain multiple style methods:

```tsx
const Button = engine('TouchableOpacity')
  .style({ padding: 16 })
  .style(({ theme }) => ({
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
  }))
  .when('disabled', { opacity: 0.5 });
```

---

## 🎨 Styling

### Static Styles

```tsx
const Card = engine('View').style({
  backgroundColor: 'white',
  borderRadius: 8,
  padding: 16,
});
```

### Dynamic Styles

```tsx
const ThemedCard = engine('View', ({ theme }) => ({
  backgroundColor: theme.colors.background,
  padding: theme.spacing.md,
}));
```

### Conditional Styling

Apply styles based on props:

```tsx
const Button = engine('TouchableOpacity')
  .style({ padding: 16, borderRadius: 8 })
  .when('variant:primary', { backgroundColor: '#007AFF' })
  .when('variant:secondary', { backgroundColor: '#5856D6' })
  .when('disabled', { opacity: 0.5 });
```

---

## 🌍 Theme System

### Setting Themes

```tsx
setTheme({
  colors: {
    primary: '#007AFF',
    background: '#FFFFFF',
    text: '#000000',
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
  },
});
```

### Updating Themes

```tsx
// Update specific values
setTheme({
  colors: {
    primary: '#FF3B30',
  }
});

// Dark mode toggle
const toggleDarkMode = () => {
  setTheme((prev) => ({
    colors: {
      primary: '#0A84FF',
      background: prev.colors.background === '#FFFFFF' ? '#000000' : '#FFFFFF',
      text: prev.colors.text === '#000000' ? '#FFFFFF' : '#000000',
    }
  }));
};
```

### Accessing Theme

```tsx
import { useTheme } from 'react-native-stylized';

const MyComponent = () => {
  const theme = useTheme();
  return <Text style={{ color: theme.colors.primary }}>Hello</Text>;
};
```

---

## 🔧 Available Components

All standard React Native components are supported:

```tsx
const StyledView = engine('View');
const StyledText = engine('Text');
const StyledTouchableOpacity = engine('TouchableOpacity');
const StyledTextInput = engine('TextInput');
const StyledScrollView = engine('ScrollView');
const StyledFlatList = engine('FlatList');
// ... and more
```

---

## 📱 Quick Example

```tsx
const Button = engine('TouchableOpacity')
  .style(({ theme }) => ({
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
  }))
  .when('disabled', { opacity: 0.5 });

const ButtonText = engine('Text').style({
  color: 'white',
  fontWeight: 'bold',
});

export default function App() {
  return (
    <View style={{ padding: 16 }}>
      <Button>
        <ButtonText>Click Me</ButtonText>
      </Button>
      <Button disabled>
        <ButtonText>Disabled</ButtonText>
      </Button>
    </View>
  );
}
```

---

## 📖 API Reference

For complete API documentation, see [API Reference](./api-reference.md).

---

## License

MIT
