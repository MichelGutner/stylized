---
title: Styling Guide
description: Advanced styling techniques and patterns
---

<div align="center">

# 🎨 Styling Guide

## Advanced styling techniques and best practices

---

## 🎯 Template Literals Deep Dive

### Basic Interpolations

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// Static styles
const Component = engine.div()`
  display: flex;
  padding: 16px;
  background-color: white;
`;

// Theme-based styles
const Component = engine.div()`
  ${({ theme }) => ({
    display: 'flex',
    padding: `${theme.spacing.md}px`,
    backgroundColor: theme.colors.background,
  })}
`;

// Prop-based styles
const Component = engine.div<{ active?: boolean }>()`
  ${({ active }) => ({
    opacity: active ? 1 : 0.5,
  })}
`;
```

</div>

### Advanced Interpolations

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// Multiple interpolations
const Component = engine.div<{ 
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'large';
}>()`
  // Static base styles
  { display: 'flex', alignItems: 'center' }
  
  // Theme-based styles
  ${({ theme }) => ({
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
  })}
  
  // Variant styles
  ${({ theme, variant = 'primary' }) => ({
    borderColor: theme.colors[variant],
    borderWidth: variant === 'primary' ? 2 : 1,
  })}
  
  // Size styles
  ${({ size = 'medium', theme }) => ({
    padding: size === 'small' 
      ? `${theme.spacing.sm}px`
      : size === 'large'
        ? `${theme.spacing.lg}px`
        : `${theme.spacing.md}px`,
  })}
  
  // Complex logic
  ${({ theme, variant, disabled }) => ({
    backgroundColor: disabled
      ? theme.colors.disabled
      : variant === 'primary' && !disabled
        ? theme.colors.primary
        : 'transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
  })}
`;
```

</div>

---

## 🎨 Component Patterns

### 1. Base Component Pattern

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

<div style="padding: 20px; border: 1px solid #e1e5e9; border-radius: 8px;">

#### 📱 React Native

```typescript
// Base button with common styles
const BaseButton = engine.TouchableOpacity()`
  ${({ theme }) => ({
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  })}
`;

// Variant buttons
const PrimaryButton = engine(BaseButton)`
  ${({ theme }) => ({
    backgroundColor: theme.colors.primary,
  })}
`;

const SecondaryButton = engine(BaseButton)`
  ${({ theme }) => ({
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary,
  })}
`;
```

</div>

<div style="padding: 20px; border: 1px solid #e1e5e9; border-radius: 8px;">

#### 🌐 React Web

```typescript
// Base button with common styles
const BaseButton = engine.button()`
  ${({ theme }) => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '8px',
    padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
    border: 'none',
    cursor: 'pointer',
    fontFamily: 'inherit',
  })}
`;

// Variant buttons
const PrimaryButton = engine(BaseButton)`
  ${({ theme }) => ({
    backgroundColor: theme.colors.primary,
    color: 'white',
  })}
`;

const SecondaryButton = engine(BaseButton)`
  ${({ theme }) => ({
    backgroundColor: 'transparent',
    color: theme.colors.primary,
    border: `1px solid ${theme.colors.primary}`,
  })}
`;
```

</div>

</div>

### 2. Compound Component Pattern

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// Card container
const Card = engine.div()`
  ${({ theme }) => ({
    backgroundColor: theme.colors.background,
    borderRadius: '12px',
    padding: `${theme.spacing.lg}px`,
    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
  })}
`;

// Card header
const CardHeader = engine.div()`
  ${({ theme }) => ({
    marginBottom: `${theme.spacing.md}px`,
    paddingBottom: `${theme.spacing.md}px`,
    borderBottom: `1px solid ${theme.colors.border}`,
  })}
`;

// Card title
const CardTitle = engine.h3()`
  ${({ theme }) => ({
    margin: 0,
    fontSize: '18px',
    fontWeight: '600',
    color: theme.colors.text,
  })}
`;

// Card content
const CardContent = engine.div()`
  ${({ theme }) => ({
    color: theme.colors.text,
    lineHeight: 1.6,
  })}
`;

// Usage
const MyCard = () => (
  <Card>
    <CardHeader>
      <CardTitle>Card Title</CardTitle>
    </CardHeader>
    <CardContent>
      Card content goes here...
    </CardContent>
  </Card>
);
```

</div>

### 3. Responsive Design Pattern

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// Responsive container
const ResponsiveContainer = engine.div<{ 
  breakpoint?: 'sm' | 'md' | 'lg' | 'xl';
}>()`
  ${({ breakpoint = 'md', theme }) => {
    const spacing = {
      sm: theme.spacing.sm,
      md: theme.spacing.md,
      lg: theme.spacing.lg,
      xl: theme.spacing.xl,
    };
    
    return {
      padding: `${spacing[breakpoint]}px`,
      maxWidth: breakpoint === 'sm' ? '100%' : 
                breakpoint === 'md' ? '768px' :
                breakpoint === 'lg' ? '1024px' : '1280px',
      margin: '0 auto',
    };
  }}
`;

// Responsive grid
const Grid = engine.div<{ 
  columns?: 1 | 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
}>()`
  ${({ columns = 2, gap = 'md', theme }) => ({
    display: 'grid',
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gap: theme.spacing[gap],
  })}
`;

// Responsive text
const ResponsiveText = engine.p<{ 
  size?: 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}>()`
  ${({ size = 'md', weight = 'normal', theme }) => ({
    fontSize: size === 'sm' ? '14px' :
              size === 'md' ? '16px' :
              size === 'lg' ? '18px' : '24px',
    fontWeight: weight === 'normal' ? '400' :
                weight === 'medium' ? '500' :
                weight === 'semibold' ? '600' : '700',
    color: theme.colors.text,
    margin: 0,
  })}
`;
```

</div>

---

## 🎭 Animation & Transitions

### CSS Animations (React Web)

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// Fade in animation
const FadeIn = engine.div<{ 
  show?: boolean;
  duration?: number;
}>()`
  ${({ show = true, duration = 300 }) => ({
    opacity: show ? 1 : 0,
    transition: `opacity ${duration}ms ease-in-out`,
  })}
`;

// Slide animation
const SlideIn = engine.div<{ 
  direction?: 'up' | 'down' | 'left' | 'right';
  show?: boolean;
}>()`
  ${({ direction = 'up', show = true }) => {
    const transforms = {
      up: 'translateY(20px)',
      down: 'translateY(-20px)',
      left: 'translateX(20px)',
      right: 'translateX(-20px)',
    };
    
    return {
      transform: show ? 'translate(0, 0)' : transforms[direction],
      transition: 'transform 300ms ease-out',
    };
  }}
`;

// Hover effects
const HoverCard = engine.div()`
  ${({ theme }) => ({
    backgroundColor: theme.colors.background,
    padding: '20px',
    borderRadius: '8px',
    transition: 'all 200ms ease',
    cursor: 'pointer',
  })}
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: '0 4px 12px rgba(0,0,0,0.15)',
  }
`;
```

</div>

### React Native Animations

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
import { Animated } from 'react-native';

// Animated container
const AnimatedContainer = engine(Animated.View)<{
  animatedValue: Animated.Value;
}>()`
  ${({ animatedValue }) => ({
    opacity: animatedValue,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  })}
`;

// Usage with animation hook
const useFadeInAnimation = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);
  
  return fadeAnim;
};

const FadeInComponent = () => {
  const fadeAnim = useFadeInAnimation();
  
  return (
    <AnimatedContainer animatedValue={fadeAnim}>
      <Text>Fades in!</Text>
    </AnimatedContainer>
  );
};
```

</div>

---

## 🎨 Advanced Theme Techniques

### Theme Extensions

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// Extended theme with computed values
declare global {
  export interface EngineTheme {
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
      // Computed colors
      primaryLight: string;
      primaryDark: string;
      textInverse: string;
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      // Computed spacing
      container: number;
    };
    shadows: {
      sm: string;
      md: string;
      lg: string;
    };
    borders: {
      radius: {
        sm: number;
        md: number;
        lg: number;
        full: number;
      };
      width: {
        thin: number;
        normal: number;
        thick: number;
      };
    };
  }
}

// Theme with computed values
const enhancedTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    text: '#000000',
    // Computed
    primaryLight: '#5AC8FA',
    primaryDark: '#0051D5',
    textInverse: '#FFFFFF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    // Computed
    container: 24,
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 2px 4px rgba(0,0,0,0.1)',
    lg: '0 4px 8px rgba(0,0,0,0.15)',
  },
  borders: {
    radius: {
      sm: 4,
      md: 8,
      lg: 12,
      full: 9999,
    },
    width: {
      thin: 1,
      normal: 2,
      thick: 4,
    },
  },
};
```

</div>

### Theme Variants

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// Light theme
const lightTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#C6C6C8',
  },
  // ... rest of theme
};

// Dark theme
const darkTheme = {
  colors: {
    primary: '#0A84FF',
    secondary: '#5E5CE6',
    background: '#000000',
    surface: '#1C1C1E',
    text: '#FFFFFF',
    textSecondary: '#8E8E93',
    border: '#38383A',
  },
  // ... rest of theme
};

// Theme switching hook
const useThemeSwitcher = () => {
  const [isDark, setIsDark] = useState(false);
  
  const toggleTheme = () => {
    const newTheme = isDark ? lightTheme : darkTheme;
    setTheme(newTheme);
    setIsDark(!isDark);
  };
  
  return { isDark, toggleTheme };
};
```

</div>

---

## 🔧 Utility Patterns

### Style Utilities

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// Flex utilities
const Flex = engine.div<{
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
  wrap?: 'nowrap' | 'wrap';
  gap?: number;
}>()`
  ${({ direction = 'row', align = 'start', justify = 'start', wrap = 'nowrap', gap = 0, theme }) => ({
    display: 'flex',
    flexDirection: direction,
    alignItems: align === 'start' ? 'flex-start' :
                align === 'center' ? 'center' :
                align === 'end' ? 'flex-end' : 'stretch',
    justifyContent: justify === 'start' ? 'flex-start' :
                    justify === 'center' ? 'center' :
                    justify === 'end' ? 'flex-end' :
                    justify === 'between' ? 'space-between' :
                    justify === 'around' ? 'space-around' : 'flex-start',
    flexWrap: wrap,
    gap: `${gap}px`,
  })}
`;

// Spacing utilities
const Spacer = engine.div<{ size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' }>()`
  ${({ size = 'md', theme }) => ({
    height: theme.spacing[size],
    width: theme.spacing[size],
  })}
`;

// Text utilities
const Text = engine.p<{
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: keyof EngineTheme['colors'];
  align?: 'left' | 'center' | 'right';
}>()`
  ${({ size = 'md', weight = 'normal', color, align = 'left', theme }) => ({
    fontSize: size === 'xs' ? '12px' :
              size === 'sm' ? '14px' :
              size === 'md' ? '16px' :
              size === 'lg' ? '18px' : '24px',
    fontWeight: weight === 'normal' ? '400' :
                weight === 'medium' ? '500' :
                weight === 'semibold' ? '600' : '700',
    color: color ? theme.colors[color] : theme.colors.text,
    textAlign: align,
    margin: 0,
  })}
`;
```

</div>

---

## 🎯 Best Practices

### Performance Tips

<div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### ✅ Do This

```typescript
// Memoize complex calculations
const expensiveStyle = useMemo(() => ({
  transform: `rotate(${calculateRotation(angle)}deg)`,
}), [angle]);

const Component = engine.div<{ angle: number }>()`
  ${({ theme, angle }) => ({
    // Use simple calculations in template
    transform: `rotate(${angle}deg)`,
  })}
`;

// Use stable theme structure
const stableTheme = {
  colors: { primary: '#007AFF' }, // ✅ Stable keys
  spacing: { md: 16 }, // ✅ Consistent naming
};
```

#### ❌ Avoid This

```typescript
// Don't create functions in render
const Component = engine.div()`
  ${({ theme }) => {
    // ❌ Function created on every render
    const getColor = () => theme.colors.primary;
    return { color: getColor() };
  }}
`;

// Don't mutate theme
setTheme(prev => {
  prev.colors.primary = '#newColor'; // ❌ Mutation
  return prev;
});
```

</div>

### Organization Tips

<div style="background: #d1ecf1; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// Organize components by feature
// components/ui/
export const Button = engine.button()`
  ${({ theme }) => ({ /* base styles */ })}
`;

export const Input = engine.input()`
  ${({ theme }) => ({ /* base styles */ })}
`;

// components/forms/
export const FormField = engine.div()`
  ${({ theme }) => ({ /* form-specific styles */ })}
`;

// components/layout/
export const Container = engine.div()`
  ${({ theme }) => ({ /* layout styles */ })}
`;

// Use index files for clean imports
// components/ui/index.ts
export { Button } from './Button';
export { Input } from './Input';
```

</div>

---

## 🎉 Summary

### What you've learned:

- ✅ Advanced template literal techniques
- ✅ Component composition patterns
- ✅ Responsive design strategies
- ✅ Animation and transitions
- ✅ Theme extension methods
- ✅ Utility component creation
- ✅ Performance best practices

### Ready for more?

<div align="center">

[🌍 Explore Theme System](./theme-system.md) | [📱 Components Reference](./components.md) | [⚡ Performance Guide](./performance.md)

</div>

---

<div align="center">

**Need help?** [Join our Discord](https://discord.gg/stylized) | [Report an Issue](https://github.com/your-repo/stylized/issues)

</div>
