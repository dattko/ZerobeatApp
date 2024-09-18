import React, { useEffect } from 'react';
import { ThemeProvider } from 'styled-components/native';
import { SafeAreaView, View, StatusBar, StyleSheet, useColorScheme } from 'react-native';
import { theme } from '@/styles/theme';
import { useDispatch } from 'react-redux';
import { initAuth } from '@/store/slice/authSlice';
import { AppDispatch } from '@/store'; 
import AppNavigator from '@navigation/AppNavigator';

const MainLayout: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const isDarkMode = useColorScheme() === 'dark';

  useEffect(() => {
    const initializeAuth = async () => {
      const result = await dispatch(initAuth());
      if (initAuth.fulfilled.match(result)) {
        console.log('인증 초기화 성공:', result.payload);
      } else {
        console.error('인증 초기화 실패:', result.payload);
      }
    };

    initializeAuth();
  }, [dispatch]);

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
        <View style={styles.contentWrap}>
          <AppNavigator />
        </View>
      </SafeAreaView>
    </ThemeProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentWrap: {
    flexGrow: 1,
    backgroundColor: theme.colors.mediumGray,
  },
});

export default MainLayout;
