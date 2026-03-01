import { Stack } from 'expo-router';
import { setTheme } from 'stylized/react-native';

export const unstable_settings = {
  anchor: 'index',
};

setTheme({
  color: {
    background: '#f0f0f0',
    text: '#333',
    primary: '#6200ee',
    error: '#b00020',
  },
  spacing: {
    xs: 4,
    sm: 8,
    md: 16,
    lg: 24,
    xl: 32,
  },
});

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
    </Stack>
  );
}
