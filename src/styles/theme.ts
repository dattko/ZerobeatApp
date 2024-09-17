import { Pointer } from 'lucide-react-native';

const colors = {
  darkGray: '#1a1a1a',
  mediumGray: '#2a2a2a',
  lightGray: '#3a3a3a',
  gray: '#9e9e9e',
  fontColor: '#e0e0e0',
  white: '#ffffff',
  black: '#000000',
  spotify: '#1DB954',
  Point: '#E4003A'
};

const fontSizes = {
  xs: 10,
  sm: 12,
  md: 14,
  lg: 16,
  xl: 18,
  xxl: 22,
};

const spacing = {
  sm: 8,
  md: 16,
  lg: 24,
};


export const theme = {
  colors,
  fontSizes,
  spacing,
};



export type Theme = typeof theme;