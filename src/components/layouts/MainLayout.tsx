import React from 'react';
import { ThemeProvider } from 'styled-components/native';
import {
  SafeAreaView,
  View,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';
import { theme } from '@/styles/theme';

interface MainLayoutProps {
  children?: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? theme.colors.darkGray : theme.colors.darkGray,
  };

  return (
    <ThemeProvider theme={theme}>
      <SafeAreaView style={[styles.container, backgroundStyle]}>
        <StatusBar
          barStyle={isDarkMode ? 'light-content' : 'dark-content'}
          backgroundColor={backgroundStyle.backgroundColor}
        />
        <View style={styles.wrap}>
          {children}
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  wrap: {
    flexGrow: 1,
    backgroundColor: theme.colors.mediumGray,
  },
});

export default MainLayout;