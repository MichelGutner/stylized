# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.0.1] - 2025-03-01

### Added
- Initial release of stylized
- **React Native styling engine** with conditional styling
- **React Web styling engine** with CSS properties support
- **Global theme system** without providers
- **TypeScript support** with full autocomplete
- **Method chaining API** with `.style()`, `.when()`, and `.attrs()`
- **Performance optimizations** with caching
- **Platform-specific styling** support
- **Cross-platform compatibility** (React & React Native)
- **Comprehensive documentation** and examples

### Features
- **Conditional Styling**: Apply styles based on props, platform, or custom conditions
- **Global Theme**: Access theme anywhere without providers
- **Type Safety**: Full TypeScript support with autocomplete for all methods
- **Performance**: Optimized caching and minimal re-renders
- **React Native Support**: Built-in support for all React Native components
- **React Web Support**: Built-in support for all HTML elements and CSS properties
- **Unified API**: Same API works for both React and React Native

### Platform Support
- **React Native**: `import { engine } from 'stylized/react-native'`
  - All React Native components
  - Native style properties
  - Platform-specific styling
- **React Web**: `import { engine } from 'stylized/web'`
  - All HTML elements
  - CSS properties
  - Responsive design support

### API
- `engine(component, style?)` - Create styled components
- `.style(styleOrFn)` - Apply styles with theme support
- `.when(condition, attrs)` - Apply conditional attributes
- `.attrs(attrs)` - Apply static attributes
- `useTheme()` - Access current theme
- `setTheme(theme)` - Update global theme
- `getTheme()` - Get current theme value

### TypeScript
- Full autocomplete for `.when()` conditions
- Platform unions: `'ios' | 'android' | 'web'`
- Prop condition generation from component interfaces
- Global `EngineTheme` interface for type extension
- Type-safe CSS properties for web
- Type-safe React Native styles for mobile

### Examples
- React Native components with conditional styling
- React web components with CSS properties
- Theme integration across platforms
- Responsive design patterns
- Complex conditional logic
