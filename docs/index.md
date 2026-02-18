---
title: Stylized Documentation
description: Modern styling library for React and React Native
---

<div align="center">

# 🎨 Stylized

## Modern styling library for React and React Native

[![npm version](https://badge.fury.io/js/stylized.svg)](https://badge.fury.io/js/stylized)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

### ✨ Features

🎨 **Template Literal Styling**  
🌍 **Global Theme System** (no providers needed)  
🔒 **Full TypeScript Support**  
⚡ **Optimized Performance**  
📱 **Cross-Platform Support**  

---

### 🚀 Quick Start

```bash
npm install stylized
# or
yarn add stylized
```

#### React Native

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

#### React Web

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

### 📚 Explore Documentation

| 📖 Section | 📝 Description |
|------------|----------------|
| [🚀 Getting Started](./getting-started.md) | Installation and basic usage |
| [🎨 Styling Guide](./styling-guide.md) | Advanced styling techniques |
| [🌍 Theme System](./theme-system.md) | Global theming architecture |
| [📱 Components](./components.md) | Available components reference |
| [⚡ Performance](./performance.md) | Optimization best practices |
| [🔄 Migration](./migration.md) | From other styling solutions |
| [🔧 API Reference](./api-reference.md) | Complete API documentation |

---

### 🎯 Why Stylized?

<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin: 20px 0;">

<div style="padding: 20px; border: 1px solid #e1e5e9; border-radius: 8px;">
  <h4>🏗️ Provider-less Architecture</h4>
  <p>No Theme Providers needed. Global theme system with reactive updates using <code>useSyncExternalStore</code>.</p>
</div>

<div style="padding: 20px; border: 1px solid #e1e5e9; border-radius: 8px;">
  <h4>⚡ Performance Optimized</h4>
  <p>Memoized components, efficient style resolution, and selective re-renders for optimal performance.</p>
</div>

<div style="padding: 20px; border: 1px solid #e1e5e9; border-radius: 8px;">
  <h4>🔒 Type Safety</h4>
  <p>Full TypeScript support with component prop inference and theme type safety.</p>
</div>

<div style="padding: 20px; border: 1px solid #e1e5e9; border-radius: 8px;">
  <h4>📱 Cross-Platform</h4>
  <p>Same API for React Native and React Web with platform-specific optimizations.</p>
</div>

</div>

---

### 🎮 Interactive Playground

Want to try Stylized right now? Check out our interactive playground:

[🎮 Open Playground](./playground.md)

---

### 📊 Comparison

| Feature | Stylized | Styled Components | StyleSheet | Emotion |
|---------|----------|-------------------|-------------|---------|
| Template Literals | ✅ | ✅ | ❌ | ✅ |
| Global Theme (No Provider) | ✅ | ❌ | ❌ | ❌ |
| TypeScript Support | ✅ | ✅ | ✅ | ✅ |
| React Native Support | ✅ | ✅ | ✅ | ❌ |
| React Web Support | ✅ | ✅ | ❌ | ✅ |
| Performance | ⚡ | ⚡ | ⚡⚡ | ⚡ |

---

### 🤝 Community

- [🐛 Report Issues](https://github.com/your-repo/stylized/issues)
- [💡 Feature Requests](https://github.com/your-repo/stylized/discussions)
- [📖 Contributing Guide](./contributing.md)
- [💬 Discord Community](https://discord.gg/stylized)

---

### 📄 License

MIT © [Your Name]

---

<div align="center">

**Built with ❤️ for the React community**

[⬆️ Back to top](#-stylized)

</div>