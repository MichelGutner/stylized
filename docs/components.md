---
title: Components Reference
description: Complete list of available components
---

<div align="center">

# 📱 Components Reference

## Complete list of available components

---

## 📱 React Native Components

### Layout Components

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### `engine.View<T>()`

Most fundamental layout component.

```typescript
const Container = engine.View<{
  flex?: number;
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
}>()`
  ${({ theme, flex = 1, direction = 'column', align, justify }) => ({
    flex,
    flexDirection: direction,
    alignItems: align === 'start' ? 'flex-start' :
                align === 'center' ? 'center' :
                align === 'end' ? 'flex-end' : 'stretch',
    justifyContent: justify === 'start' ? 'flex-start' :
                    justify === 'center' ? 'center' :
                    justify === 'end' ? 'flex-end' :
                    justify === 'between' ? 'space-between' :
                    justify === 'around' ? 'space-around' : 'flex-start',
  })}
`;
```

**Props:** All React Native View props + custom generics

**Common Use Cases:**
- Layout containers
- Flexbox positioning
- Background styling
- Border and shadow effects

---

#### `engine.ScrollView<T>()`

Scrollable container component.

```typescript
const ScrollContainer = engine.ScrollView<{
  horizontal?: boolean;
  showsScrollIndicator?: boolean;
}>()`
  ${({ theme, horizontal = false }) => ({
    flex: 1,
    flexDirection: horizontal ? 'row' : 'column',
  })}
`;
```

**Props:** All React Native ScrollView props

**Common Use Cases:**
- Lists with variable heights
- Horizontal scrolling content
- Scrollable forms
- Image galleries

---

#### `engine.SafeAreaView<T>()`

Container that avoids system UI.

```typescript
const SafeContainer = engine.SafeAreaView<{
  edges?: ('top' | 'bottom' | 'left' | 'right')[];
}>()`
  ${({ theme }) => ({
    flex: 1,
    backgroundColor: theme.colors.background,
  })}
`;
```

**Props:** All React Native SafeAreaView props

**Common Use Cases:**
- Main app containers
- Screen layouts
- Modal content
- Navigation containers

</div>

### Text Components

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### `engine.Text<T>()`

Text display component.

```typescript
const Heading = engine.Text<{
  size?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: keyof EngineTheme['colors'];
}>()`
  ${({ theme, size = 'h3', weight = 'normal', color }) => {
    const sizes = {
      h1: 32, h2: 24, h3: 20, h4: 18, h5: 16, h6: 14
    };
    
    return {
      fontSize: sizes[size],
      fontWeight: weight === 'normal' ? '400' :
                  weight === 'medium' ? '500' :
                  weight === 'semibold' ? '600' : '700',
      color: color ? theme.colors[color] : theme.colors.text,
    };
  }}
`;
```

**Props:** All React Native Text props

**Common Use Cases:**
- Headings and titles
- Body text
- Labels and captions
- Button text

---

#### `engine.TextInput<T>()`

Text input component.

```typescript
const Input = engine.TextInput<{
  variant?: 'outlined' | 'filled';
  error?: boolean;
}>()`
  ${({ theme, variant = 'outlined', error }) => ({
    borderWidth: variant === 'outlined' ? 1 : 0,
    borderColor: error ? theme.colors.error : theme.colors.border,
    backgroundColor: variant === 'filled' ? theme.colors.surface : 'transparent',
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    fontSize: 16,
    color: theme.colors.text,
  })}
`;
```

**Props:** All React Native TextInput props

**Common Use Cases:**
- Form inputs
- Search fields
- Text areas
- Password fields

</div>

### Interactive Components

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### `engine.TouchableOpacity<T>()`

Touchable opacity button.

```typescript
const Button = engine.TouchableOpacity<{
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
}>()`
  ${({ theme, variant = 'primary', size = 'medium', disabled }) => {
    const sizes = {
      small: theme.spacing.sm,
      medium: theme.spacing.md,
      large: theme.spacing.lg,
    };
    
    return {
      backgroundColor: disabled 
        ? theme.colors.border 
        : variant === 'primary' 
          ? theme.colors.primary 
          : variant === 'secondary'
            ? theme.colors.secondary
            : 'transparent',
      paddingVertical: sizes[size],
      paddingHorizontal: size === 'small' ? theme.spacing.lg : theme.spacing.xl,
      borderRadius: theme.borderRadius.md,
      opacity: disabled ? 0.5 : 1,
      alignItems: 'center',
    };
  }}
`;
```

**Props:** All React Native TouchableOpacity props

**Common Use Cases:**
- Buttons
- Interactive cards
- Menu items
- Touchable areas

---

#### `engine.Pressable<T>()`

Modern pressable component.

```typescript
const PressableCard = engine.Pressable<{
  pressed?: boolean;
}>()`
  ${({ theme, pressed }) => ({
    backgroundColor: pressed ? theme.colors.surface : theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    transform: [{ scale: pressed ? 0.98 : 1 }],
  })}
`;
```

**Props:** All React Native Pressable props

**Common Use Cases:**
- Modern buttons
- Interactive cards
- Touchable lists
- Gesture handling

---

#### `engine.TouchableHighlight<T>()`

Touchable with highlight effect.

```typescript
const HighlightButton = engine.TouchableHighlight<{
  underlayColor?: string;
}>()`
  ${({ theme, underlayColor = theme.colors.primary }) => ({
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    underlayColor,
  })}
`;
```

**Props:** All React Native TouchableHighlight props

**Common Use Cases:**
- Highlight buttons
- Interactive areas
- Menu items
- Touch feedback

</div>

### List Components

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### `engine.FlatList<T>()`

Performant list component.

```typescript
const ListContainer = engine.FlatList<{
  data: any[];
  renderItem: ({ item }: any) => React.ReactElement;
}>()`
  ${({ theme }) => ({
    flex: 1,
    backgroundColor: theme.colors.background,
  })}
`;
```

**Props:** All React Native FlatList props

**Common Use Cases:**
- Data lists
- News feeds
- Product listings
- Chat messages

---

#### `engine.SectionList<T>()`

Sectioned list component.

```typescript
const SectionedList = engine.SectionList<{
  sections: any[];
  renderItem: ({ item }: any) => React.ReactElement;
  renderSectionHeader: ({ section }: any) => React.ReactElement;
}>()`
  ${({ theme }) => ({
    flex: 1,
    backgroundColor: theme.colors.background,
  })}
`;
```

**Props:** All React Native SectionList props

**Common Use Cases:**
- Grouped lists
- Contacts app
- Settings sections
- Category listings

---

#### `engine.VirtualizedList<T>()`

Advanced virtualized list.

```typescript
const VirtualList = engine.VirtualizedList<{
  data: any[];
  getItem: (data: any[], index: number) => any;
  getItemCount: (data: any[]) => number;
}>()`
  ${({ theme }) => ({
    flex: 1,
    backgroundColor: theme.colors.background,
  })}
`;
```

**Props:** All React Native VirtualizedList props

**Common Use Cases:**
- Large datasets
- Performance-critical lists
- Custom list implementations
- Complex data rendering

</div>

### Media Components

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### `engine.Image<T>()`

Image display component.

```typescript
const StyledImage = engine.Image<{
  rounded?: boolean;
  size?: 'small' | 'medium' | 'large';
}>()`
  ${({ theme, rounded = false, size = 'medium' }) => {
    const sizes = {
      small: 40,
      medium: 80,
      large: 120,
    };
    
    return {
      width: sizes[size],
      height: sizes[size],
      borderRadius: rounded ? sizes[size] / 2 : theme.borderRadius.md,
      backgroundColor: theme.colors.surface,
    };
  }}
`;
```

**Props:** All React Native Image props

**Common Use Cases:**
- Profile pictures
- Product images
- Icons
- Background images

---

#### `engine.ActivityIndicator<T>()`

Loading indicator.

```typescript
const Loader = engine.ActivityIndicator<{
  size?: 'small' | 'large';
  color?: keyof EngineTheme['colors'];
}>()`
  ${({ theme, size = 'small', color = 'primary' }) => ({
    // ActivityIndicator uses props directly, not styles
  })}
`;
```

**Props:** All React Native ActivityIndicator props

**Common Use Cases:**
- Loading states
- Async operations
- Data fetching
- Form submissions

---

#### `engine.Switch<T>()`

Toggle switch component.

```typescript
const ToggleSwitch = engine.Switch<{
  trackColor?: string;
  thumbColor?: string;
}>()`
  ${({ theme }) => ({
    // Switch uses props directly, not styles
  })}
`;
```

**Props:** All React Native Switch props

**Common Use Cases:**
- Settings toggles
- Feature switches
- Boolean inputs
- Preferences

</div>

### Modal Components

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### `engine.Modal<T>()`

Modal overlay component.

```typescript
const StyledModal = engine.Modal<{
  visible: boolean;
  transparent?: boolean;
}>()`
  ${({ theme }) => ({
    // Modal uses props directly, not styles
  })}
`;
```

**Props:** All React Native Modal props

**Common Use Cases:**
- Dialogs
- Alerts
- Forms
- Full-screen overlays

---

#### `engine.StatusBar<T>()`

Status bar component.

```typescript
const StyledStatusBar = engine.StatusBar<{
  barStyle?: 'default' | 'light-content' | 'dark-content';
  backgroundColor?: string;
}>()`
  ${({ theme }) => ({
    // StatusBar uses props directly, not styles
  })}
`;
```

**Props:** All React Native StatusBar props

**Common Use Cases:**
- Status bar styling
- Theme-aware status bar
- Immersive mode
- Custom overlays

</div>

### Utility Components

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### `engine.KeyboardAvoidingView<T>()`

Keyboard-aware view.

```typescript
const FormContainer = engine.KeyboardAvoidingView<{
  behavior?: 'padding' | 'height' | 'position';
}>()`
  ${({ theme }) => ({
    flex: 1,
    backgroundColor: theme.colors.background,
  })}
`;
```

**Props:** All React Native KeyboardAvoidingView props

**Common Use Cases:**
- Form layouts
- Input screens
- Chat interfaces
- Login screens

---

#### `engine.TouchableWithoutFeedback<T>()`

Invisible touchable area.

```typescript
const InvisibleTouch = engine.TouchableWithoutFeedback<{
  onPress: () => void;
}>()`
  ${({ theme }) => ({
    // TouchableWithoutFeedback doesn't support styling
  })}
`;
```

**Props:** All React Native TouchableWithoutFeedback props

**Common Use Cases:**
- Dismiss keyboard
- Background taps
- Invisible buttons
- Gesture areas

---

#### `engine.TouchableHighlight<T>()`

Highlight touchable.

```typescript
const HighlightArea = engine.TouchableHighlight<{
  underlayColor?: string;
}>()`
  ${({ theme, underlayColor = theme.colors.surface }) => ({
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    underlayColor,
  })}
`;
```

**Props:** All React Native TouchableHighlight props

**Common Use Cases:**
- Highlight buttons
- Interactive areas
- Menu items
- Touch feedback

</div>

---

## 🌐 React Web Components

### Layout Components

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### `engine.div<T>()`

Fundamental layout container.

```typescript
const Container = engine.div<{
  flex?: boolean;
  direction?: 'row' | 'column';
  align?: 'start' | 'center' | 'end' | 'stretch';
  justify?: 'start' | 'center' | 'end' | 'between' | 'around';
}>()`
  ${({ theme, flex, direction = 'row', align, justify }) => ({
    display: flex ? 'flex' : 'block',
    flexDirection: direction,
    alignItems: align === 'start' ? 'flex-start' :
                align === 'center' ? 'center' :
                align === 'end' ? 'flex-end' : 'stretch',
    justifyContent: justify === 'start' ? 'flex-start' :
                    justify === 'center' ? 'center' :
                    justify === 'end' ? 'flex-end' :
                    justify === 'between' ? 'space-between' :
                    justify === 'around' ? 'space-around' : 'flex-start',
  })}
`;
```

**Props:** All HTML div attributes + custom generics

**Common Use Cases:**
- Layout containers
- Flexbox positioning
- Section wrappers
- Card containers

---

#### `engine.section<T>()`

Semantic section container.

```typescript
const Section = engine.section<{
  spaced?: boolean;
}>()`
  ${({ theme, spaced = true }) => ({
    padding: spaced ? `${theme.spacing.lg}px` : '0',
    marginBottom: spaced ? `${theme.spacing.lg}px` : '0',
  })}
`;
```

**Props:** All HTML section attributes

**Common Use Cases:**
- Content sections
- Article divisions
- Page sections
- Semantic layout

---

#### `engine.header<T>()`

Header container.

```typescript
const Header = engine.header<{
  sticky?: boolean;
}>()`
  ${({ theme, sticky = false }) => ({
    padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
    backgroundColor: theme.colors.background,
    borderBottom: `1px solid ${theme.colors.border}`,
    position: sticky ? 'sticky' : 'static',
    top: sticky ? 0 : 'auto',
    zIndex: sticky ? 100 : 'auto',
  })}
`;
```

**Props:** All HTML header attributes

**Common Use Cases:**
- Page headers
- Navigation bars
- Section headers
- Sticky headers

---

#### `engine.footer<T>()`

Footer container.

```typescript
const Footer = engine.footer()`
  ${({ theme }) => ({
    padding: `${theme.spacing.lg}px`,
    backgroundColor: theme.colors.surface,
    borderTop: `1px solid ${theme.colors.border}`,
    marginTop: 'auto',
  })}
`;
```

**Props:** All HTML footer attributes

**Common Use Cases:**
- Page footers
- Copyright information
- Navigation footers
- Contact information

</div>

### Text Components

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### `engine.h1<T>()` - `engine.h6<T>()`

Heading components.

```typescript
const Heading = engine.h1<{
  size?: 'sm' | 'md' | 'lg' | 'xl';
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
  color?: keyof EngineTheme['colors'];
}>()`
  ${({ theme, size = 'md', weight = 'normal', color }) => {
    const sizes = {
      sm: '20px',
      md: '24px',
      lg: '32px',
      xl: '48px',
    };
    
    return {
      fontSize: sizes[size],
      fontWeight: weight === 'normal' ? '400' :
                  weight === 'medium' ? '500' :
                  weight === 'semibold' ? '600' : '700',
      color: color ? theme.colors[color] : theme.colors.text,
      margin: '0 0 16px 0',
      lineHeight: 1.2,
    };
  }}
`;
```

**Props:** All HTML heading attributes

**Common Use Cases:**
- Page titles
- Section headings
- Article titles
- Display text

---

#### `engine.p<T>()`

Paragraph component.

```typescript
const Paragraph = engine.p<{
  size?: 'sm' | 'md' | 'lg';
  leading?: 'tight' | 'normal' | 'relaxed';
}>()`
  ${({ theme, size = 'md', leading = 'normal' }) => {
    const sizes = {
      sm: '14px',
      md: '16px',
      lg: '18px',
    };
    
    const lineHeights = {
      tight: 1.2,
      normal: 1.5,
      relaxed: 1.8,
    };
    
    return {
      fontSize: sizes[size],
      lineHeight: lineHeights[leading],
      color: theme.colors.text,
      margin: '0 0 16px 0',
    };
  }}
`;
```

**Props:** All HTML paragraph attributes

**Common Use Cases:**
- Body text
- Article content
- Descriptions
- Information text

---

#### `engine.span<T>()`

Inline text component.

```typescript
const InlineText = engine.span<{
  color?: keyof EngineTheme['colors'];
  weight?: 'normal' | 'medium' | 'semibold' | 'bold';
}>()`
  ${({ theme, color, weight }) => ({
    color: color ? theme.colors[color] : 'inherit',
    fontWeight: weight === 'normal' ? '400' :
                weight === 'medium' ? '500' :
                weight === 'semibold' ? '600' : '700',
  })}
`;
```

**Props:** All HTML span attributes

**Common Use Cases:**
- Inline styling
- Text highlights
- Emphasis
- Inline elements

---

#### `engine.small<T>()`

Small text component.

```typescript
const SmallText = engine.small()`
  ${({ theme }) => ({
    fontSize: '12px',
    color: theme.colors.textSecondary,
    lineHeight: 1.4,
  })}
`;
```

**Props:** All HTML small attributes

**Common Use Cases:**
- Fine print
- Disclaimers
- Metadata
- Helper text

</div>

### Interactive Components

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### `engine.button<T>()`

Button component.

```typescript
const Button = engine.button<{
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
}>()`
  ${({ theme, variant = 'primary', size = 'md', disabled }) => {
    const sizes = {
      sm: { padding: '8px 16px', fontSize: '14px' },
      md: { padding: '12px 24px', fontSize: '16px' },
      lg: { padding: '16px 32px', fontSize: '18px' },
    };
    
    const variants = {
      primary: {
        backgroundColor: theme.colors.primary,
        color: 'white',
        border: 'none',
      },
      secondary: {
        backgroundColor: theme.colors.secondary,
        color: 'white',
        border: 'none',
      },
      outline: {
        backgroundColor: 'transparent',
        color: theme.colors.primary,
        border: `1px solid ${theme.colors.primary}`,
      },
      ghost: {
        backgroundColor: 'transparent',
        color: theme.colors.primary,
        border: 'none',
      },
    };
    
    return {
      ...sizes[size],
      ...variants[variant],
      borderRadius: '6px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'inherit',
      transition: 'all 0.2s ease',
    };
  }}
`;
```

**Props:** All HTML button attributes

**Common Use Cases:**
- Form submissions
- Navigation actions
- Interactive elements
- Call-to-action buttons

---

#### `engine.input<T>()`

Input field component.

```typescript
const Input = engine.input<{
  variant?: 'outlined' | 'filled';
  error?: boolean;
}>()`
  ${({ theme, variant = 'outlined', error }) => {
    return {
      width: '100%',
      padding: '12px 16px',
      fontSize: '16px',
      border: variant === 'outlined' 
        ? `1px solid ${error ? theme.colors.error : theme.colors.border}`
        : 'none',
      backgroundColor: variant === 'filled' ? theme.colors.surface : 'white',
      borderRadius: '6px',
      color: theme.colors.text,
      outline: 'none',
      transition: 'border-color 0.2s ease',
    };
  }}
  
  &:focus {
    border-color: error ? theme.colors.error : theme.colors.primary;
  }
`;
```

**Props:** All HTML input attributes

**Common Use Cases:**
- Form inputs
- Search fields
- User input
- Data entry

---

#### `engine.textarea<T>()`

Text area component.

```typescript
const TextArea = engine.textarea<{
  rows?: number;
  resize?: 'none' | 'both' | 'horizontal' | 'vertical';
}>()`
  ${({ theme, rows = 4, resize = 'vertical' }) => ({
    width: '100%',
    minHeight: `${rows * 24}px`,
    padding: '12px 16px',
    fontSize: '16px',
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '6px',
    color: theme.colors.text,
    backgroundColor: 'white',
    resize,
    outline: 'none',
    fontFamily: 'inherit',
    lineHeight: 1.5,
  })}
  
  &:focus {
    border-color: theme.colors.primary,
  }
`;
```

**Props:** All HTML textarea attributes

**Common Use Cases:**
- Long text input
- Comments
- Descriptions
- Message fields

---

#### `engine.select<T>()`

Select dropdown component.

```typescript
const Select = engine.select<{
  error?: boolean;
}>()`
  ${({ theme, error }) => ({
    width: '100%',
    padding: '12px 16px',
    fontSize: '16px',
    border: `1px solid ${error ? theme.colors.error : theme.colors.border}`,
    borderRadius: '6px',
    color: theme.colors.text,
    backgroundColor: 'white',
    outline: 'none',
    cursor: 'pointer',
  })}
  
  &:focus {
    border-color: theme.colors.primary,
  }
`;
```

**Props:** All HTML select attributes

**Common Use Cases:**
- Dropdown selections
- Form choices
- Filter options
- Settings selections

</div>

### Media Components

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### `engine.img<T>()`

Image component.

```typescript
const Image = engine.img<{
  rounded?: boolean;
  cover?: boolean;
  size?: 'sm' | 'md' | 'lg';
}>()`
  ${({ theme, rounded = false, cover = false, size = 'md' }) => {
    const sizes = {
      sm: 40,
      md: 80,
      lg: 120,
    };
    
    return {
      width: size ? `${sizes[size]}px` : 'auto',
      height: size ? `${sizes[size]}px` : 'auto',
      borderRadius: rounded ? '50%' : '6px',
      objectFit: cover ? 'cover' : 'contain',
      backgroundColor: theme.colors.surface,
    };
  }}
`;
```

**Props:** All HTML img attributes

**Common Use Cases:**
- Profile pictures
- Product images
- Icons
- Illustrations

---

#### `engine.video<T>()`

Video component.

```typescript
const Video = engine.video<{
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
}>()`
  ${({ theme }) => ({
    width: '100%',
    maxHeight: '400px',
    borderRadius: '8px',
    backgroundColor: theme.colors.surface,
  })}
`;
```

**Props:** All HTML video attributes

**Common Use Cases:**
- Video players
- Background videos
- Media content
- Tutorials

---

#### `engine.audio<T>()`

Audio component.

```typescript
const Audio = engine.audio<{
  controls?: boolean;
  autoplay?: boolean;
  loop?: boolean;
}>()`
  ${({ theme }) => ({
    width: '100%',
    maxWidth: '400px',
  })}
`;
```

**Props:** All HTML audio attributes

**Common Use Cases:**
- Audio players
- Music tracks
- Podcasts
- Sound effects

</div>

### Navigation Components

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### `engine.nav<T>()`

Navigation container.

```typescript
const Navigation = engine.nav()`
  ${({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: `${theme.spacing.md}px ${theme.spacing.lg}px`,
    backgroundColor: theme.colors.background,
    borderBottom: `1px solid ${theme.colors.border}`,
  })}
`;
```

**Props:** All HTML nav attributes

**Common Use Cases:**
- Main navigation
- Menu bars
- Link containers
- Site navigation

---

#### `engine.a<T>()`

Link component.

```typescript
const Link = engine.a<{
  variant?: 'primary' | 'secondary' | 'muted';
  underline?: boolean;
}>()`
  ${({ theme, variant = 'primary', underline = false }) => {
    const colors = {
      primary: theme.colors.primary,
      secondary: theme.colors.secondary,
      muted: theme.colors.textSecondary,
    };
    
    return {
      color: colors[variant],
      textDecoration: underline ? 'underline' : 'none',
      cursor: 'pointer',
      transition: 'color 0.2s ease',
    };
  }}
  
  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;
```

**Props:** All HTML a attributes

**Common Use Cases:**
- Navigation links
- External links
- Action links
- Reference links

</div>

### Form Components

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### `engine.form<T>()`

Form container.

```typescript
const Form = engine.form<{
  spaced?: boolean;
}>()`
  ${({ theme, spaced = true }) => ({
    display: 'flex',
    flexDirection: 'column',
    gap: spaced ? `${theme.spacing.md}px` : '0',
  })}
`;
```

**Props:** All HTML form attributes

**Common Use Cases:**
- User input forms
- Search forms
- Contact forms
- Settings forms

---

#### `engine.label<T>()`

Label component.

```typescript
const Label = engine.label<{
  required?: boolean;
}>()`
  ${({ theme, required = false }) => ({
    display: 'block',
    fontSize: '14px',
    fontWeight: '500',
    color: theme.colors.text,
    marginBottom: '4px',
  })}
  
  ${required ? `
    &::after {
      content: ' *';
      color: ${theme.colors.error};
    }
  ` : ''}
`;
```

**Props:** All HTML label attributes

**Common Use Cases:**
- Form labels
- Input descriptions
- Field markers
- Required indicators

---

#### `engine.fieldset<T>()`

Fieldset container.

```typescript
const Fieldset = engine.fieldset()`
  ${({ theme }) => ({
    border: `1px solid ${theme.colors.border}`,
    borderRadius: '6px',
    padding: `${theme.spacing.md}px`,
    margin: '0 0 ${theme.spacing.md}px 0',
  })}
`;
```

**Props:** All HTML fieldset attributes

**Common Use Cases:**
- Form sections
- Grouped fields
- Related inputs
- Form organization

---

#### `engine.legend<T>()`

Fieldset legend.

```typescript
const Legend = engine.legend()`
  ${({ theme }) => ({
    fontSize: '16px',
    fontWeight: '600',
    color: theme.colors.text,
    padding: '0 8px',
    margin: 0,
  })}
`;
```

**Props:** All HTML legend attributes

**Common Use Cases:**
- Fieldset titles
- Section headers
- Group labels
- Form descriptions

</div>

### Table Components

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

#### `engine.table<T>()`

Table container.

```typescript
const Table = engine.table()`
  ${({ theme }) => ({
    width: '100%',
    borderCollapse: 'collapse',
    backgroundColor: theme.colors.background,
    borderRadius: '8px',
    overflow: 'hidden',
  })}
`;
```

**Props:** All HTML table attributes

**Common Use Cases:**
- Data tables
- Information grids
- Comparison tables
- Structured data

---

#### `engine.thead<T>()`

Table header.

```typescript
const TableHeader = engine.thead()`
  ${({ theme }) => ({
    backgroundColor: theme.colors.surface,
  })}
`;
```

**Props:** All HTML thead attributes

**Common Use Cases:**
- Table headers
- Column titles
- Data labels
- Table structure

---

#### `engine.tbody<T>()`

Table body.

```typescript
const TableBody = engine.tbody()`
  ${({ theme }) => ({
    backgroundColor: theme.colors.background,
  })}
`;
```

**Props:** All HTML tbody attributes

**Common Use Cases:**
- Table content
- Data rows
- Information display
- Table structure

---

#### `engine.tr<T>()`

Table row.

```typescript
const TableRow = engine.tr<{
  hover?: boolean;
}>()`
  ${({ theme, hover = true }) => ({
    borderBottom: `1px solid ${theme.colors.border}`,
    transition: 'background-color 0.2s ease',
  })}
  
  ${hover ? `
    &:hover {
      background-color: ${theme.colors.surface};
    }
  ` : ''}
`;
```

**Props:** All HTML tr attributes

**Common Use Cases:**
- Data rows
- Table structure
- Information rows
- Grid layout

---

#### `engine.th<T>()`

Table header cell.

```typescript
const TableHeaderCell = engine.th()`
  ${({ theme }) => ({
    padding: '12px 16px',
    textAlign: 'left',
    fontSize: '14px',
    fontWeight: '600',
    color: theme.colors.text,
    borderBottom: `2px solid ${theme.colors.border}`,
  })}
`;
```

**Props:** All HTML th attributes

**Common Use Cases:**
- Column headers
- Data labels
- Table titles
- Structure markers

---

#### `engine.td<T>()`

Table data cell.

```typescript
const TableCell = engine.td()`
  ${({ theme }) => ({
    padding: '12px 16px',
    fontSize: '14px',
    color: theme.colors.text,
    borderBottom: `1px solid ${theme.colors.border}`,
  })}
`;
```

**Props:** All HTML td attributes

**Common Use Cases:**
- Data cells
- Information display
- Table content
- Grid items

</div>

---

## 🎯 Component Patterns

### Compound Components

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// Card compound component
const Card = {
  Container: engine.div()`
    ${({ theme }) => ({
      backgroundColor: theme.colors.background,
      borderRadius: '12px',
      padding: '24px',
      boxShadow: theme.shadows.md,
      border: `1px solid ${theme.colors.border}`,
    })}
  `,
  
  Header: engine.div()`
    ${({ theme }) => ({
      marginBottom: '16px',
      paddingBottom: '16px',
      borderBottom: `1px solid ${theme.colors.border}`,
    })}
  `,
  
  Title: engine.h3()`
    ${({ theme }) => ({
      fontSize: '18px',
      fontWeight: '600',
      color: theme.colors.text,
      margin: 0,
    })}
  `,
  
  Content: engine.div()`
    ${({ theme }) => ({
      color: theme.colors.text,
      lineHeight: 1.6,
    })}
  `,
  
  Footer: engine.div()`
    ${({ theme }) => ({
      marginTop: '16px',
      paddingTop: '16px',
      borderTop: `1px solid ${theme.colors.border}`,
    })}
  `,
};

// Usage
const MyCard = () => (
  <Card.Container>
    <Card.Header>
      <Card.Title>Card Title</Card.Title>
    </Card.Header>
    <Card.Content>
      Card content goes here...
    </Card.Content>
    <Card.Footer>
      Footer content
    </Card.Footer>
  </Card.Container>
);
```

</div>

### Responsive Components

<div style="background: #f8f9fa; padding: 20px; border-radius: 8px; margin: 20px 0;">

```typescript
// Responsive container
const ResponsiveContainer = engine.div()`
  ${({ theme }) => ({
    width: '100%',
    maxWidth: '1200px',
    margin: '0 auto',
    padding: `0 ${theme.spacing.md}px`,
    
    '@media (min-width: 768px)': {
      padding: `0 ${theme.spacing.lg}px`,
    },
    
    '@media (min-width: 1024px)': {
      padding: `0 ${theme.spacing.xl}px`,
    },
  })}
`;

// Responsive grid
const Grid = engine.div<{ 
  columns?: 1 | 2 | 3 | 4;
}>()`
  ${({ columns = 2, theme }) => ({
    display: 'grid',
    gap: `${theme.spacing.md}px`,
    gridTemplateColumns: '1fr',
    
    '@media (min-width: 768px)': {
      gridTemplateColumns: `repeat(${Math.min(columns, 2)}, 1fr)`,
    },
    
    '@media (min-width: 1024px)': {
      gridTemplateColumns: `repeat(${columns}, 1fr)`,
    },
  })}
`;
```

</div>

---

## 🎉 Summary

### What you've learned:

- ✅ Complete React Native component reference
- ✅ Complete React Web component reference
- ✅ Component patterns and best practices
- ✅ Compound component patterns
- ✅ Responsive component design
- ✅ Component prop interfaces

### Ready for more?

<div align="center">

[⚡ Performance Guide](./performance.md) | [🔄 Migration Guide](./migration.md) | [🔧 API Reference](./api-reference.md)

</div>

---

<div align="center">

**Need help?** [Join our Discord](https://discord.gg/stylized) | [Report an Issue](https://github.com/your-repo/stylized/issues)

</div>
