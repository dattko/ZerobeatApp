import React from 'react';
import { Text as BaseText, TextProps } from './Text';

export const Text: React.FC<TextProps> = (props) => <BaseText {...props} />;

export const TextXS: React.FC<Omit<TextProps, 'size'>> = (props) => (
  <BaseText size="xs" {...props} />
);

export const TextSM: React.FC<Omit<TextProps, 'size'>> = (props) => (
  <BaseText size="sm" {...props} />
);

export const TextMD: React.FC<Omit<TextProps, 'size'>> = (props) => (
  <BaseText size="md" {...props} />
);

export const TextLG: React.FC<Omit<TextProps, 'size'>> = (props) => (
  <BaseText size="lg" {...props} />
);

export const TextXL: React.FC<Omit<TextProps, 'size'>> = (props) => (
  <BaseText size="xl" {...props} />
);

export const TextXXL: React.FC<Omit<TextProps, 'size'>> = (props) => (
  <BaseText size="xxl" {...props} />
);