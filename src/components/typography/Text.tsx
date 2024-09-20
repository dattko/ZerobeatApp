import React from 'react';
import styled from 'styled-components/native';
import { FONT_SIZE, FONT_FAMILY } from '@constants/typography';
import { TextProps as RNTextProps } from 'react-native';

export interface TextProps extends RNTextProps {
  size?: keyof typeof FONT_SIZE;
  fontFamily?: keyof typeof FONT_FAMILY;
  color?: string;
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
  eclipse?: boolean;
  eclipseLine?: number;
}

const StyledText = styled.Text<TextProps>`
  font-size: ${props => FONT_SIZE[props.size || 'md']}px;
  font-family: ${props => FONT_FAMILY[props.fontFamily || 'regular']};
  color: ${props => props.color || '#e0e0e0'};
  text-align: ${props => props.align || 'left'};
  word-wrap: break-word;
`;

export const Text: React.FC<TextProps> = ({ children, eclipseLine, eclipse, ...props }) => (
  <StyledText
    {...props}
    numberOfLines={eclipse ? eclipseLine? eclipseLine : 2 : undefined}
    ellipsizeMode={eclipse ? 'tail' : undefined}
    textBreakStrategy='simple'
  >
    {children}
  </StyledText>
);