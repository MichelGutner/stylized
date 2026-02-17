import * as RN from 'react-native';
console.log(RN.View.name)
import { createStyledComponent } from './styled-engine';
/**
 * Global styled engine registry.
 *
 * Provides styled versions of all core React Native components.
 *
 * Features:
 * - Template literal styling
 * - Theme-aware styles
 * - Prop-based dynamic styles
 * - Provider-less global theming
 * - Memoized rendering
 * - Type-safe component mapping
 * - Full RN API compatibility
 *
 * Example:
 * ```tsx
 * const Box = engine.View`
 *   ${({ theme }) => ({
 *     flex: 1,
 *     backgroundColor: theme.colors.background,
 *     padding: theme.spacing.md,
 *   })}
 * `;
 * ```
 */
export const engine = {
  View<T>() {
    return createStyledComponent<T, 'View'>('View');
  },
  Text<T>() {
    return createStyledComponent<T, 'Text'>('Text');
  },
  Image<T>() {
    return createStyledComponent<T, 'Image'>('Image');
  },
  ScrollView<T>() {
    return createStyledComponent<T, 'ScrollView'>('ScrollView');
  },
  TouchableOpacity<T>() {
    return createStyledComponent<T, 'TouchableOpacity'>('TouchableOpacity');
  },
  TextInput<T>() {
    return createStyledComponent<T, 'TextInput'>('TextInput');
  },
  FlatList<T>() {
    return createStyledComponent<T, 'FlatList'>('FlatList');
  },
  SectionList<T>() {
    return createStyledComponent<T, 'SectionList'>('SectionList');
  },
  Pressable<T>() {
    return createStyledComponent<T, 'Pressable'>('Pressable');
  },
  SafeAreaView<T>() {
    return createStyledComponent<T, 'SafeAreaView'>('SafeAreaView');
  },
  StatusBar<T>() {
    return createStyledComponent<T, 'StatusBar'>('StatusBar');
  },
  ActivityIndicator<T>() {
    return createStyledComponent<T, 'ActivityIndicator'>('ActivityIndicator');
  },
  Switch<T>() {
    return createStyledComponent<T, 'Switch'>('Switch');
  },
  Modal<T>() {
    return createStyledComponent<T, 'Modal'>('Modal');
  },
  TouchableHighlight<T>() {
    return createStyledComponent<T, 'TouchableHighlight'>('TouchableHighlight');
  },
  TouchableWithoutFeedback<T>() {
    return createStyledComponent<T, 'TouchableWithoutFeedback'>(
      'TouchableWithoutFeedback',
    );
  },
  KeyboardAvoidingView<T>() {
    return createStyledComponent<T, 'KeyboardAvoidingView'>(
      'KeyboardAvoidingView',
    );
  },
  VirtualizedList<T>() {
    return createStyledComponent<T, 'VirtualizedList'>('VirtualizedList');
  },
};
