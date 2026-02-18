---
title: Theme System
description: Global theming architecture and patterns
---

<div align="center">

# 🌍 Theme System

## Global theming architecture and patterns

---

## 🏗️ Architecture Overview

### Provider-less Design

<div style="background: #e3f2fd; padding: 20px; border-radius: 8px; margin: 20px 0;">

Stylized uses a **provider-less architecture** with React's `useSyncExternalStore` for optimal performance:

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   setTheme()    │───▶│   Global Store    │───▶│  useTheme()     │
│                 │    │                  │    │                 │
│ Updates theme   │    │ Stores theme      │    │ Reactive hook   │
│ globally        │    │ Notifies changes  │    │ Triggers re-render│
└─────────────────┘    └──────────────────┘    └─────────────────┘
```

**Benefits:**
- 🚀 No provider wrapping required
- ⚡ Instant updates across all components
- 🔒 Type-safe theme access
- 📱 Works in any component depth

</div>

---

## 🎨 Theme Structure

### Core Theme Interface

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
declare global {
  export interface EngineTheme {
    // Colors palette
    colors: {
      primary: string;
      secondary: string;
      background: string;
      surface: string;
      text: string;
      textSecondary: string;
      border: string;
      success: string;
      warning: string;
      error: string;
      info: string;
    };
    
    // Spacing system
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      xxl: number;
    };
    
    // Typography scale
    typography: {
      fontFamily: string;
      fontSize: {
        xs: string;
        sm: string;
        md: string;
        lg: string;
        xl: string;
        xxl: string;
      };
      fontWeight: {
        normal: string;
        medium: string;
        semibold: string;
        bold: string;
      };
      lineHeight: {
        tight: number;
        normal: number;
        relaxed: number;
      };
    };
    
    // Border radius
    borderRadius: {
      none: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
      full: number;
    };
    
    // Shadows
    shadows: {
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    
    // Breakpoints (for responsive design)
    breakpoints: {
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
  }
}
```

</div>

### Complete Theme Example

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// themes/light.ts
export const lightTheme: EngineTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#C6C6C8',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#007AFF',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
    xxl: 48,
  },
  typography: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto',
    fontSize: {
      xs: '12px',
      sm: '14px',
      md: '16px',
      lg: '18px',
      xl: '24px',
      xxl: '32px',
    },
    fontWeight: {
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
    },
    lineHeight: {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.8,
    },
  },
  borderRadius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  shadows: {
    sm: '0 1px 2px rgba(0,0,0,0.05)',
    md: '0 2px 4px rgba(0,0,0,0.1)',
    lg: '0 4px 8px rgba(0,0,0,0.15)',
    xl: '0 8px 16px rgba(0,0,0,0.2)',
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
  },
};
```

</div>

---

## 🔄 Theme API Reference

### `setTheme(input)`

Updates the global theme state.

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

<div style="padding: 20px; border: 1px solid #e1e5e9; border-radius: 8px;">

#### Object Form

```typescript
// Replace entire theme
setTheme({
  colors: { primary: '#007AFF' },
  spacing: { md: 16 },
});

// Partial update (deep merge)
setTheme({
  colors: { primary: '#FF3B30' }, // Only updates primary
  // Other theme values remain unchanged
});
```

</div>

<div style="padding: 20px; border: 1px solid #e1e5e9; border-radius: 8px;">

#### Function Form

```typescript
// Access previous theme
setTheme(prev => ({
  ...prev,
  colors: {
    ...prev.colors,
    primary: prev.colors.primary === '#007AFF' 
      ? '#FF3B30' 
      : '#007AFF',
  },
}));

// Complex logic
setTheme(prev => {
  const isDarkMode = prev.colors.background === '#000000';
  return {
    ...prev,
    colors: {
      ...prev.colors,
      primary: isDarkMode ? '#0A84FF' : '#007AFF',
    },
  };
});
```

</div>

</div>

### `useTheme()`

Reactive hook to access current theme.

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// Basic usage
const theme = useTheme();
console.log(theme.colors.primary);

// In styled components
const Component = engine.div()`
  ${({ theme }) => ({
    backgroundColor: theme.colors.background,
    color: theme.colors.text,
    padding: `${theme.spacing.md}px`,
  })}
`;

// With TypeScript
const theme = useTheme<EngineTheme>();
const primaryColor = theme.colors.primary; // Fully typed
```

</div>

### `getTheme()`

Non-reactive theme accessor.

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// For non-React contexts
const currentTheme = getTheme();

// Utility functions
export const getColor = (colorName: keyof EngineTheme['colors']) => {
  const theme = getTheme();
  return theme.colors[colorName];
};

// Server-side rendering
export const getInitialTheme = () => {
  return {
    colors: { primary: '#007AFF' },
    spacing: { md: 16 },
  } as EngineTheme;
};
```

</div>

---

## 🎭 Theme Patterns

### 1. Theme Variants

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// Light theme
export const lightTheme: EngineTheme = {
  colors: {
    primary: '#007AFF',
    background: '#FFFFFF',
    text: '#000000',
    // ... other colors
  },
  // ... other theme properties
};

// Dark theme
export const darkTheme: EngineTheme = {
  colors: {
    primary: '#0A84FF',
    background: '#000000',
    text: '#FFFFFF',
    // ... other colors
  },
  // ... other theme properties
};

// Theme switcher hook
export const useThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState<'light' | 'dark'>('light');
  
  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? darkTheme : lightTheme;
    setTheme(newTheme);
    setCurrentTheme(currentTheme === 'light' ? 'dark' : 'light');
  };
  
  return { currentTheme, toggleTheme };
};
```

</div>

### 2. Brand Themes

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// Base theme
const baseTheme: EngineTheme = {
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    // ... base colors
  },
  // ... other properties
};

// Brand variations
export const brandThemes = {
  apple: {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: '#007AFF',
      secondary: '#5856D6',
    },
  },
  google: {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: '#4285F4',
      secondary: '#EA4335',
    },
  },
  facebook: {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      primary: '#1877F2',
      secondary: '#42B72A',
    },
  },
};

// Brand theme switcher
export const useBrandTheme = (brand: keyof typeof brandThemes) => {
  useEffect(() => {
    setTheme(brandThemes[brand]);
  }, [brand]);
};
```

</div>

### 3. Responsive Themes

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// Responsive theme utilities
export const useResponsiveTheme = () => {
  const [screenSize, setScreenSize] = useState<'sm' | 'md' | 'lg' | 'xl'>('md');
  const theme = useTheme();
  
  useEffect(() => {
    const updateScreenSize = () => {
      const width = window.innerWidth;
      if (width < theme.breakpoints.sm) setScreenSize('sm');
      else if (width < theme.breakpoints.md) setScreenSize('md');
      else if (width < theme.breakpoints.lg) setScreenSize('lg');
      else setScreenSize('xl');
    };
    
    updateScreenSize();
    window.addEventListener('resize', updateScreenSize);
    return () => window.removeEventListener('resize', updateScreenSize);
  }, [theme.breakpoints]);
  
  return { screenSize, theme };
};

// Responsive component
const ResponsiveContainer = engine.div()`
  ${({ theme }) => {
    const width = window.innerWidth;
    const padding = width < theme.breakpoints.md 
      ? theme.spacing.sm 
      : width < theme.breakpoints.lg
        ? theme.spacing.md
        : theme.spacing.lg;
    
    return {
      padding: `${padding}px`,
      maxWidth: width < theme.breakpoints.md 
        ? '100%' 
        : width < theme.breakpoints.lg
          ? '768px'
          : '1024px',
      margin: '0 auto',
    };
  }}
`;
```

</div>

---

## 🎨 Advanced Theme Techniques

### Computed Theme Values

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// Theme with computed values
export const createEnhancedTheme = (baseTheme: EngineTheme): EngineTheme => {
  return {
    ...baseTheme,
    colors: {
      ...baseTheme.colors,
      // Computed colors
      primaryLight: adjustColor(baseTheme.colors.primary, 20),
      primaryDark: adjustColor(baseTheme.colors.primary, -20),
      textInverse: getContrastColor(baseTheme.colors.background),
      surfaceHover: adjustColor(baseTheme.colors.surface, 5),
    },
    spacing: {
      ...baseTheme.spacing,
      // Computed spacing
      container: baseTheme.spacing.lg * 2,
      section: baseTheme.spacing.xl,
    },
    // Computed shadows
    shadows: {
      ...baseTheme.shadows,
      colored: `0 4px 8px ${baseTheme.colors.primary}20`,
    },
  };
};

// Color utilities
const adjustColor = (color: string, amount: number): string => {
  // Implementation for lightening/darkening colors
  return color; // Simplified for example
};

const getContrastColor = (backgroundColor: string): string => {
  // Return black or white based on background
  return '#000000'; // Simplified for example
};
```

</div>

### Theme Composition

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// Theme composition utilities
export const composeThemes = (...themes: Partial<EngineTheme>[]): EngineTheme => {
  return themes.reduce((acc, theme) => deepMerge(acc, theme), {} as EngineTheme);
};

// Usage
const customTheme = composeThemes(
  baseTheme,
  { colors: { primary: '#FF6B6B' } },
  { spacing: { lg: 32 } },
  { typography: { fontSize: { xl: '28px' } } }
);

// Theme overrides
export const createThemeOverride = (overrides: Partial<EngineTheme>) => {
  const currentTheme = getTheme();
  return deepMerge(currentTheme, overrides);
};

// Apply temporary theme
export const useTemporaryTheme = (temporaryTheme: Partial<EngineTheme>) => {
  const originalTheme = useRef(getTheme());
  
  useEffect(() => {
    setTheme(temporaryTheme);
    return () => setTheme(originalTheme.current);
  }, [temporaryTheme]);
};
```

</div>

---

## 🔧 Theme Utilities

### Theme Helpers

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// Color utilities
export const useColorUtils = () => {
  const theme = useTheme();
  
  const getColor = (colorName: keyof EngineTheme['colors']) => 
    theme.colors[colorName];
  
  const getSpacing = (spacingName: keyof EngineTheme['spacing']) => 
    theme.spacing[spacingName];
  
  const getFontSize = (sizeName: keyof EngineTheme['typography']['fontSize']) => 
    theme.typography.fontSize[sizeName];
  
  const getBorderRadius = (radiusName: keyof EngineTheme['borderRadius']) => 
    theme.borderRadius[radiusName];
  
  return {
    getColor,
    getSpacing,
    getFontSize,
    getBorderRadius,
  };
};

// Theme validation
export const validateTheme = (theme: Partial<EngineTheme>): boolean => {
  const requiredKeys = ['colors', 'spacing', 'typography'];
  return requiredKeys.every(key => key in theme);
};

// Theme persistence
export const usePersistedTheme = (key: string = 'stylized-theme') => {
  useEffect(() => {
    // Load theme from localStorage
    const savedTheme = localStorage.getItem(key);
    if (savedTheme) {
      setTheme(JSON.parse(savedTheme));
    }
  }, [key]);
  
  const saveTheme = (theme: EngineTheme) => {
    localStorage.setItem(key, JSON.stringify(theme));
    setTheme(theme);
  };
  
  return { saveTheme };
};
```

</div>

---

## 🎯 Best Practices

### Performance Optimization

<div style="background: #d4edda; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### ✅ Do This

```typescript
// Use stable theme structure
const stableTheme = {
  colors: { primary: '#007AFF' }, // ✅ Consistent keys
  spacing: { md: 16 }, // ✅ Predictable values
};

// Batch theme updates
const updateMultipleThemeValues = () => {
  setTheme({
    colors: { primary: '#newColor', secondary: '#newSecondary' },
    spacing: { md: 20 },
  });
};

// Use useMemo for expensive theme calculations
const expensiveThemeValue = useMemo(() => {
  return calculateExpensiveValue(theme);
}, [theme.colors.primary]);
```

#### ❌ Avoid This

```typescript
// Don't mutate theme directly
const theme = getTheme();
theme.colors.primary = '#newColor'; // ❌ Direct mutation

// Don't create theme objects in render
const Component = () => {
  const theme = { colors: { primary: '#007AFF' } }; // ❌ New object each render
  return <div />;
};

// Don't update theme frequently
setTheme({ colors: { primary: '#color1' } });
setTheme({ colors: { primary: '#color2' } }); // ❌ Multiple updates
```

</div>

### Organization Tips

<div style="background: #d1ecf1; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// themes/
//   ├── index.ts          // Export all themes
//   ├── light.ts          // Light theme
//   ├── dark.ts           // Dark theme
//   ├── brand.ts          // Brand variations
//   └── types.ts          // Theme type definitions

// hooks/
//   ├── useTheme.ts       // Theme hook
//   ├── useThemeSwitcher.ts // Theme switching
//   └── useColorUtils.ts  // Color utilities

// utils/
//   ├── themeHelpers.ts    // Theme utilities
//   ├── colorUtils.ts      // Color manipulation
//   └── validation.ts      // Theme validation
```

</div>

---

## 🎉 Summary

### What you've learned:

- ✅ Provider-less architecture benefits
- ✅ Complete theme structure
- ✅ Theme API reference
- ✅ Theme variants and patterns
- ✅ Advanced theme techniques
- ✅ Theme utilities and helpers
- ✅ Performance best practices

### Ready for more?

<div align="center">

[📱 Components Reference](./components.md) | [⚡ Performance Guide](./performance.md) | [🔄 Migration Guide](./migration.md)

</div>

---

<div align="center">

**Need help?** [Join our Discord](https://discord.gg/stylized) | [Report an Issue](https://github.com/your-repo/stylized/issues)

</div>
