import { Text } from 'react-native';
import { engine, useTheme, setTheme } from 'stylized/react-native';

const StyledView = engine.View`
  ${({ theme }) => ({
    flex: 1,
    backgroundColor: theme.color.background,
    padding: theme.spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
  })}
`;

const StyledPressable = engine.Pressable`
  ${({ theme }) => ({
    backgroundColor: theme.color.primary,
    padding: theme.spacing.xl,
  })}
`;

export const TestComponent = () => {
  const handleToggleTheme = () => {
    setTheme((prevTheme) => ({
      ...prevTheme,
      color: {
        ...prevTheme.color,
        primary: prevTheme.color?.primary === '#6200ee' ? '#03dac6' : '#6200ee',
      },
    }));
  }

  return (
    <StyledView>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 16 }}>
        Welcome to Expo Router!
      </Text>
      <Text style={{ fontSize: 16, marginBottom: 8 }}>
        This is the home screen of your app.
      </Text>
      <StyledPressable onPress={handleToggleTheme}>
        <Text style={{ color: '#fff', fontSize: 16 }}>Toggle Theme</Text>
      </StyledPressable>
    </StyledView>
  );
};

export default function HomeScreen() {
  return <TestComponent />;
}
