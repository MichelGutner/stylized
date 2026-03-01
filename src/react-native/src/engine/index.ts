/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as RN from 'react-native';
import { stylized } from './styled-engine';
import { StyleOrFn, EngineComponent } from './types';

export type RNComponents = {
  View: typeof RN.View;
  Text: typeof RN.Text;
  Image: typeof RN.Image;
  ScrollView: typeof RN.ScrollView;
  TouchableOpacity: typeof RN.TouchableOpacity;
  TextInput: typeof RN.TextInput;
  Pressable: typeof RN.Pressable;
  StatusBar: typeof RN.StatusBar;
  ActivityIndicator: typeof RN.ActivityIndicator;
  Switch: typeof RN.Switch;
  Modal: typeof RN.Modal;
  KeyboardAvoidingView: typeof RN.KeyboardAvoidingView;
  ImageBackground: typeof RN.ImageBackground;
  TouchableHighlight: typeof RN.TouchableHighlight;
  TouchableWithoutFeedback: typeof RN.TouchableWithoutFeedback;
  SafeAreaView: typeof RN.SafeAreaView;
};

export interface Engine {
  <K extends keyof RNComponents, P extends object = {}>(
    component: K,
    style?: StyleOrFn<RNComponents[K], P>
  ): EngineComponent<RNComponents[K], P>;

  <C extends React.ComponentType<any>, P extends object = {}>(
    component: C,
    style?: StyleOrFn<C, P>
  ): EngineComponent<C, P>;
}

function createEngine(): Engine {
  const engineFn = (component: any, style?: any) => {
    let BaseComponent = component;

    if (typeof component === 'string') {
      BaseComponent = (RN)[component];
    }

    const styledComp = stylized(BaseComponent);
    
    if (style) {
      return styledComp.style(style);
    }

    return styledComp;
  };

  return engineFn as Engine;
}

export const engine = createEngine();
