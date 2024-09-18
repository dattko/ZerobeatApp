import * as Keychain from 'react-native-keychain';

interface TokenData {
  accessToken: string;
  refreshToken: string;
  expirationDate: string;
}

export const saveTokens = async (accessToken: string, refreshToken: string, expirationDate: string): Promise<void> => {
  try {
    const tokenData: TokenData = { accessToken, refreshToken, expirationDate };
    await Keychain.setGenericPassword('authTokens', JSON.stringify(tokenData));
  } catch (error) {
    console.error('Error saving tokens:', error);
    throw error;
  }
};

export const getStoredTokens = async (): Promise<TokenData | null> => {
  try {
    const credentials = await Keychain.getGenericPassword();
    if (credentials) {
      return JSON.parse(credentials.password) as TokenData;
    }
    return null;
  } catch (error) {
    console.error('Error getting stored tokens:', error);
    return null;
  }
};

export const getStoredAccessToken = async (): Promise<string | null> => {
  const tokens = await getStoredTokens();
  return tokens ? tokens.accessToken : null;
};

export const getStoredRefreshToken = async (): Promise<string | null> => {
  const tokens = await getStoredTokens();
  return tokens ? tokens.refreshToken : null;
};

export const getStoredExpirationDate = async (): Promise<string | null> => {
  const tokens = await getStoredTokens();
  return tokens ? tokens.expirationDate : null;
};

export const clearTokens = async (): Promise<void> => {
  try {
    await Keychain.resetGenericPassword();
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
