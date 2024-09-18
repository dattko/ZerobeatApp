import { authorize, refresh, AuthorizeResult } from 'react-native-app-auth';
import { Config } from '@/auth/config/authConfig';
import { saveTokens, getStoredAccessToken, getStoredRefreshToken, isTokenExpired, clearTokens } from '@/auth/utils/authUtils';

export const login = async (): Promise<AuthorizeResult | null> => {
  try {
    const result = await authorize(Config);
    if (result && result.accessToken) {
      await saveTokens(result.accessToken, result.refreshToken || '', result.accessTokenExpirationDate);
      return result;
    }
    return null;
  } catch (error) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getAccessToken = async (): Promise<string | null> => {
  const token = await getStoredAccessToken();
  if (!token || await isTokenExpired()) {
    return await refreshTokens();
  }
  return token;
};

export const refreshTokens = async (): Promise<string | null> => {
  const refreshToken = await getStoredRefreshToken();
  if (!refreshToken) {
    throw new Error('No refresh token available');
  }

  const newAuthState = await refresh(Config, { refreshToken });
  await saveTokens(newAuthState.accessToken, newAuthState.refreshToken || refreshToken, newAuthState.accessTokenExpirationDate);

  return newAuthState.accessToken;
};

export const logout = async (): Promise<void> => {
  await clearTokens();
};

export const checkPremiumStatus = async (accessToken: string): Promise<boolean> => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (!response.ok) {
      console.warn(`HTTP error: ${response.status}`);
      return false;
    }
    const data = await response.json();
    return data.product === 'premium';
  } catch (error) {
    console.error('Error checking premium status:', error);
    return false;
  }
};
