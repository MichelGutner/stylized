# 🎨 Stylized

> Modern styling library for React Native with conditional styling and global theming

[![npm version](https://badge.fury.io/js/react-native-stylized.svg)](https://badge.fury.io/js/react-native-stylized)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📚 Documentation

**Complete documentation is available in our interactive docs:**

### 🚀 [Getting Started](./docs/README.md)

Installation, setup, and basic usage for React Native.

### 📖 [API Reference](./docs/api-reference.md)

Complete API documentation with examples and TypeScript support.

---

## ⚡ Quick Start

```tsx
import { engine, setTheme } from 'react-native-stylized';

// Set up your theme
setTheme({
  colors: { primary: '#007AFF', background: '#FFFFFF' },
  spacing: { md: 16 },
  borderRadius: { md: 8 },
});

// Create styled components
const Button = engine('TouchableOpacity')
  .style({ 
    padding: 16, 
    borderRadius: 8,
    backgroundColor: '#007AFF'
  })
  .when('disabled', { opacity: 0.5 });

// Use in your app
<Button disabled={false}>
  <Text>Press me</Text>
</Button>
```

---

## ✨ Features

- 🎨 **Conditional Styling** with `.when()` method
- 🌍 **Global Theme System** (no providers needed)
- 🔒 **Full TypeScript Support** with autocomplete
- ⚡ **Optimized Performance** with caching
- 📱 **React Native Support**
- 🔄 **Method Chaining** for clean syntax

## 🤝 Community

- [🐛 Report Issues](https://github.com/MichelGutner/stylized/issues)
- [💡 Feature Requests](https://github.com/MichelGutner/stylized/discussions)
- [📖 Full Documentation](./docs/README.md)

---

## 📄 License

MIT © [Michel Gutner]

---

<div align="center">

**Built with ❤️ for the React community**

[📚 View Full Documentation](./docs/README.md)

</div>