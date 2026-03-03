import { useState } from 'react';
import { engine, setTheme } from 'stylized/react';
import './App.css';

// Setup theme
setTheme({
  colors: {
    primary: '#007AFF',
    secondary: '#5856D6',
    background: '#FFFFFF',
    surface: '#F2F2F7',
    text: '#000000',
    textSecondary: '#8E8E93',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
  borderRadius: {
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
  },
});

// Define component props
interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'small' | 'medium' | 'large';
  disabled?: boolean;
  children: React.ReactNode;
  onClick?: () => void;
}

// Create styled button
const Button = engine<'button', ButtonProps>('button', ({ theme }) => ({
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontFamily: 'system-ui, -apple-system, sans-serif',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  border: '2px solid transparent',
  outline: 'none',
  backgroundColor: theme.colors.primary,
}))
  .style(({ props, theme }) => ({
    fontSize:
      props.size === 'small'
        ? '14px'
        : props.size === 'large'
          ? '18px'
          : '16px',
    padding:
      props.size === 'small'
        ? `${theme.spacing.sm}px ${theme.spacing.md}px`
        : props.size === 'large'
          ? `${theme.spacing.lg}px ${theme.spacing.xl}px`
          : `${theme.spacing.md}px ${theme.spacing.lg}px`,
    borderRadius:
      props.size === 'small'
        ? `${theme.borderRadius.sm}px`
        : props.size === 'large'
          ? `${theme.borderRadius.lg}px`
          : `${theme.borderRadius.md}px`,
  }))
  .when('variant:primary', {
    onClick: () => alert('Primary Button Clicked!'),
  });
console.log('🚀 ~ Button:', Button);

// Create styled card
const Card = engine('div').style(({ theme }) => ({
  backgroundColor: theme.colors.surface,
  borderRadius: `${theme.borderRadius.lg}px`,
  padding: `${theme.spacing.lg}px`,
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
  border: `1px solid ${theme.colors.textSecondary}20`,
}));

// Create styled text
const Text = engine<'p', { variant?: 'primary' | 'secondary' | 'heading' }>('p')
  .style(({ theme }) => ({
    margin: '0',
    fontFamily: 'system-ui, -apple-system, sans-serif',
    color: theme.colors.text,
    lineHeight: 1.5,
  }))
  .when('variant:secondary', ({ theme }) => ({
    color: theme.colors.textSecondary,
    fontSize: '14px',
  }))
  .when('variant:heading', {});

function App() {
  const [count, setCount] = useState(0);

  return (
    <div
      style={{
        padding: '32px',
        minHeight: '100vh',
        backgroundColor: '#FFFFFF',
      }}>
      <Card>
        <Text variant="heading">Stylized React Web Example</Text>
        <Text>
          This demonstrates the power of Stylized with React web applications.
          The same API works for both React and React Native!
        </Text>

        <div
          style={{
            display: 'flex',
            gap: '16px',
            marginTop: '24px',
            flexWrap: 'wrap',
          }}>
          <Button
            variant="primary"
            size="small"
            onClick={() => setCount(count => count + 1)}>
            Small Primary
          </Button>

          <Button
            variant="secondary"
            size="medium"
            onClick={() => setCount(count => count + 1)}>
            Medium Secondary
          </Button>

          <Button
            variant="outline"
            size="large"
            onClick={() => setCount(count => count + 1)}>
            Large Outline
          </Button>

          <Button
            variant="primary"
            disabled
            onClick={() => setCount(count => count + 1)}>
            Disabled Button
          </Button>
        </div>
      </Card>

      <Card style={{ marginTop: '24px' }}>
        <Text variant="heading">Counter: {count}</Text>
        <Text>
          The buttons above use the powerful <code>.when()</code> method for
          conditional styling. Try clicking them to see how they work!
        </Text>

        <div style={{ marginTop: '16px' }}>
          <Text variant="secondary">
            All styling is type-safe with full TypeScript autocomplete. The
            theme system works globally without providers.
          </Text>
        </div>
      </Card>
    </div>
  );
}

export default App;
