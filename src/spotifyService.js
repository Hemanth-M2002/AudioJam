import axios from 'axios';

const clientId = '1c49874cfb154e94afa41a686710e5f4';
const clientSecret = '9b1e9cf0c18a44f0acfe588a4bae22c9';
const authEndpoint = 'https://accounts.spotify.com/api/token';
const baseUrl = 'https://api.spotify.com/v1';

let accessToken = '';

const getAccessToken = async () => {
  if (accessToken) return accessToken;

  const response = await axios.post(authEndpoint, 'grant_type=client_credentials', {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization': `Basic ${btoa(`${clientId}:${clientSecret}`)}`
    }
  });

  accessToken = response.data.access_token;
  return accessToken;
};

const fetchSpotifyData = async (endpoint) => {
  const token = await getAccessToken();
  const response = await axios.get(`${baseUrl}${endpoint}`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });

  return response.data;
};

export const fetchAlbums = () => fetchSpotifyData('/browse/new-releases?limit=10');
export const fetchSongs = () => fetchSpotifyData('/playlists/37i9dQZF1DXcBWIGoYBM5M');
