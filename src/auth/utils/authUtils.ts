import AsyncStorage from '@react-native-async-storage/async-storage';
import { STORAGE_KEYS } from '@/auth/config/authConstans';

export const saveTokens = async (accessToken: string, refreshToken: string, expirationDate: string): Promise<void> => {
  try {
    await AsyncStorage.multiSet([
      [STORAGE_KEYS.ACCESS_TOKEN, accessToken],
      [STORAGE_KEYS.REFRESH_TOKEN, refreshToken],
      [STORAGE_KEYS.TOKEN_EXPIRATION_DATE, expirationDate],
    ]);
  } catch (error) {
    console.error('Error saving tokens:', error);
    throw error;
  }
};

export const getStoredAccessToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.ACCESS_TOKEN);
  } catch (error) {
    console.error('Error getting access token:', error);
    return null;
  }
};

export const getStoredRefreshToken = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
  } catch (error) {
    console.error('Error getting refresh token:', error);
    return null;
  }
};

export const getStoredExpirationDate = async (): Promise<string | null> => {
  try {
    return await AsyncStorage.getItem(STORAGE_KEYS.TOKEN_EXPIRATION_DATE);
  } catch (error) {
    console.error('Error getting token expiration date:', error);
    return null;
  }
};

export const clearTokens = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove(Object.values(STORAGE_KEYS));
  } catch (error) {
    console.error('Error clearing tokens:', error);
    throw error;
  }
};

export const isTokenExpired = async (): Promise<boolean> => {
  const expirationDate = await getStoredExpirationDate();
  if (!expirationDate) return true;

  const expirationBuffer = 60 * 1000; // 1분
  return new Date(expirationDate).getTime() - expirationBuffer <= new Date().getTime();
};