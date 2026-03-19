# PRD: Component Builder

## 1. Overview

The Component Builder module is responsible for constructing the final React components from styling definitions. It handles the integration of styled components with React's component system, manages method chaining, and ensures proper component composition and inheritance.

## 2. Problem Statement

Creating styled components in React Native involves several complex challenges:

- **Component Composition**: Managing multiple style layers and inheritance
- **Method Chaining**: Implementing fluent API while maintaining type safety
- **React Integration**: Ensuring seamless integration with React's component lifecycle
- **Props Handling**: Merging styled component props with original component props
- **Ref Forwarding**: Preserving ref functionality for styled components
- **Performance**: Optimizing component creation and updates

## 3. Goals & Non-Goals

### Goals
- Provide fluent method chaining API for component building
- Ensure seamless React component integration
- Maintain type safety throughout the building process
- Support component composition and inheritance
- Optimize performance for component creation and updates
- Preserve all React Native component functionality

### Non-Goals
- Component lifecycle management beyond styling
- State management within styled components
- Animation-specific component utilities
- Custom component creation frameworks

## 4. Features

### MVP Features
- **Method Chaining Builder**: Fluent API for component construction
- **Style Accumulation**: Collect and merge styles from multiple method calls
- **Condition Processing**: Handle conditional styling logic
- **Attribute Management**: Apply component attributes and props
- **React Component Factory**: Create final React components
- **Type Preservation**: Maintain TypeScript types throughout building

### Future Improvements
- **Component Inheritance**: Extend existing styled components
- **Style Composition**: Combine multiple styled components
- **Component Variants**: Predefined component variations
- **Dynamic Component Switching**: Change base components dynamically
- **Component Debugging**: Development tools for component inspection
- **Hot Module Replacement**: Support for development hot reloading

## 5. User Stories

### As a React Native developer, I want to:
- Chain multiple styling methods for readable code
- Apply conditional styles without complex logic
- Add component attributes easily
- Create reusable styled components
- Maintain full TypeScript support
- Preserve all original component functionality

### As a component library author, I want to:
- Create extensible base components
- Define component variants easily
- Ensure consistent API across components
- Optimize component performance
- Provide clear component documentation

### As a team lead, I want to:
- Enforce consistent component patterns
- Ensure type safety across components
- Optimize bundle size and performance
- Maintain clean, maintainable component code

## 6. Technical Requirements

### React Integration
- Support React 18+ component patterns
- Preserve ref forwarding
- Maintain component displayName
- Support React.memo optimization
- Handle context integration

### TypeScript Support
- Generic type parameters for component props
- Type inference for styled component props
- Autocomplete for method chaining
- Type-safe condition evaluation
- Proper type merging for attributes

### Performance Requirements
- Efficient component creation
- Minimal re-renders for style changes
- Optimized prop merging
- Memory-efficient style storage

## 7. API Design

### Component Builder Interface

```typescript
interface ComponentBuilder<T extends React.ComponentType<any>, P extends object> {
  style(styleOrFn: StyleObject | StyleFunction<T, P>): ComponentBuilder<T, P>;
  when(condition: Condition<P>, attrs: ConditionalAttrs<T, P>): ComponentBuilder<T, P>;
  attrs(attrs: AttrsObject<T, P> | AttrsFunction<T, P>): ComponentBuilder<T, P>;
  extend(): ComponentBuilder<T, P>;
  build(): React.ForwardRefExoticComponent<React.ComponentPropsWithRef<T> & P>;
}
```

### Builder Factory

```typescript
function createBuilder<T extends React.ComponentType<any>, P extends object = {}>(
  component: T,
  initialStyles?: StyleFunction<T, P>
): ComponentBuilder<T, P>
```

### Usage Examples

```typescript
// Basic component building
const buttonBuilder = createBuilder('TouchableOpacity')
  .style({ padding: 16, borderRadius: 8 })
  .when('variant:primary', { backgroundColor: '#007AFF' })
  .when('disabled', { opacity: 0.5 })
  .attrs({
    accessible: true,
    accessibilityRole: 'button',
  });

const Button = buttonBuilder.build();

// With TypeScript props
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  onPress?: () => void;
}

const typedButtonBuilder = createBuilder<ButtonProps>('TouchableOpacity')
  .style(({ theme }) => ({
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
  }))
  .style(({ theme, size = 'medium' }) => ({
    paddingVertical: theme.spacing[size === 'small' ? 'sm' : 'md'],
    paddingHorizontal: theme.spacing[size === 'small' ? 'md' : 'lg'],
  }))
  .when('variant:primary', ({ theme }) => ({
    backgroundColor: theme.colors.primary,
  }))
  .when('variant:secondary', ({ theme }) => ({
    backgroundColor: theme.colors.secondary,
  }))
  .when('disabled', ({ theme }) => ({
    opacity: 0.5,
    backgroundColor: theme.colors.disabled,
  }))
  .attrs(({ variant, size, disabled }) => ({
    accessibilityLabel: `${variant} button, ${size} size${disabled ? ', disabled' : ''}`,
    testID: `${variant}-${size}-button`,
  }));

const TypedButton = typedButtonBuilder.build();

// Component extension
const baseButtonBuilder = createBuilder('TouchableOpacity')
  .style({
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 8,
  });

const primaryButtonBuilder = baseButtonBuilder
  .extend()
  .style(({ theme }) => ({
    backgroundColor: theme.colors.primary,
  }));

const PrimaryButton = primaryButtonBuilder.build();

// Custom component building
const CustomCard = ({ children, ...props }: ViewProps) => (
  <View {...props}>{children}</View>
);

const cardBuilder = createBuilder(CustomCard)
  .style(({ theme }) => ({
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  }))
  .when('elevated', ({ theme }) => ({
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  }));

const Card = cardBuilder.build();
```

### Internal Builder Structure

```typescript
class StylizedBuilder<T extends React.ComponentType<any>, P extends object> {
  private component: T;
  private rules: Rule<T, P>[] = [];
  private componentCache: Map<string, React.ComponentType<any>> = new Map();

  constructor(component: T, initialStyle?: StyleFunction<T, P>) {
    this.component = component;
    if (initialStyle) {
      this.rules.push({ kind: 'style', style: initialStyle });
    }
  }

  style(styleOrFn: StyleObject | StyleFunction<T, P>): this {
    this.rules.push({ kind: 'style', style: styleOrFn });
    return this;
  }

  when(condition: Condition<P>, attrs: ConditionalAttrs<T, P>): this {
    this.rules.push({ kind: 'when', condition, attrs });
    return this;
  }

  attrs(attrs: AttrsObject<T, P> | AttrsFunction<T, P>): this {
    this.rules.push({ kind: 'attrs', attrs });
    return this;
  }

  extend(): StylizedBuilder<T, P> {
    const newBuilder = new StylizedBuilder(this.component);
    newBuilder.rules = [...this.rules];
    return newBuilder;
  }

  build(): React.ForwardRefExoticComponent<React.ComponentPropsWithRef<T> & P> {
    // Component building logic
    return createStyledComponent(this.component, this.rules);
  }
}
```

## 8. Architecture Notes

### Separation of Concerns

1. **Builder Core**: Manages method chaining and rule accumulation
2. **Rule Processor**: Processes style, condition, and attribute rules
3. **Component Factory**: Creates final React components
4. **Type Manager**: Handles TypeScript type preservation
5. **Cache Manager**: Optimizes component creation with caching

### Data Flow

```
Method Calls → Rule Accumulation → Rule Processing → Component Creation → React Component
```

### Key Components

- **StylizedBuilder**: Main builder class with method chaining
- **RuleProcessor**: Processes accumulated rules into styles
- **ComponentFactory**: Creates React components from processed rules
- **TypePreserver**: Maintains TypeScript types throughout building
- **CacheManager**: Caches built components for performance

### Performance Optimizations

- **Rule Caching**: Cache processed rules for reuse
- **Component Memoization**: Memoize built components
- **Lazy Evaluation**: Defer expensive operations until build time
- **Incremental Building**: Support incremental component updates

## 9. Edge Cases

### Building Edge Cases
- **Empty Rules**: Handle builders with no styling rules
- **Conflicting Rules**: Resolve conflicts between style and attribute rules
- **Invalid Components**: Handle invalid component references gracefully
- **Circular Dependencies**: Prevent circular component dependencies

### Type Safety Edge Cases
- **Generic Components**: Handle generic React components properly
- **Complex Props**: Manage complex prop type combinations
- **Type Merging**: Ensure proper type merging for attributes
- **Conditional Types**: Handle conditional TypeScript types

### Performance Edge Cases
- **Large Rule Sets**: Optimize for builders with many rules
- **Frequent Building**: Handle rapid component creation efficiently
- **Memory Management**: Prevent memory leaks in component caches
- **Deep Nesting**: Optimize for deeply nested component structures

## 10. Implementation Plan

### Phase 1: Basic Builder (Week 1-2)
- [ ] Implement StylizedBuilder class with basic method chaining
- [ ] Add rule accumulation system
- [ ] Create basic component factory
- [ ] Add simple TypeScript support

### Phase 2: Rule Processing (Week 2-3)
- [ ] Implement rule processing logic
- [ ] Add style merging and resolution
- [ ] Create condition evaluation system
- [ ] Add attribute handling

### Phase 3: React Integration (Week 3-4)
- [ ] Implement React component creation
- [ ] Add ref forwarding support
- [ ] Create prop merging system
- [ ] Add displayName preservation

### Phase 4: Advanced Features (Week 4-5)
- [ ] Implement component extension
- [ ] Add caching system
- [ ] Optimize performance
- [ ] Improve TypeScript integration

### Phase 5: Testing & Documentation (Week 5-6)
- [ ] Write comprehensive tests
- [ ] Create usage examples
- [ ] Write API documentation
- [ ] Performance benchmarking

## Success Metrics

### Technical Metrics
- **Performance**: < 2ms for component building in typical cases
- **Memory usage**: < 500KB for component builder cache
- **Type coverage**: 100% TypeScript coverage
- **Test coverage**: > 95% code coverage

### User Experience Metrics
- **API consistency**: Intuitive method chaining API
- **Type safety**: Compile-time error prevention
- **Documentation quality**: Clear examples and guides
- **Error messages**: Helpful debugging information

### Compatibility Metrics
- **React versions**: Support React 18+ with full compatibility
- **TypeScript versions**: Support 4.5+ with full inference
- **Component types**: Support all React Native component types
- **Bundle size**: < 8KB gzipped for component builder

---

## Dependencies

### Internal Dependencies
- Core Styling Engine (for style processing)
- Theme System (for theme integration)
- Performance Optimization (for caching)

### External Dependencies
- React 18+ (for component creation)
- TypeScript 4.5+ (for type safety)

### Development Dependencies
- Jest for testing
- TypeScript for type checking
- React testing library for component testing

## Security Considerations

### Component Security
- Validate component references to prevent injection
- Sanitize attribute values to prevent XSS
- Implement secure prop handling
- Consider component security in audits

### Type Safety
- Prevent type bypassing attacks
- Validate prop types at runtime
- Implement secure type checking
- Handle malicious type manipulations

## Accessibility Considerations

### Attribute Support
- Ensure accessibility attributes are properly handled
- Support ARIA properties and roles
- Maintain accessibility in styled components
- Provide accessibility-focused examples

### Screen Reader Support
- Preserve accessibility props in styled components
- Support accessibility labels and hints
- Ensure proper accessibility tree structure
- Test with screen readers
