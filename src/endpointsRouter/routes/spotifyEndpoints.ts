import { spotifyEndpointsI } from "../interfaces/spotifyEndpointsInterface";

const spotifyEndpoints: spotifyEndpointsI = {
  getSpotifyUserEndpoint: (userId) => `/api/spotify/get?userId=${userId}`,
  getSpotifyAccessTokenEndpoint: () => "https://accounts.spotify.com/api/token",
  getSpotifyUserProfileEndpoint: (userId) =>
    `https://api.spotify.com/v1/users/${userId}`,
};
export default spotifyEndpoints;
