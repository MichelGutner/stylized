---
title: Getting Started
description: Installation and basic usage guide
---

<div align="center">

# 🚀 Getting Started

## Quick installation and setup guide

---

## 📦 Installation

### Choose your platform

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

<div style="padding: 20px; border: 2px solid #007AFF; border-radius: 8px; background: #f0f8ff;">

#### 📱 React Native

```bash
npm install stylized
# or
yarn add stylized
```

```tsx
import { engine, setTheme } from 'stylized/react-native';
```

</div>

<div style="padding: 20px; border: 2px solid #34C759; border-radius: 8px; background: #f0fff0;">

#### 🌐 React Web

```bash
npm install stylized
# or
yarn add stylized
```

```tsx
import { engine, setTheme } from 'stylized/react';
```

</div>

</div>

---

## ⚡ Quick Setup

### Step 1: Define Your Theme

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// theme.ts
export const myTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    text: '#000000',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  typography: {
    h1: { fontSize: 32, fontWeight: 'bold' },
    h2: { fontSize: 24, fontWeight: '600' },
    body: { fontSize: 16, lineHeight: 24 },
  },
};
```

</div>

### Step 2: Set Global Theme

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// App.tsx (React Native)
import { setTheme } from 'stylized/react-native';
import { myTheme } from './theme';

setTheme(myTheme);

// App.tsx (React Web)
import { setTheme } from 'stylized/react';
import { myTheme } from './theme';

setTheme(myTheme);
```

</div>

### Step 3: Create Your First Component

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

<div style="padding: 20px; border: 1px solid #e1e5e9; border-radius: 8px;">

#### 📱 React Native

```tsx
import { engine } from 'stylized/react-native';

const Container = engine.View()`
  ${({ theme }) => ({
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  })}
`;

const Title = engine.Text()`
  ${({ theme }) => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
  })}
`;
```

</div>

<div style="padding: 20px; border: 1px solid #e1e5e9; border-radius: 8px;">

#### 🌐 React Web

```tsx
import { engine } from 'stylized/react';

const Container = engine.div()`
  ${({ theme }) => ({
    minHeight: '100vh',
    backgroundColor: theme.colors.background,
    padding: `${theme.spacing.md}px`,
  })}
`;

const Title = engine.h1()`
  ${({ theme }) => ({
    fontSize: '24px',
    fontWeight: 'bold',
    color: theme.colors.text,
  })}
`;
```

</div>

</div>

---

## 🎯 Your First App

### Complete Example

<div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### 📱 React Native App

```tsx
// App.tsx
import React from 'react';
import { engine, setTheme } from 'stylized/react-native';

// Set theme
setTheme({
  colors: { primary: '#007AFF', background: '#FFFFFF', text: '#000000' },
  spacing: { sm: 8, md: 16, lg: 24 },
});

// Create components
const Container = engine.View()`
  ${({ theme }) => ({
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.lg,
    alignItems: 'center',
  })}
`;

const Card = engine.View()`
  ${({ theme }) => ({
    backgroundColor: '#f8f9fa',
    padding: theme.spacing.lg,
    borderRadius: 12,
    width: '100%',
    alignItems: 'center',
  })}
`;

const Title = engine.Text()`
  ${({ theme }) => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: theme.spacing.md,
  })}
`;

const Button = engine.TouchableOpacity()`
  ${({ theme }) => ({
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: 8,
  })}
`;

const ButtonText = engine.Text()`
  ${({ theme }) => ({
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  })}
`;

export default function App() {
  return (
    <Container>
      <Card>
        <Title>Welcome to Stylized! 🎨</Title>
        <Button>
          <ButtonText>Get Started</ButtonText>
        </Button>
      </Card>
    </Container>
  );
}
```

</div>

<div style="background: #e8f5e8; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### 🌐 React Web App

```tsx
// App.tsx
import React from 'react';
import { engine, setTheme } from 'stylized/react';

// Set theme
setTheme({
  colors: { primary: '#007AFF', background: '#FFFFFF', text: '#000000' },
  spacing: { sm: 8, md: 16, lg: 24 },
});

// Create components
const Container = engine.div()`
  ${({ theme }) => ({
    minHeight: '100vh',
    backgroundColor: theme.colors.background,
    padding: `${theme.spacing.lg}px`,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  })}
`;

const Card = engine.div()`
  ${({ theme }) => ({
    backgroundColor: '#f8f9fa',
    padding: `${theme.spacing.lg}px`,
    borderRadius: '12px',
    maxWidth: '400px',
    width: '100%',
    textAlign: 'center',
  })}
`;

const Title = engine.h1()`
  ${({ theme }) => ({
    fontSize: '24px',
    fontWeight: 'bold',
    color: theme.colors.text,
    margin: `0 0 ${theme.spacing.md}px 0`,
  })}
`;

const Button = engine.button()`
  ${({ theme }) => ({
    backgroundColor: theme.colors.primary,
    padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    fontSize: '16px',
    fontWeight: '600',
  })}
`;

export default function App() {
  return (
    <Container>
      <Card>
        <Title>Welcome to Stylized! 🎨</Title>
        <Button>Get Started</Button>
      </Card>
    </Container>
  );
}
```

</div>

---

## 🔧 TypeScript Setup

### Define Your Theme Type

<div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// types.d.ts
declare global {
  export interface EngineTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      success: string;
      warning: string;
      error: string;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    typography: {
      h1: { fontSize: number; fontWeight: string };
      h2: { fontSize: number; fontWeight: string };
      body: { fontSize: number; lineHeight: number };
    };
  }
}

export {};
```

</div>

### Type-Safe Components

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// Type-safe component with custom props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'success';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onPress?: () => void;
}

const Button = engine.TouchableOpacity<ButtonProps>()`
  ${({ theme, variant = 'primary', size = 'medium', disabled }) => ({
    backgroundColor: disabled 
      ? '#ccc' 
      : theme.colors[variant],
    opacity: disabled ? 0.5 : 1,
    padding: size === 'small' 
      ? theme.spacing.sm 
      : size === 'large' 
        ? theme.spacing.lg 
        : theme.spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  })}
`;
```

</div>

---

## 🎨 Next Steps

### What to Learn Next

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

<div style="padding: 20px; border: 1px solid #e1e5e9; border-radius: 8px;">

#### 📚 Recommended Reading

1. **[Styling Guide](./styling-guide.md)** - Advanced styling techniques
2. **[Theme System](./theme-system.md)** - Deep dive into theming
3. **[Components Reference](./components.md)** - All available components
4. **[Performance Guide](./performance.md)** - Optimization tips

</div>

<div style="padding: 20px; border: 1px solid #e1e5e9; border-radius: 8px;">

#### 🎯 Practice Ideas

1. **Create a Button System** - Multiple variants and sizes
2. **Build a Card Component** - With shadows and borders
3. **Make a Form** - Input fields and labels
4. **Design a Layout** - Header, content, footer

</div>

</div>

---

## 🆘 Common Issues

### Troubleshooting

<div style="background: #f8d7da; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### ❌ Theme not updating?

```typescript
// Make sure to use useTheme() hook
const theme = useTheme(); // ✅ Reactive

// Not this
const theme = getTheme(); // ❌ Not reactive
```

#### ❌ TypeScript errors?

```typescript
// Make sure your theme types are declared globally
declare global {
  export interface EngineTheme {
    // Your theme interface
  }
}
```

#### ❌ Styles not applying?

```typescript
// Check your theme structure
setTheme({
  colors: { primary: '#007AFF' }, // ✅ Correct
  // color: { primary: '#007AFF' }, // ❌ Wrong key
});
```

</div>

---

## 🎉 Congratulations!

You've successfully set up Stylized! 🎨

### What you've learned:

- ✅ Installation for React Native and React Web
- ✅ Theme setup and configuration
- ✅ Creating styled components
- ✅ TypeScript integration
- ✅ Basic component patterns

### Ready for more?

<div align="center">

[🎮 Try the Playground](./playground.md) | [📨 Read Styling Guide](./styling-guide.md) | [🌍 Explore Theme System](./theme-system.md)

</div>

---

<div align="center">

**Need help?** [Join our Discord](https://discord.gg/stylized) | [Report an Issue](https://github.com/your-repo/stylized/issues)

</div>
