import { theme } from '@/styles/theme';
import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingProps {
  size?: number | 'small' | 'large';
  color?: string;
  text?: string;
}

const Loading: React.FC<LoadingProps> = ({ 
  size = 'small', 
  color = theme.colors.fontColor, 
}) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.mediumGray,
  },
});

export default Loading;