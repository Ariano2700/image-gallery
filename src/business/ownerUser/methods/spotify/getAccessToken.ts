import { GetAccessToken } from "../../interfaces/spotifyTypes";

export default async function getAccessToken({
  client_id,
  client_secret,
}: GetAccessToken) {
  const response = await fetch("https://accounts.spotify.com/api/token", {
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
