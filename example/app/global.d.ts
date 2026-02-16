import { DimensionValue } from 'react-native';

declare global {
  interface DefaultTheme {
    color: {
      background: string;
      text: string;
      primary?: string;
      secondary?: string;
      success?: string;
      warning?: string;
      error?: string;
    };
    spacing: {
      xs?: DimensionValue;
      sm?: DimensionValue;
      md?: DimensionValue;
      lg?: DimensionValue;
      xl?: DimensionValue;
    };
    typography?: {
      fontSize?: {
        xs?: string | number;
        sm?: string | number;
        md?: string | number;
        lg?: string | number;
        xl?: string | number;
      };
      fontWeight?: {
        light?: string | number;
        normal?: string | number;
        medium?: string | number;
        bold?: string | number;
      };
    };
    borderRadius?: {
      sm?: string | number;
      md?: string | number;
      lg?: string | number;
      full?: string | number;
    };
    shadows?: {
      sm?: any;
      md?: any;
      lg?: any;
    };
  }
}

export {};
