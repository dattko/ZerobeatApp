import React from 'react';
import { ScrollView,StyleSheet } from 'react-native';
import { theme } from '@/styles/theme';
import { View } from 'lucide-react-native';
import styled from 'styled-components/native';

  interface ScrollProps {
    children?: React.ReactNode;
  }
  const styles = StyleSheet.create({
    scrollWrap: {
      backgroundColor: theme.colors.mediumGray,
    },
  });

const ScrollWrap: React.FC<ScrollProps> = ({children}) => {
  return (
    <ScrollView style={styles.scrollWrap}>
      <ContentWrap>
        {children}
      </ContentWrap>
    </ScrollView>
  );
}

export default ScrollWrap;


const ContentWrap = styled.View`
  padding: 20px 12px;
  gap: 20px;
`;