import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from '@react-navigation/native';
import { Stack } from 'expo-router';

import { useColorScheme } from '@/hooks/use-color-scheme';
import { setTheme } from 'stylized/react-native';
import { useEffect } from 'react';

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
    md: 20,
    xl: 30,
  },
});

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
  }, []);

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Stack.Screen name="index" options={{ headerShown: false }} />
      </Stack>
    </ThemeProvider>
  );
}
