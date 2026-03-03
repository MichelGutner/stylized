# Stylized Web Example

This is a basic web example demonstrating the Stylized library with React and Vite.

## Features Demonstrated

- **Stylized Components**: Using `engine` to create styled components
- **Theme Integration**: Global theme setup with `setTheme`
- **Conditional Styling**: Using `.when()` for dynamic styles
- **TypeScript Support**: Full type safety and autocomplete
- **Interactive UI**: Beautiful components with animations and effects

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Run development server:
```bash
npm run dev
```

## Example Usage

```tsx
import { engine, setTheme } from 'stylized/react'

// Setup theme
setTheme({
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
  },
  spacing: {
    sm: 8,
    md: 16,
    lg: 24,
  },
})

// Create styled components
const Button = engine('button')
  .style({
    backgroundColor: '#007AFF',
    color: 'white',
    padding: '12px 24px',
    border: 'none',
    borderRadius: '8px',
  })
  .when('variant:secondary', {
    backgroundColor: '#5856D6',
  })
  .when('disabled', {
    opacity: 0.5,
    cursor: 'not-allowed',
  })

// Use in components
const App = () => (
  <Button variant="primary">Click me</Button>
)
```

## Project Structure

```
web-example/
├── src/
│   ├── App.tsx          # Main application component
│   └── main.tsx        # Application entry point
├── package.json
├── vite.config.ts
└── index.html
```
