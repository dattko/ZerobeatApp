import { authorize, refresh, AuthorizeResult } from 'react-native-app-auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET, SPOTIFY_REDIRECT_URI } from '@env';

const spotifyAuthConfig = {
  clientId: SPOTIFY_CLIENT_ID,
  clientSecret: SPOTIFY_CLIENT_SECRET,
  redirectUrl: SPOTIFY_REDIRECT_URI,
  scopes: [
    'user-read-email',
    'user-read-recently-played',
    'user-read-playback-state',
    'user-top-read',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'user-follow-read',
    'playlist-read-private',
    'user-read-private',
    'user-library-read',
    'playlist-read-collaborative',
    'streaming',
    'user-library-modify',
    'playlist-modify-public',
    'playlist-modify-private',
  ],
  serviceConfiguration: {
    authorizationEndpoint: 'https://accounts.spotify.com/authorize',
    tokenEndpoint: 'https://accounts.spotify.com/api/token',
  },
};

// 로그인 함수
export const login = async (): Promise<AuthorizeResult | null> => {
  try {
    const result = await authorize(spotifyAuthConfig);
    await AsyncStorage.setItem('spotifyAccessToken', result.accessToken);
    await AsyncStorage.setItem('spotifyRefreshToken', result.refreshToken);
    await AsyncStorage.setItem('spotifyTokenExpirationDate', result.accessTokenExpirationDate);
    return result;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};

// 토큰 가져오기 함수
export const getAccessToken = async (): Promise<string | null> => {
  try {
    const token = await AsyncStorage.getItem('spotifyAccessToken');
    const expirationDate = await AsyncStorage.getItem('spotifyTokenExpirationDate');
    
    if (!token || !expirationDate) {
      return null;
    }

    if (new Date(expirationDate) < new Date()) {
      // 토큰이 만료되었으면 갱신
      return await refreshTokens();
    }

    return token;
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

// 토큰 갱신 함수
const refreshTokens = async (): Promise<string | null> => {
  try {
    const refreshToken = await AsyncStorage.getItem('spotifyRefreshToken');
    if (!refreshToken) {
      throw new Error('No refresh token available');
    }

    const newAuthState = await refresh(spotifyAuthConfig, {
      refreshToken,
    });

    // 새로 갱신된 토큰을 저장
    await AsyncStorage.setItem('spotifyAccessToken', newAuthState.accessToken);
    await AsyncStorage.setItem('spotifyRefreshToken', newAuthState.refreshToken || refreshToken); // 만약 갱신된 리프레시 토큰이 없으면 기존 토큰 사용
    await AsyncStorage.setItem('spotifyTokenExpirationDate', newAuthState.accessTokenExpirationDate);

    return newAuthState.accessToken;
  } catch (error) {
    console.error('Error refreshing tokens:', error);
    return null;
  }
};

// 로그아웃 함수
export const logout = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem('spotifyAccessToken');
    await AsyncStorage.removeItem('spotifyRefreshToken');
    await AsyncStorage.removeItem('spotifyTokenExpirationDate');
  } catch (error) {
    console.error('로그인 실패 :', error);
  }
};

// 프리미엄 여부 확인 함수
export const checkPremiumStatus = async (accessToken: string): Promise<boolean> => {
  try {
    const response = await fetch('https://api.spotify.com/v1/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      console.warn(`HTTP error when checking premium status: ${response.status}`);
      return false;
    }

    const data = await response.json();
    return data.product === 'premium';
  } catch (error) {
    console.error('Error checking premium status:', error);
    return false;
  }
};