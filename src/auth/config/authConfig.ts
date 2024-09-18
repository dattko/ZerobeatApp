import { SPOTIFY_CLIENT_ID, ANDROID_REDIRECT_URI, IOS_REDIRECT_URI } from '@env';
import { Platform } from 'react-native';

export const Config = {
  clientId: SPOTIFY_CLIENT_ID,
  redirectUrl: Platform.OS === 'ios' ? IOS_REDIRECT_URI : ANDROID_REDIRECT_URI,
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
  usePKCE: true, // PKCE 사용 설정
};