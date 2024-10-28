import { spotifyEndpoints } from "@/endpointsRouter";
import { GetAccessToken } from "../../interfaces/spotifyTypes";

export default async function getAccessToken({
  client_id,
  client_secret,
}: GetAccessToken) {
  const route = spotifyEndpoints.getSpotifyAccessTokenEndpoint();
  const response = await fetch(route, {
    method: "POST",
    headers: {
      Authorization: "Basic " + btoa(`${client_id}:${client_secret}`),
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: "grant_type=client_credentials",
  });

  const data = await response.json();
  return data.access_token;
}
