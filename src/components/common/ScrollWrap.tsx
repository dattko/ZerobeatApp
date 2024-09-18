import React from 'react';
import { ScrollView,StyleSheet } from 'react-native';
import { theme } from '@/styles/theme';

  interface ScrollProps {
    children?: React.ReactNode;
  }
  const styles = StyleSheet.create({
    scrollWrap: {
      padding: 16,
      backgroundColor: theme.colors.mediumGray,
      borderWidth: 1,
    },
  });

const Scroll: React.FC<ScrollProps> = ({children}) => {
  return (
    <ScrollView style={styles.scrollWrap}>
      {children}
    </ScrollView>
  );
}

export default Scroll;


