---
title: Stylized Documentation
description: Modern styling library for React Native
---

<div align="center">

# 🎨 Stylized

## Modern styling library for React Native

[![npm version](https://badge.fury.io/js/stylized.svg)](https://badge.fury.io/js/stylized)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

---

### ✨ Features

🎨 **Template Literal Styling**  
🌍 **Global Theme System** (no providers needed)  
🔒 **Full TypeScript Support**  
⚡ **Optimized Performance**  
📱 **React Native Focus**  

---

### 🚀 Quick Start

```bash
npm install stylized
```

#### React Native
```tsx
import { engine, setTheme } from 'stylized/react-native';

setTheme({
  colors: { primary: '#007AFF', background: '#FFFFFF' },
  spacing: { md: 16 },
});

const Container = engine('View', ({ theme }) => ({
  flex: 1,
  backgroundColor: theme.colors.background,
  padding: theme.spacing.md,
}));
```

---

### 📚 Documentation

| 📖 Section | 📝 Description |
|------------|----------------|
| [📖 README](./README.md) | Quick start and basic usage |
| [📚 API Reference](./api-reference.md) | Complete API documentation |
| [🚀 Getting Started](./getting-started.md) | Detailed setup guide |
| [🎨 Styling Guide](./styling-guide.md) | Advanced styling techniques |
| [🌍 Theme System](./theme-system.md) | Global theming architecture |
| [📱 Components](./components.md) | Available components reference |

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
  <h4>📱 React Native Focus</h4>
  <p>Built specifically for React Native with native styling optimizations and component support.</p>
</div>

</div>

---

### 📊 Comparison

| Feature | Stylized | Styled Components | StyleSheet |
|---------|----------|-------------------|-------------|
| Template Literals | ✅ | ✅ | ❌ |
| Global Theme (No Provider) | ✅ | ❌ | ❌ |
| TypeScript Support | ✅ | ✅ | ✅ |
| React Native Support | ✅ | ✅ | ✅ |
| Performance | ⚡ | ⚡ | ⚡⚡ |
| Conditional Styling | ✅ | ✅ | ❌ |

---

### 🎮 Try It Now

<div align="center">

[📖 Quick Start](./README.md) | [📚 API Reference](./api-reference.md) | [🚀 Getting Started](./getting-started.md)

</div>

---

<div align="center">

**Built with ❤️ for the React Native community**

</div>

</div>
