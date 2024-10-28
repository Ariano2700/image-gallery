import { paramsEndpointsI } from "../interfaces/paramsEndpointsInterface";

export interface spotifyEndpointsI extends paramsEndpointsI<string> {
  getSpotifyUserProfileEndpoint: (user: string) => string;
  getSpotifyUserEndpoint: (userId: string) => string;
  getSpotifyAccessTokenEndpoint: () => string;
}
