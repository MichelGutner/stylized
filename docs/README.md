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

### Requirements

- React 18+
- React Native 0.70+
- TypeScript 4.5+ (recommended)

### Basic Setup

```tsx
import { engine, setTheme } from 'react-native-stylized';

// 1. Set up your theme
setTheme({
  colors: { 
    primary: '#007AFF', 
    background: '#FFFFFF',
    text: '#000000',
    border: '#E5E5E7'
  },
  spacing: { xs: 4, sm: 8, md: 16, lg: 24, xl: 32 },
  borderRadius: { sm: 4, md: 8, lg: 12, xl: 16 },
  typography: {
    fontSize: { xs: 12, sm: 14, md: 16, lg: 18, xl: 24 },
    fontWeight: { normal: '400', medium: '500', bold: '700' }
  }
});

// 2. Create styled components
const Container = engine('View', ({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
}));

const Button = engine('TouchableOpacity')
  .style(({ theme }) => ({
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center'
  }))
  .when('disabled', { opacity: 0.5 })
  .when('variant:outline', ({ theme }) => ({
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.primary
  }));

const Text = engine('Text', ({ theme }) => ({
  color: theme.colors.text,
  fontSize: theme.typography.fontSize.md,
}));

// 3. Use in your components
export default function App() {
  return (
    <Container>
      <Button variant="primary">
        <Text>Primary Button</Text>
      </Button>
      <Button variant="outline">
        <Text>Outline Button</Text>
      </Button>
    </Container>
  );
}
```

---

## 🎯 Core Concepts

### Engine Function

The `engine` function creates styled React Native components with method chaining support.

```tsx
// Basic usage
const StyledView = engine('View');

// With initial styles
const Container = engine('View', { flex: 1, padding: 16 });

// With function styles (theme-aware)
const ThemedContainer = engine('View', ({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  padding: theme.spacing.md,
}));

// With TypeScript props
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}

const Button = engine<ButtonProps>('TouchableOpacity', ({ theme, variant, size, disabled }) => ({
  backgroundColor: disabled ? theme.colors.disabled : theme.colors[variant],
  padding: theme.spacing[size],
  borderRadius: theme.borderRadius.md,
}));
```

### Method Chaining

Chain multiple style and conditional methods for complex components:

```tsx
const AdvancedButton = engine('TouchableOpacity')
  .style({ 
    alignItems: 'center',
    justifyContent: 'center'
  })
  .style(({ theme }) => ({
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
  }))
  .when('variant:secondary', ({ theme }) => ({
    backgroundColor: theme.colors.secondary
  }))
  .when('size:small', ({ theme }) => ({
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
  }))
  .when('disabled', { opacity: 0.5 })
  .attrs({
    accessible: true,
    accessibilityRole: 'button'
  });
```

---

## 🎨 Styling

### Static Styles

Apply static styles that don't change:

```tsx
const Card = engine('View')
  .style({
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  });
```

### Dynamic Styles

Use functions for dynamic, theme-aware styling:

```tsx
const ThemedCard = engine('View', ({ theme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: theme.borderRadius.md,
  padding: theme.spacing.md,
  borderWidth: 1,
  borderColor: theme.colors.border,
}));

const ResponsiveText = engine('Text', ({ theme, size = 'md' }) => ({
  fontSize: theme.typography.fontSize[size],
  color: theme.colors.text,
  lineHeight: theme.typography.fontSize[size] * 1.4,
}));
```

### Conditional Styling

Apply styles based on conditions using the `.when()` method:

```tsx
const ConditionalButton = engine('TouchableOpacity')
  .style({
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  })
  // Prop-based conditions
  .when('variant:primary', { backgroundColor: '#007AFF' })
  .when('variant:secondary', { backgroundColor: '#5856D6' })
  .when('variant:danger', { backgroundColor: '#FF3B30' })
  // Boolean prop conditions
  .when('disabled', { opacity: 0.5 })
  .when('loading', { opacity: 0.7 })
  // Platform conditions
  .when('ios', ({ theme }) => ({
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
  }))
  .when('android', { elevation: 4 })
  // Custom function conditions
  .when(({ props }) => props.size === 'large', {
    padding: 24,
    borderRadius: 12,
  });
```

### Component Attributes

Add component attributes using `.attrs()`:

```tsx
const AccessibleButton = engine('TouchableOpacity')
  .style({ backgroundColor: '#007AFF' })
  .attrs({
    accessible: true,
    accessibilityRole: 'button',
    accessibilityLabel: 'Submit button',
    testID: 'submit-button',
  });

const SecureInput = engine('TextInput')
  .style({ 
    borderWidth: 1, 
    borderColor: '#E5E5E7',
    borderRadius: 8,
    padding: 12,
  })
  .attrs({
    secureTextEntry: true,
    autoComplete: 'password',
    textContentType: 'password',
  });
```

---

## 🌍 Theme System

### Setting Themes

Configure your application theme using `setTheme`:

```tsx
import { setTheme } from 'react-native-stylized';

// Initial theme setup
setTheme({
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
    border: '#E5E5E7',
    disabled: '#C7C7CC',
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
    xxl: 48,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    full: 9999,
  },
  typography: {
    fontSize: {
      xs: 12,
      sm: 14,
      md: 16,
      lg: 18,
      xl: 24,
      xxl: 32,
    },
    fontWeight: {
      normal: '400' as const,
      medium: '500' as const,
      bold: '700' as const,
    },
  },
});
```

### Updating Themes

Update themes dynamically with deep merging:

```tsx
// Update specific theme values
setTheme({
  colors: {
    primary: '#FF3B30', // Only primary changes, others preserved
  }
});

// Functional updates for dynamic theming
setTheme((prevTheme) => ({
  colors: {
    ...prevTheme.colors,
    primary: prevTheme.colors.primary === '#007AFF' ? '#FF3B30' : '#007AFF',
    background: prevTheme.colors.background === '#FFFFFF' ? '#000000' : '#FFFFFF',
  }
}));

// Dark mode toggle
const toggleDarkMode = () => {
  setTheme((prev) => ({
    colors: {
      primary: '#0A84FF',
      background: prev.colors.background === '#FFFFFF' ? '#000000' : '#FFFFFF',
      text: prev.colors.text === '#000000' ? '#FFFFFF' : '#000000',
      surface: prev.colors.surface === '#F2F2F7' ? '#1C1C1E' : '#F2F2F7',
    }
  }));
};
```

### Accessing Theme

Use the `useTheme` hook in React components:

```tsx
import { useTheme } from 'react-native-stylized';

const ThemeDisplay = () => {
  const theme = useTheme();
  
  return (
    <View>
      <Text>Primary color: {theme.colors.primary}</Text>
      <Text>Background: {theme.colors.background}</Text>
      <Text>Spacing md: {theme.spacing.md}</Text>
    </View>
  );
};

// For non-React usage
import { getTheme } from 'react-native-stylized';

const logTheme = () => {
  const theme = getTheme();
  console.log('Current theme:', theme.colors.primary);
};
```

---

## 🔧 Available Components

### Core Components

All standard React Native components are supported:

```tsx
// Layout components
const StyledView = engine('View');
const StyledScrollView = engine('ScrollView');
const StyledSafeAreaView = engine('SafeAreaView');

// Text components
const StyledText = engine('Text');

// Image components
const StyledImage = engine('Image');
const StyledImageBackground = engine('ImageBackground');

// Input components
const StyledTextInput = engine('TextInput');

// Touchable components
const StyledTouchableOpacity = engine('TouchableOpacity');
const StyledPressable = engine('Pressable');
const StyledTouchableHighlight = engine('TouchableHighlight');
const StyledTouchableWithoutFeedback = engine('TouchableWithoutFeedback');

// List components
const StyledFlatList = engine('FlatList');
const StyledSectionList = engine('SectionList');

// Other components
const StyledActivityIndicator = engine('ActivityIndicator');
const StyledSwitch = engine('Switch');
const StyledModal = engine('Modal');
const StyledStatusBar = engine('StatusBar');
const StyledKeyboardAvoidingView = engine('KeyboardAvoidingView');
```

### Custom Components

Style your custom components:

```tsx
import CustomCard from './CustomCard';

const StyledCustomCard = engine(CustomCard, ({ theme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: theme.borderRadius.md,
  padding: theme.spacing.md,
}));

// Use with props
interface CustomCardProps {
  variant?: 'elevated' | 'outlined';
  onPress?: () => void;
}

const StyledCard = engine<CustomCardProps>(CustomCard, ({ theme, variant }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: theme.borderRadius.md,
  borderWidth: variant === 'outlined' ? 1 : 0,
  borderColor: theme.colors.border,
  ...(variant === 'elevated' && {
    shadowColor: theme.colors.shadow,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  }),
}));
```

---

## 📱 Examples

### Complete Button Component

```tsx
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  loading?: boolean;
  onPress?: () => void;
  children: React.ReactNode;
}

const Button = engine<ButtonProps>('TouchableOpacity')
  .style(({ theme }) => ({
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: 'transparent',
  }))
  .style(({ theme, size = 'medium' }) => ({
    paddingVertical: theme.spacing[size === 'small' ? 'sm' : size === 'large' ? 'lg' : 'md'],
    paddingHorizontal: theme.spacing[size === 'small' ? 'md' : size === 'large' ? 'xl' : 'lg'],
  }))
  .when('variant:primary', ({ theme }) => ({
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  }))
  .when('variant:secondary', ({ theme }) => ({
    backgroundColor: theme.colors.secondary,
    borderColor: theme.colors.secondary,
  }))
  .when('variant:outline', ({ theme }) => ({
    backgroundColor: 'transparent',
    borderColor: theme.colors.primary,
  }))
  .when('variant:ghost', ({ theme }) => ({
    backgroundColor: 'transparent',
  }))
  .when('disabled', { opacity: 0.5 })
  .when('loading', { opacity: 0.7 })
  .attrs({
    accessible: true,
    accessibilityRole: 'button',
    disabled: ({ disabled, loading }) => disabled || loading,
  });

const ButtonText = engine('Text')
  .style(({ theme }) => ({
    fontSize: theme.typography.fontSize.md,
    fontWeight: theme.typography.fontWeight.medium,
  }))
  .when('variant:primary', ({ theme }) => ({ color: '#FFFFFF' }))
  .when('variant:secondary', ({ theme }) => ({ color: '#FFFFFF' }))
  .when('variant:outline', ({ theme }) => ({ color: theme.colors.primary }))
  .when('variant:ghost', ({ theme }) => ({ color: theme.colors.primary }));

// Usage
const App = () => {
  const [loading, setLoading] = useState(false);
  
  return (
    <View style={{ gap: 16, padding: 16 }}>
      <Button variant="primary" onPress={() => {}}>
        <ButtonText>Primary Button</ButtonText>
      </Button>
      
      <Button variant="outline" size="large" onPress={() => {}}>
        <ButtonText>Large Outline Button</ButtonText>
      </Button>
      
      <Button variant="ghost" disabled onPress={() => {}}>
        <ButtonText>Disabled Ghost Button</ButtonText>
      </Button>
      
      <Button loading onPress={() => {}}>
        <ButtonText>Loading Button</ButtonText>
      </Button>
    </View>
  );
};
```

### Form Components

```tsx
const FormField = engine('View', ({ theme }) => ({
  marginBottom: theme.spacing.md,
}));

const Label = engine('Text', ({ theme }) => ({
  fontSize: theme.typography.fontSize.sm,
  fontWeight: theme.typography.fontWeight.medium,
  color: theme.colors.text,
  marginBottom: theme.spacing.xs,
}));

const Input = engine('TextInput')
  .style(({ theme }) => ({
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: theme.typography.fontSize.md,
    color: theme.colors.text,
    backgroundColor: theme.colors.background,
  }))
  .when('focused', ({ theme }) => ({
    borderColor: theme.colors.primary,
  }))
  .when('error', ({ theme }) => ({
    borderColor: theme.colors.error,
  }))
  .attrs({
    placeholderTextColor: '#8E8E93',
  });

const ErrorText = engine('Text', ({ theme }) => ({
  fontSize: theme.typography.fontSize.sm,
  color: theme.colors.error,
  marginTop: theme.spacing.xs,
}));

// Usage
const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  return (
    <View style={{ padding: 16 }}>
      <FormField>
        <Label>Email</Label>
        <Input
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          error={!!errors.email}
        />
        {errors.email && <ErrorText>{errors.email}</ErrorText>}
      </FormField>
      
      <FormField>
        <Label>Password</Label>
        <Input
          value={password}
          onChangeText={setPassword}
          placeholder="Enter your password"
          secureTextEntry
          error={!!errors.password}
        />
        {errors.password && <ErrorText>{errors.password}</ErrorText>}
      </FormField>
    </View>
  );
};
```

---

## � Best Practices

### Performance Optimization

1. **Use function styles for dynamic theming**
   ```tsx
   // Good
   const Button = engine('TouchableOpacity', ({ theme }) => ({
     backgroundColor: theme.colors.primary,
   }));
   
   // Avoid
   const Button = engine('TouchableOpacity', {
     backgroundColor: '#007AFF', // Hardcoded
   });
   ```

2. **Chain methods for complex styling**
   ```tsx
   const Card = engine('View')
     .style({ backgroundColor: 'white' })
     .style(({ theme }) => ({
       padding: theme.spacing.md,
       borderRadius: theme.borderRadius.md,
     }));
   ```

3. **Avoid inline objects in render**
   ```tsx
   // Good
   const Button = engine('TouchableOpacity').style({ padding: 16 });
   
   // Avoid
   <TouchableOpacity style={{ padding: 16 }}>
   ```

### Theme Organization

1. **Structure themes logically**
   ```tsx
   setTheme({
     colors: {
       // Semantic colors
       primary: '#007AFF',
       secondary: '#5856D6',
       
       // Functional colors
       success: '#34C759',
       warning: '#FF9500',
       error: '#FF3B30',
       
       // Neutral colors
       background: '#FFFFFF',
       surface: '#F2F2F7',
       text: '#000000',
     },
   });
   ```

2. **Use consistent spacing scales**
   ```tsx
   spacing: {
     xs: 4,   // 0.25rem
     sm: 8,   // 0.5rem
     md: 16,  // 1rem
     lg: 24,  // 1.5rem
     xl: 32,  // 2rem
     xxl: 48, // 3rem
   }
   ```

### TypeScript Usage

1. **Define prop interfaces**
   ```tsx
   interface ButtonProps {
     variant?: 'primary' | 'secondary';
     size?: 'small' | 'medium' | 'large';
     disabled?: boolean;
     onPress?: () => void;
   }
   
   const Button = engine<ButtonProps>('TouchableOpacity');
   ```

2. **Extend theme types**
   ```tsx
   // types.d.ts
   declare global {
     export interface EngineTheme {
       colors: {
         primary: string;
         secondary: string;
         background: string;
         text: string;
       };
       spacing: {
         sm: number;
         md: number;
         lg: number;
       };
       borderRadius: {
         sm: number;
         md: number;
         lg: number;
       };
     }
   }
   
   export {};
   ```

---

## � Troubleshooting

### Common Issues

1. **Theme not updating**
   - Ensure you're using `useTheme()` hook in React components
   - Check that `setTheme()` is called with proper values
   - Verify theme type definitions match your usage

2. **TypeScript errors**
   - Make sure you have proper type definitions
   - Check that your theme interface extends `EngineTheme`
   - Verify prop interfaces are correctly defined

3. **Performance issues**
   - Avoid creating new objects in render functions
   - Use memoization for complex calculations
   - Profile your app to identify bottlenecks

### Debugging

```tsx
// Debug current theme
import { getTheme } from 'react-native-stylized';

console.log('Current theme:', JSON.stringify(getTheme(), null, 2));

// Debug component styles
const DebugButton = engine('TouchableOpacity')
  .style(({ theme }) => {
    console.log('Theme in style function:', theme);
    return { backgroundColor: theme.colors.primary };
  });
```

---

## 📖 API Reference

For complete API documentation, see [API Reference](./api-reference.md).

---

## 🚀 Migration

### From StyleSheet

```tsx
// Before
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000000',
  },
});

// After
import { engine, setTheme } from 'react-native-stylized';

setTheme({
  colors: { background: '#FFFFFF', text: '#000000' },
  spacing: { md: 16 },
  typography: { fontSize: { md: 16, xl: 24 } },
});

const Container = engine('View', ({ theme }) => ({
  flex: 1,
  padding: theme.spacing.md,
  backgroundColor: theme.colors.background,
}));

const Title = engine('Text', ({ theme }) => ({
  fontSize: theme.typography.fontSize.xl,
  fontWeight: 'bold',
  color: theme.colors.text,
}));
```

### From Styled Components

```tsx
// Before
import styled from 'styled-components/native';

const Container = styled.View`
  flex: 1;
  padding: 16px;
  background-color: ${({ theme }) => theme.background};
`;

// After
import { engine } from 'react-native-stylized';

const Container = engine('View', ({ theme }) => ({
  flex: 1,
  padding: 16,
  backgroundColor: theme.background,
}));
```

---

## License

MIT
