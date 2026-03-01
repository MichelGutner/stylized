import { useState } from 'react';
import { Text, ScrollView, SafeAreaView, StatusBar, View } from 'react-native';
import { engine, useTheme, setTheme } from 'stylized/react-native';

const Container = engine('View', ({ theme }) => ({
  flex: 1,
  backgroundColor: theme.color.background,
  padding: theme.spacing.lg,
}));

const Card = engine(View, ({ theme }) => ({
  backgroundColor: theme.color.background === '#ffffff' ? '#f8f9fa' : '#2d3748',
  padding: theme.spacing.md,
  marginBottom: theme.spacing.md,
  borderRadius: 8,
  shadowColor: '#131111',
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.1,
  shadowRadius: 4,
  elevation: 3,
}))

Card.when(ctx => ctx.platform === 'ios', {
  ref: (ref) => console.log('Ref específico para iOS:', ref),
  children: <Text>Card específico para iOS</Text>,
})

Card.attrs({
  onLayout: (e) => console.log('Layout do Card:', e.nativeEvent.layout),
});

const Title = engine('Text', ({ theme }) => ({
  fontSize: 24,
  fontWeight: "900",
  color: theme.color.text,
  marginBottom: theme.spacing.md,
  textAlign: 'center',
}));

const Subtitle = engine('Text', ({ theme }) => ({
  fontSize: 18,
  fontWeight: '800',
  color: theme.color.text,
  marginBottom: theme.spacing.sm,
}));

Subtitle.when('ios', {
  children: '🎨 Paleta de Cores',
});

const BodyText = engine('Text', ({ theme }) => ({
  fontSize: 16,
  color: theme.color.text,
  lineHeight: 24,
  marginBottom: theme.spacing.sm,
}));

const Button = engine<
  'Pressable',
  { variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' }
>('Pressable', ({ theme, props: { variant = 'primary' } }) => ({
    backgroundColor:
      variant === 'primary'
        ? theme.color.primary
        : variant === 'secondary'
          ? theme.color.secondary
          : variant === 'success'
            ? theme.color.success
            : variant === 'warning'
              ? theme.color.warning
              : variant === 'error'
                ? theme.color.error
                : theme.color.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  }));

const ButtonText = engine('Text', ({ theme }) => ({
  color: theme.color.text,
  fontSize: 16,
  fontWeight: "900",
}));

const Section = engine('View', ({ theme }) => ({
  marginBottom: theme.spacing.xl,
}));

const ColorPalette = engine('View', ({ theme }) => ({
  flexDirection: 'row',
  flexWrap: 'wrap',
  justifyContent: 'space-between',
  marginBottom: theme.spacing.md,
}));

const ColorBox = engine('View', ({ theme }) => ({
  width: 60,
  height: 60,
  borderRadius: 8,
  marginBottom: theme.spacing.sm,
  justifyContent: 'center',
  alignItems: 'center',
}));

const ColorLabel = engine('Text', ({ theme }) => ({
  fontSize: 10,
  color: '#ffffff',
  textAlign: 'center',
  fontWeight: 'bold',
}));

const SpacingDemo = engine('View', ({ theme }) => ({
  marginBottom: theme.spacing.md,
}));

const SpacingBox = engine<'View', { size: number }>('View', ({ theme, props: { size } }) => ({
    width: size,
    height: size,
    backgroundColor: theme.color.primary,
    marginBottom: theme.spacing.sm,
    borderRadius: 4,
  }));

export const TestComponent = () => {
  const [currentTheme, setCurrentTheme] = useState('light');
  const theme = useTheme();

  const toggleTheme = () => {
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    setCurrentTheme(newTheme);

    setTheme({
      color: {
        background: newTheme === 'light' ? '#ffffff' : '#1a202c',
        text: newTheme === 'light' ? '#2d3748' : '#e2e8f0',
        secondary: newTheme === 'light' ? '#805ad5' : '#b794f4',
        success: newTheme === 'light' ? '#38a169' : '#68d391',
        warning: newTheme === 'light' ? '#d69e2e' : '#fbd38d',
        error: newTheme === 'light' ? '#e53e3e' : '#fc8181',
      },
      spacing: {
        xs: 4,
        sm: 8,
        md: 16,
        lg: 24,
        xl: 32,
      },
    });
  };

  const updatePrimaryColor = () => {
    const colors = ['#3182ce', '#805ad5', '#38a169', '#d69e2e', '#e53e3e'];
    const currentIndex = colors.indexOf(theme.color.primary || '#3182ce');
    const nextIndex = (currentIndex + 1) % colors.length;

    setTheme(prev => ({
      ...prev,
      color: {
        ...prev.color,
        primary: colors[nextIndex],
      },
    }));
  };

  return (
    <Container>
      <SafeAreaView style={{ flex: 1 }}>
        <StatusBar
          barStyle={currentTheme === 'light' ? 'dark-content' : 'light-content'}
          backgroundColor={theme.color.background}
        />

        <ScrollView showsVerticalScrollIndicator={false}>
          <>
            {/* Header */}
            <Title>🎨 Stylized Theme Test Suite</Title>
            <BodyText>Teste completo do sistema de temas Stylized</BodyText>

            {/* Theme Controls */}
            <Section>
              <Subtitle>🎛️ Controles de Tema</Subtitle>
              <Card>
                <Button onPress={toggleTheme}>
                  <ButtonText>🌓 Alternar Tema ({currentTheme})</ButtonText>
                </Button>
                <Button onPress={updatePrimaryColor}>
                  <ButtonText>🎨 Mudar Cor Primária</ButtonText>
                </Button>
              </Card>
            </Section>

            {/* Color Palette */}
            <Section>
              <Subtitle></Subtitle>
              <Card>
                <ColorPalette>
                  <ColorBox style={{ backgroundColor: theme.color.primary }}>
                    <ColorLabel>Primary</ColorLabel>
                  </ColorBox>
                  <ColorBox style={{ backgroundColor: theme.color.secondary }}>
                    <ColorLabel>Secondary</ColorLabel>
                  </ColorBox>
                  <ColorBox style={{ backgroundColor: theme.color.success }}>
                    <ColorLabel>Success</ColorLabel>
                  </ColorBox>
                  <ColorBox style={{ backgroundColor: theme.color.warning }}>
                    <ColorLabel>Warning</ColorLabel>
                  </ColorBox>
                  <ColorBox style={{ backgroundColor: theme.color.error }}>
                    <ColorLabel>Error</ColorLabel>
                  </ColorBox>
                </ColorPalette>
              </Card>
            </Section>

            {/* Button Variants */}
            <Section>
              <Subtitle>🔘 Variações de Botões</Subtitle>
              <Card onLayout={e => console.log("CARD ", e.nativeEvent.layout)}>
                <Button variant="primary">
                  <ButtonText>Botão Primário</ButtonText>
                </Button>
                <Button variant="secondary">
                  <ButtonText>Botão Secundário</ButtonText>
                </Button>
                <Button variant="success">
                  <ButtonText>Botão Sucesso</ButtonText>
                </Button>
                <Button variant="warning">
                  <ButtonText>Botão Alerta</ButtonText>
                </Button>
                <Button variant="error">
                  <ButtonText>Botão Erro</ButtonText>
                </Button>
              </Card>
            </Section>

            {/* Typography */}
            <Section>
              <Subtitle>📝 Tipografia</Subtitle>
            </Section>

            {/* Spacing Demo */}
            <Section>
              <Subtitle>📏 Sistema de Espaçamento</Subtitle>
              <Card>
                <BodyText>XS (4px)</BodyText>
                <SpacingDemo>
                  <SpacingBox size={4} />
                </SpacingDemo>

                <BodyText>SM (8px)</BodyText>
                <SpacingDemo>
                  <SpacingBox size={8} />
                </SpacingDemo>

                <BodyText>MD (16px)</BodyText>
                <SpacingDemo>
                  <SpacingBox size={16} />
                </SpacingDemo>

                <BodyText>LG (24px)</BodyText>
                <SpacingDemo>
                  <SpacingBox size={24} />
                </SpacingDemo>

                <BodyText>XL (32px)</BodyText>
                <SpacingDemo>
                  <SpacingBox size={32} />
                </SpacingDemo>
              </Card>
            </Section>

            {/* Interactive Demo */}
            <Section>
              <Subtitle>🎮 Demo Interativa</Subtitle>
              <Card>
                <BodyText>
                  Theme atual: {JSON.stringify(theme.color, null, 2)}
                </BodyText>
              </Card>
            </Section>
          </>
        </ScrollView>
      </SafeAreaView>
    </Container>
  );
};

export default function HomeScreen() {
  return <TestComponent />;
}
