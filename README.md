# 🎨 Stylized

> Modern styling library for React and React Native with template literals and global theming

[![npm version](https://badge.fury.io/js/stylized.svg)](https://badge.fury.io/js/stylized)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

## 📚 Documentation

**Complete documentation is available in our interactive docs:**

### 🚀 [Getting Started](./docs/index.md)

Installation, setup, and basic usage for both React Native and React Web.

### 🎮 [Interactive Playground](./docs/playground.md)

Try Stylized right now with live examples and demos.

### 📖 [Full Documentation](./docs/index.md)

- 🎨 Styling Guide
- 🌍 Theme System
- 📱 Components Reference
- ⚡ Performance Guide
- � Migration Guide
- 🔧 API Reference

---

## ⚡ Quick Start

```bash
npm install stylized
# or
yarn add stylized
```

### React Native

```tsx
import { engine, setTheme } from 'stylized/react-native';

setTheme({
  colors: { primary: '#007AFF', background: '#FFFFFF' },
  spacing: { md: 16 },
});

const Container = engine.View()`
  ${({ theme }) => ({
    flex: 1,
    backgroundColor: theme.colors.background,
    padding: theme.spacing.md,
  })}
`;
```

### React Web

```tsx
import { engine, setTheme } from 'stylized/react';

setTheme({
  colors: { primary: '#007AFF', background: '#FFFFFF' },
  spacing: { md: 16 },
});

const Container = engine.div()`
  ${({ theme }) => ({
    display: 'flex',
    minHeight: '100vh',
    backgroundColor: theme.colors.background,
    padding: `${theme.spacing.md}px`,
  })}
`;
```

---

## ✨ Features

- 🎨 **Template Literal Styling**
- 🌍 **Global Theme System** (no providers needed)
- 🔒 **Full TypeScript Support**
- ⚡ **Optimized Performance**
- 📱 **Cross-Platform Support**

---

## 📊 Why Stylized?

| Feature | Stylized | Styled Components | StyleSheet | Emotion |
|---------|----------|-------------------|-------------|---------|
| Template Literals | ✅ | ✅ | ❌ | ✅ |
| Global Theme (No Provider) | ✅ | ❌ | ❌ | ❌ |
| TypeScript Support | ✅ | ✅ | ✅ | ✅ |
| React Native Support | ✅ | ✅ | ✅ | ❌ |
| React Web Support | ✅ | ✅ | ❌ | ✅ |
| Performance | ⚡ | ⚡ | ⚡⚡ | ⚡ |

---

## 🤝 Community

- [🐛 Report Issues](https://github.com/MichelGutner/stylized/issues)
- [💡 Feature Requests](https://github.com/MichelGutner/stylized/discussions)
- [📖 Full Documentation](./docs/index.md)

---

## 📄 License

MIT © [Michel Gutner]

---

<div align="center">

**Built with ❤️ for the React community**

[📚 View Full Documentation](./docs/index.md)

</div>