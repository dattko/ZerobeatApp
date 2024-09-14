import React from 'react';
import styled from 'styled-components/native';
import { FONT_SIZE, FONT_FAMILY } from '@constants/typography';

export interface TextProps {
  size?: keyof typeof FONT_SIZE;
  fontFamily?: keyof typeof FONT_FAMILY;
  color?: string;
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
}

const StyledText = styled.Text<TextProps>`
  font-size: ${props => FONT_SIZE[props.size || 'md']}px;
  font-family: ${props => FONT_FAMILY[props.fontFamily || 'regular']};
  color: ${props => props.color || '#e0e0e0'};
  text-align: ${props => props.align || 'left'};
`;

export const Text: React.FC<TextProps> = ({ children, ...props }) => (
  <StyledText {...props}>{children}</StyledText>
);