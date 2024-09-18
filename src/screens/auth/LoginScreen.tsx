import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';import { login } from '@/auth/auth';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '@/navigation/AppNavigator';
import { theme } from '@/styles/theme';

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Auth'>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

const LoginScreen = ({ navigation } : Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const result = await login();
      console.log('Login result:', result); 
      if (result && result.accessToken) {  // accessToken의 존재 여부로
        console.log('Login successful, navigating to Main');
      } else {
        setError('Login failed. Please try again.');
        console.log('Login failed with no valid result.');
      }
    } catch (error) {
      console.error('Login failed with error:', error); 
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to ZeroBeat</Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={handleLogin}
        disabled={isLoading}
      >
        <Text style={styles.loginButtonText}>
          {isLoading ? '로그인 중...' : '로그인'}
        </Text>
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.darkGray,
    },
    title: {
      fontSize: 24,
      color: '#1DB954',
      marginBottom: 30,
    },
    loginButton: {
      backgroundColor: '#1DB954',
      paddingVertical: 12,
      paddingHorizontal: 30,
      borderRadius: 25,
    },
    loginButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: 'bold',
    },
    errorText: {
      color: 'red',
      marginTop: 10,
    },
  });  

export default LoginScreen;