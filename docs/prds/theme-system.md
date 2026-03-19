# PRD: Theme System

## 1. Overview

The Theme System provides a centralized, reactive theme management solution for React Native applications. It enables global theme configuration, dynamic theme updates, and seamless integration with styled components without requiring provider components.

## 2. Problem Statement

React Native applications face several theming challenges:

- **Provider complexity**: Most solutions require wrapping apps in theme providers
- **Static themes**: Limited support for dynamic theme switching
- **Deep merging**: Manual theme merging is error-prone
- **Type safety**: Poor TypeScript integration for theme values
- **Performance**: Inefficient theme updates and subscriptions
- **Accessibility**: Limited support for system-level theme preferences

## 3. Goals & Non-Goals

### Goals
- Provide provider-less theme management
- Enable reactive theme updates across all components
- Support deep theme merging and partial updates
- Ensure full TypeScript support with type inference
- Optimize performance with efficient subscription management
- Support system-level theme detection (dark/light mode)

### Non-Goals
- CSS variable support (not applicable to React Native)
- Theme persistence (delegated to app-level storage)
- Theme validation (handled by TypeScript)
- Server-side rendering theme management

## 4. Features

### MVP Features
- **Global Theme Store**: Centralized theme state management
- **Reactive Updates**: Automatic component re-renders on theme changes
- **Deep Merging**: Intelligent theme property merging
- **Type Safety**: Full TypeScript integration
- **Hook Integration**: `useTheme` hook for React components
- **Non-reactive Access**: `getTheme` for utility functions

### Future Improvements
- **Theme Persistence**: Automatic theme saving and loading
- **System Theme Detection**: Automatic dark/light mode switching
- **Theme Presets**: Pre-built theme configurations
- **Theme Validation**: Runtime theme property validation
- **Theme Debugging**: Development tools for theme inspection
- **Multi-theme Support**: Switch between multiple theme configurations

## 5. User Stories

### As a React Native developer, I want to:
- Set a global theme without provider components
- Update theme values and see changes across all components
- Access theme values in styled components automatically
- Use TypeScript with full autocomplete for theme properties
- Create theme variants (light/dark mode) easily
- Persist user theme preferences

### As a designer, I want to:
- Define consistent color palettes and spacing scales
- Create theme variants for different contexts
- Ensure theme values are used consistently across the app
- Preview theme changes in real-time

### As a user, I want to:
- Switch between light and dark themes
- Have my theme preference remembered
- See consistent styling throughout the app
- Benefit from accessibility improvements (high contrast, etc.)

## 6. Technical Requirements

### React Native Compatibility
- Support React 18+ hooks system
- Work with React Native 0.70+
- Compatible with Expo managed workflow
- Support for Metro bundler

### TypeScript Support
- Extensible `EngineTheme` interface
- Type-safe theme updates
- Autocomplete for theme properties
- Generic type preservation

### Performance Requirements
- Efficient subscription management
- Minimal re-renders on theme changes
- Optimized deep merging algorithms
- Memory-efficient theme storage

## 7. API Design

### Core Theme Functions

```typescript
// Set theme with deep merging
function setTheme<T extends Partial<EngineTheme>>(
  input: T | ((prev: EngineTheme) => T)
): EngineTheme

// Reactive theme access
function useTheme(): EngineTheme

// Non-reactive theme access
function getTheme(): EngineTheme
```

### Theme Store Interface

```typescript
interface ThemeStore {
  getSnapshot(): EngineTheme;
  subscribe(listener: () => void): () => void;
}
```

### Usage Examples

```typescript
// Initial theme setup
setTheme({
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
  },
  spacing: {
    xs: 4, sm: 8, md: 16, lg: 24, xl: 32,
  },
  borderRadius: {
    sm: 4, md: 8, lg: 12, xl: 16,
  },
});

// Partial updates with deep merging
setTheme({
  colors: {
    primary: '#FF3B30', // Only primary changes
  }
});

// Functional updates for dynamic theming
setTheme((prevTheme) => ({
  colors: {
    ...prevTheme.colors,
    primary: prevTheme.colors.primary === '#007AFF' ? '#FF3B30' : '#007AFF',
  },
}));

// Dark mode toggle
const toggleDarkMode = () => {
  setTheme((prev) => ({
    colors: {
      primary: '#0A84FF',
      background: prev.colors.background === '#FFFFFF' ? '#000000' : '#FFFFFF',
      text: prev.colors.text === '#000000' ? '#FFFFFF' : '#000000',
    },
  }));
};

// Using theme in components
const ThemedComponent = () => {
  const theme = useTheme();
  return (
    <View style={{ backgroundColor: theme.colors.background }}>
      <Text style={{ color: theme.colors.text }}>Themed content</Text>
    </View>
  );
};

// Using theme in styled components
const StyledButton = engine('TouchableOpacity', ({ theme }) => ({
  backgroundColor: theme.colors.primary,
  padding: theme.spacing.md,
  borderRadius: theme.borderRadius.md,
}));

// Non-reactive access
const logTheme = () => {
  const theme = getTheme();
  console.log('Current theme:', theme.colors.primary);
};
```

### Theme Type Definition

```typescript
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
    };
    spacing: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    borderRadius: {
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    typography: {
      fontSize: {
        xs: number;
        sm: number;
        md: number;
        lg: number;
        xl: number;
      };
      fontWeight: {
        normal: FontWeight;
        medium: FontWeight;
        bold: FontWeight;
      };
    };
  }
}
```

## 8. Architecture Notes

### Separation of Concerns

1. **Theme Store**: Centralized state management with subscription system
2. **Deep Merger**: Intelligent theme property merging logic
3. **Type System**: TypeScript interface extension and validation
4. **Hook Integration**: React hooks for reactive theme access
5. **Subscription Manager**: Efficient listener management and cleanup

### Data Flow

```
setTheme() → Deep Merge → Theme Store Update → Subscriber Notifications → Component Re-renders
```

### Key Components

- **ThemeStore**: Core state management with external store interface
- **DeepMerger**: Recursive theme property merging
- **SubscriptionManager**: Efficient listener subscription system
- **ThemeHook**: React hook integration with useSyncExternalStore
- **TypeExtensions**: Global TypeScript interface definitions

### Performance Optimizations

- **Shallow Comparison**: Detect actual theme changes before notifications
- **Selective Updates**: Only notify subscribers of relevant changes
- **Memoization**: Cache merged theme objects
- **Efficient Subscriptions**: Use React's useSyncExternalStore for optimal performance

## 9. Edge Cases

### Theme Update Edge Cases
- **Circular references**: Handle circular object references in theme updates
- **Invalid theme values**: Gracefully handle undefined/null theme properties
- **Large theme objects**: Optimize performance for complex theme structures
- **Frequent updates**: Handle rapid theme changes efficiently

### Subscription Edge Cases
- **Memory leaks**: Prevent memory accumulation from unsubscribed listeners
- **Component unmounting**: Clean up subscriptions on component unmount
- **Nested subscriptions**: Handle multiple subscriptions from same component
- **Subscription order**: Ensure consistent notification order

### Type Safety Edge Cases
- **Missing theme properties**: Handle undefined theme values gracefully
- **Type mutations**: Prevent accidental theme type modifications
- **Generic types**: Preserve generic type information in theme updates
- **Runtime validation**: Handle type mismatches at runtime

## 10. Implementation Plan

### Phase 1: Core Theme Store (Week 1-2)
- [ ] Implement basic theme store with external store interface
- [ ] Add `setTheme` and `getTheme` functions
- [ ] Create deep merging algorithm
- [ ] Add basic TypeScript support

### Phase 2: React Integration (Week 2-3)
- [ ] Implement `useTheme` hook with useSyncExternalStore
- [ ] Add subscription management system
- [ ] Optimize re-render performance
- [ ] Add comprehensive error handling

### Phase 3: Advanced Features (Week 3-4)
- [ ] Implement functional theme updates
- [ ] Add theme change detection optimizations
- [ ] Improve TypeScript integration
- [ ] Add theme validation helpers

### Phase 4: Performance & Polish (Week 4-5)
- [ ] Optimize deep merging performance
- [ ] Add subscription cleanup mechanisms
- [ ] Implement memory leak prevention
- [ ] Add comprehensive testing

### Phase 5: Documentation & Examples (Week 5-6)
- [ ] Write comprehensive theme system documentation
- [ ] Create theme configuration examples
- [ ] Add best practices guide
- [ ] Performance benchmarks and optimization guide

## Success Metrics

### Technical Metrics
- **Performance**: < 1ms for theme updates and notifications
- **Memory usage**: < 1MB for typical theme configurations
- **Type coverage**: 100% TypeScript coverage for theme types
- **Test coverage**: > 95% code coverage

### User Experience Metrics
- **Developer productivity**: Reduced boilerplate for theme management
- **Type safety**: Compile-time error prevention for theme usage
- **Documentation quality**: Clear examples and comprehensive guides
- **Error messages**: Helpful debugging information for theme issues

### Compatibility Metrics
- **React versions**: Support React 18+ with full hook compatibility
- **TypeScript versions**: Support 4.5+ with full type inference
- **Platform support**: Consistent behavior across iOS and Android
- **Bundle size**: < 5KB gzipped for theme system

---

## Dependencies

### Internal Dependencies
- Core Styling Engine (for theme integration)
- Performance Optimization (for caching)

### External Dependencies
- React 18+ (for hooks and external store API)
- TypeScript 4.5+ (for type safety)

### Development Dependencies
- Jest for testing
- TypeScript for type checking
- React testing library for hook testing

## Security Considerations

### Theme Injection
- Validate theme updates to prevent malicious property injection
- Sanitize theme values to prevent code execution
- Implement runtime type checking for critical theme properties

### Data Privacy
- Ensure theme data doesn't contain sensitive information
- Implement secure theme persistence if implemented
- Consider theme data in security audits

## Accessibility Considerations

### High Contrast Support
- Support high contrast theme variants
- Ensure sufficient color contrast ratios
- Provide accessibility-focused theme presets

### System Theme Integration
- Detect system-level dark/light mode preferences
- Respect user accessibility settings
- Provide automatic theme switching based on system preferences
