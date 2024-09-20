import axios from 'axios';

const spotifyUrl = 'https://api.spotify.com/v1'
export const fetchUserProfile = async (accessToken: string) => {
  try {
    const response = await axios.get(spotifyUrl + '/me', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Error fetching user profile: ${error.response?.statusText}`);
    } else {
      throw new Error('An unknown error occurred');
    }
  }
};
