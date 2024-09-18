import { authorize, refresh, AuthorizeResult } from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Config } from '@/auth/config/authConfig';
import { saveTokens, getStoredAccessToken, getStoredRefreshToken, getStoredExpirationDate } from '@/auth/utils/authUtils';
import { STORAGE_KEYS } from '@/auth/config/authConstans';

export const login = async (): Promise<AuthorizeResult | null> => {
  try {
    console.log('Starting Spotify authorization...');
    const result = await authorize(Config);
    
    if (result && result.accessToken) {
      console.log('Authorization successful. Saving tokens...');
      await saveTokens(result.accessToken, result.refreshToken || '', result.accessTokenExpirationDate);
      console.log('Tokens saved successfully');
      return result;
    }
    console.log('Authorization failed: No access token received');
    return null;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  try {
    const token = await getStoredAccessToken();
    const expirationDate = await getStoredExpirationDate();

    if (!token || !expirationDate) {
      return null;
    }

    const expirationBuffer = 60 * 1000; // 1분
    if (new Date(expirationDate).getTime() - expirationBuffer <= new Date().getTime()) {
      return await refreshTokens();
    }

    return token;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

const refreshTokens = async (): Promise<string | null> => {
  try {
    const refreshToken = await getStoredRefreshToken();
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const newAuthState = await refresh(Config, {
      refreshToken,
    });

    await saveTokens(newAuthState.accessToken, newAuthState.refreshToken || refreshToken, newAuthState.accessTokenExpirationDate);

    return newAuthState.accessToken;
  } catch (error) {
    console.error('Error refreshing tokens:', error);
    return null;
  }
};

export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  } catch (error) {
    console.error('Logout failed:', error);
    throw error;
  }
};

export const checkPremiumStatus = async (accessToken: string): Promise<boolean> => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    const data = await response.json();
    
    if (!response.ok) {
      console.warn(`HTTP error when checking premium status: ${response.status} - ${data.error.message}`);
      return false;
    }

    return data.product === 'premium';
  } catch (error) {
    console.error('Error checking premium status:', error);
    return false;
  }
};