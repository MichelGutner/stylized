# PRD: Core Styling Engine

## 1. Overview

The Core Styling Engine is the foundational module responsible for creating styled React Native components with method chaining capabilities. It provides the primary `engine` function that transforms standard React Native components into stylable components with conditional styling, theme integration, and performance optimization.

## 2. Problem Statement

React Native developers currently face several challenges with styling:

- **StyleSheet limitations**: Static styles require manual merging and conditional logic
- **Inline styling**: Performance issues and lack of reusability
- **Third-party solutions**: Either too complex (styled-components) or too simple
- **Type safety**: Poor TypeScript integration and autocomplete
- **Conditional styling**: Complex ternary operators and manual prop handling

## 3. Goals & Non-Goals

### Goals
- Provide a simple, intuitive API for creating styled components
- Enable method chaining for clean, readable styling syntax
- Ensure full TypeScript support with type inference
- Integrate seamlessly with the theme system
- Optimize performance through intelligent caching
- Support all React Native components out of the box

### Non-Goals
- CSS-in-JS syntax or template literals
- Web platform support (React Native only)
- Animation-specific styling utilities
- CSS preprocessors or vendor prefixes

## 4. Features

### MVP Features
- **Engine Function**: Create styled components from React Native components
- **Method Chaining**: Support for `.style()`, `.when()`, and `.attrs()` methods
- **Static Styles**: Apply fixed styles to components
- **Function Styles**: Theme-aware dynamic styling
- **Component Support**: All standard React Native components
- **TypeScript Integration**: Full type safety and inference

### Future Improvements
- **Style Composition**: Inherit and extend existing styled components
- **Style Variants**: Predefined style variations
- **Responsive Utilities**: Breakpoint-based styling
- **Style Debugging**: Development tools for style inspection
- **Plugin System**: Extensible style processors

## 5. User Stories

### As a React Native developer, I want to:
- Create styled components with minimal boilerplate
- Apply conditional styles without complex ternary operators
- Use TypeScript with full autocomplete for props and styles
- Chain multiple styling methods for readability
- Access theme values in my style functions
- Style any React Native component including custom ones

### As a designer/developer, I want to:
- Create consistent styling patterns across the app
- Define reusable style variants
- Apply platform-specific styles easily
- Debug styling issues in development

### As a team lead, I want to:
- Enforce consistent styling patterns
- Ensure type safety across the codebase
- Optimize performance for styling operations
- Maintain clean, readable styling code

## 6. Technical Requirements

### React Native Compatibility
- Support React Native 0.70+
- Support React 18+
- Compatible with Expo managed workflow
- Support for all React Native core components

### TypeScript Support
- Full type inference for component props
- Generic type parameters for custom props
- Type-safe theme integration
- Autocomplete for style properties

### Performance Requirements
- Minimal re-renders for style changes
- Efficient style caching and memoization
- Optimized conditional style evaluation
- Low memory footprint

## 7. API Design

### Core Engine Function

```typescript
function engine<T extends React.ComponentType<any>, P extends object = {}>(
  component: T | string,
  style?: StyleFunction<T, P>
): EngineComponent<T, P>
```

### Method Chaining API

```typescript
interface EngineComponent<T, P> {
  style(styleOrFn: StyleObject | StyleFunction<T, P>): EngineComponent<T, P>;
  when(condition: Condition<P>, attrs: ConditionalAttrs<T, P>): EngineComponent<T, P>;
  attrs(attrs: AttrsObject<T, P> | AttrsFunction<T, P>): EngineComponent<T, P>;
  extend(): EngineComponent<T, P>;
}
```

### Usage Examples

```typescript
// Basic usage
const Button = engine('TouchableOpacity')
  .style({ padding: 16, borderRadius: 8 })
  .when('variant:primary', { backgroundColor: '#007AFF' })
  .when('disabled', { opacity: 0.5 });

// With TypeScript props
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const TypedButton = engine<ButtonProps>('TouchableOpacity', ({ theme, variant, size, disabled }) => ({
  backgroundColor: disabled ? theme.colors.disabled : theme.colors[variant],
  padding: theme.spacing[size],
  borderRadius: theme.borderRadius.md,
}));

// Custom component
const StyledCard = engine(CustomCard, ({ theme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: theme.borderRadius.md,
  padding: theme.spacing.md,
}));
```

## 8. Architecture Notes

### Separation of Concerns

1. **Engine Core**: Main styling logic and method chaining
2. **Style Processor**: Handle style resolution and merging
3. **Condition Evaluator**: Process conditional styling logic
4. **Component Factory**: Create React components with applied styles
5. **Type System**: TypeScript integration and type inference

### Data Flow

```
Component Definition → Style Processing → Condition Evaluation → Style Merging → React Component
```

### Key Components

- **StylizedBuilder**: Internal builder for method chaining
- **StyleResolver**: Resolves style functions and merges styles
- **ConditionMatcher**: Evaluates conditional styling
- **ComponentFactory**: Creates final React components
- **TypeHelpers**: TypeScript type utilities

## 9. Edge Cases

### Component Edge Cases
- **Invalid component names**: Handle unknown component names gracefully
- **Custom components**: Support any React component, not just built-ins
- **Forward refs**: Preserve ref forwarding for styled components
- **Static properties**: Maintain static properties of original components

### Styling Edge Cases
- **Conflicting styles**: Handle style property conflicts with proper precedence
- **Invalid style values**: Validate and handle invalid style properties
- **Deep style objects**: Support nested style objects and arrays
- **Platform differences**: Handle platform-specific style properties

### Performance Edge Cases
- **Large component trees**: Optimize for complex styling hierarchies
- **Frequent updates**: Handle rapid style changes efficiently
- **Memory leaks**: Prevent memory accumulation in style caches
- **Style thrashing**: Avoid unnecessary style recalculations

## 10. Implementation Plan

### Phase 1: Core Engine (Week 1-2)
- [ ] Implement basic `engine` function
- [ ] Add method chaining support (`.style()`)
- [ ] Create component factory system
- [ ] Add basic TypeScript support

### Phase 2: Conditional Styling (Week 2-3)
- [ ] Implement `.when()` method
- [ ] Add condition evaluation logic
- [ ] Support platform conditions
- [ ] Add prop-based conditions

### Phase 3: Advanced Features (Week 3-4)
- [ ] Implement `.attrs()` method
- [ ] Add function-based attributes
- [ ] Improve TypeScript integration
- [ ] Add custom component support

### Phase 4: Performance & Polish (Week 4-5)
- [ ] Implement style caching
- [ ] Optimize condition evaluation
- [ ] Add comprehensive error handling
- [ ] Write extensive tests

### Phase 5: Documentation & Examples (Week 5-6)
- [ ] Write comprehensive API documentation
- [ ] Create example components
- [ ] Add migration guides
- [ ] Performance benchmarks

## Success Metrics

### Technical Metrics
- **Performance**: < 1ms for style resolution in typical cases
- **Bundle size**: < 10KB gzipped for core engine
- **Type coverage**: 100% TypeScript coverage
- **Test coverage**: > 95% code coverage

### User Experience Metrics
- **Developer satisfaction**: Positive feedback on API simplicity
- **Adoption rate**: Easy migration from existing styling solutions
- **Documentation quality**: Clear examples and comprehensive guides
- **Error messages**: Helpful debugging information

### Compatibility Metrics
- **React Native versions**: Support 0.70+ with 100% API compatibility
- **TypeScript versions**: Support 4.5+ with full type inference
- **Platform support**: iOS and Android with consistent behavior
- **Third-party integration**: Works with popular React Native libraries

---

## Dependencies

### Internal Dependencies
- Theme System (for theme integration)
- Performance Optimization (for caching)
- Type System (for TypeScript support)

### External Dependencies
- React 18+
- React Native 0.70+
- TypeScript 4.5+ (optional but recommended)

### Development Dependencies
- Jest for testing
- TypeScript for type checking
- ESLint for code quality
- React Native testing library
