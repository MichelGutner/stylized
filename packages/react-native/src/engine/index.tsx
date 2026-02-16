/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-unused-vars */
import React from 'react';
import {
  View,
  Pressable,
  StyleProp,
  ViewStyle,
  ViewProps,
  PressableProps,
} from 'react-native';
import { useTheme } from '../theme';

type StyleObject = StyleProp<ViewStyle>;

type StyleResolver<P> = (_ctx: { theme: DefaultTheme } & P) => StyleObject;

type Interpolations<P> = Array<StyleResolver<P>>;

function CreateStyledComponent<PBase, PExtra = object>(
  BaseComponent: React.ComponentType<PBase & { style?: StyleObject }>,
) {
  return <P extends PExtra = PExtra>(
    _: TemplateStringsArray,
    ...interpolations: Interpolations<P>
  ) => {
    const StyledComponent: React.FC<PBase & P> = props => {
      const theme = useTheme();
      
      const resolvedStyles = interpolations.reduce<StyleObject>((acc, fn) => {
        const style = fn({ theme, ...(props as P) });
        return acc ? [acc, style] : style;
      }, undefined as unknown);

      // @ts-ignore
      const { style, ...restProps } = props as PBase & P;
      // @ts-ignore
      return <BaseComponent style={[resolvedStyles, style]} {...restProps} />;
    };

    return StyledComponent;
  };
}

export const stylized = {
  View<PExtra = object>(
    strings: TemplateStringsArray,
    ...interpolations: Interpolations<PExtra>
  ) {
    return CreateStyledComponent<ViewProps, PExtra>(View)(
      strings,
      ...interpolations,
    );
  },

  Pressable<PExtra = object>(
    strings: TemplateStringsArray,
    ...interpolations: Interpolations<PExtra>
  ) {
    return CreateStyledComponent<PressableProps, PExtra>(Pressable)(
      strings,
      ...interpolations,
    );
  },
};
