---
title: Interactive Playground
description: Try Stylized in your browser
---

<div align="center">

# 🎮 Interactive Playground

## Try Stylized right now in your browser!

---

### 🎯 Quick Demo

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### 📱 React Native Example

```tsx live
import { engine, setTheme } from 'stylized/react-native';

// Set theme
setTheme({
  colors: { primary: '#007AFF', background: '#FFFFFF', text: '#000000' },
  spacing: { sm: 8, md: 16, lg: 24 },
});

// Create components
const Card = engine.View()`
  ${({ theme }) => ({
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  })}
`;

const Title = engine.Text()`
  ${({ theme }) => ({
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginBottom: 8,
  })}
`;

const Button = engine.TouchableOpacity<{ variant?: 'primary' | 'secondary' }>()`
  ${({ theme, variant = 'primary' }) => ({
    backgroundColor: theme.colors[variant],
    padding: theme.spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  })}
`;

// Usage
export default function Demo() {
  return (
    <Card>
      <Title>Hello Stylized!</Title>
      <Button variant="primary">
        <Text style={{ color: 'white' }}>Press Me</Text>
      </Button>
    </Card>
  );
}
```

</div>

---

### 🌐 React Web Example

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```tsx live
import { engine, setTheme } from 'stylized/react';

// Set theme
setTheme({
  colors: { primary: '#007AFF', background: '#FFFFFF', text: '#000000' },
  spacing: { sm: 8, md: 16, lg: 24 },
});

// Create components
const Card = engine.div()`
  ${({ theme }) => ({
    backgroundColor: theme.colors.background,
    padding: `${theme.spacing.md}px`,
    borderRadius: '12px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    maxWidth: '300px',
  })}
`;

const Title = engine.h1()`
  ${({ theme }) => ({
    fontSize: '24px',
    fontWeight: 'bold',
    color: theme.colors.text,
    margin: '0 0 8px 0',
  })}
`;

const Button = engine.button<{ variant?: 'primary' | 'secondary' }>()`
  ${({ theme, variant = 'primary' }) => ({
    backgroundColor: theme.colors[variant],
    padding: `${theme.spacing.md}px`,
    borderRadius: '8px',
    border: 'none',
    cursor: 'pointer',
    color: 'white',
    fontSize: '16px',
  })}
`;

// Usage
export default function Demo() {
  return (
    <Card>
      <Title>Hello Stylized!</Title>
      <Button variant="primary">Click Me</Button>
    </Card>
  );
}
```

</div>

---

### 🎨 Theme Switching Demo

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```tsx live
import { useState } from 'react';
import { engine, setTheme, useTheme } from 'stylized/react';

const Container = engine.div()`
  ${({ theme }) => ({
    minHeight: '200px',
    padding: '20px',
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    borderRadius: '8px',
    transition: 'all 0.3s ease',
  })}
`;

const ThemeToggle = engine.button()`
  ${({ theme }) => ({
    padding: '10px 20px',
    backgroundColor: theme.colors.primary,
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    marginBottom: '16px',
  })}
`;

export default function ThemeDemo() {
  const [isDark, setIsDark] = useState(false);
  const theme = useTheme();

  const toggleTheme = () => {
    const newTheme = isDark ? {
      colors: { primary: '#007AFF', background: '#FFFFFF', text: '#000000' },
      spacing: { md: 16 },
    } : {
      colors: { primary: '#0A84FF', background: '#1C1C1E', text: '#FFFFFF' },
      spacing: { md: 16 },
    };
    
    setTheme(newTheme);
    setIsDark(!isDark);
  };

  return (
    <Container>
      <ThemeToggle onClick={toggleTheme}>
        Switch to {isDark ? 'Light' : 'Dark'} Mode
      </ThemeToggle>
      <p>Current theme: {isDark ? 'Dark' : 'Light'}</p>
      <p>Primary color: {theme.colors.primary}</p>
    </Container>
  );
}
```

</div>

---

### 🔧 Custom Props Demo

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```tsx live
import { engine } from 'stylized/react';

const Alert = engine.div<{ 
  variant?: 'info' | 'success' | 'warning' | 'error';
  dismissible?: boolean;
}>()`
  ${({ theme, variant = 'info', dismissible = false }) => {
    const colors = {
      info: theme.colors.primary || '#007AFF',
      success: '#34C759',
      warning: '#FF9500',
      error: '#FF3B30',
    };
    
    return {
      padding: '12px 16px',
      backgroundColor: colors[variant],
      color: 'white',
      borderRadius: '8px',
      position: 'relative',
      cursor: dismissible ? 'pointer' : 'default',
      opacity: dismissible ? 0.9 : 1,
      transition: 'opacity 0.2s ease',
    };
  }}
`;

const AlertContent = engine.div()`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export default function AlertDemo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <Alert variant="info">
        <AlertContent>
          ℹ️ This is an info alert
        </AlertContent>
      </Alert>
      
      <Alert variant="success">
        <AlertContent>
          ✅ Success! Operation completed
        </AlertContent>
      </Alert>
      
      <Alert variant="warning" dismissible>
        <AlertContent>
          ⚠️ Warning: Check your settings
        </AlertContent>
      </Alert>
      
      <Alert variant="error">
        <AlertContent>
          🚫 Error: Something went wrong
        </AlertContent>
      </Alert>
    </div>
  );
}
```

</div>

---

### 🎯 Try It Yourself

<div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### 📝 Your Turn

Copy and modify these examples to create your own components:

```tsx
// Start with this template
import { engine, setTheme } from 'stylized/react';

// Define your theme
setTheme({
  colors: {
    primary: '#YOUR_COLOR',
    secondary: '#YOUR_COLOR',
    background: '#YOUR_COLOR',
    text: '#YOUR_COLOR',
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
  },
});

// Create your component
const MyComponent = engine.div<{ 
  // Add your custom props here
}>()`
  ${({ theme }) => ({
    // Add your styles here
  })}
`;

export default function YourDemo() {
  return (
    <MyComponent>
      {/* Your content here */}
    </MyComponent>
  );
}
```

</div>

---

### 🚀 Next Steps

1. **📖 Read the [Getting Started Guide](./getting-started.md)**
2. **🎨 Explore the [Styling Guide](./styling-guide.md)**
3. **🌍 Learn about the [Theme System](./theme-system.md)**
4. **📱 Check available [Components](./components.md)**

---

<div align="center">

[🏠 Back to Documentation](./index.md) | [📚 API Reference](./api-reference.md)

</div>
