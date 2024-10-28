import { spotifyEndpoints } from "@/endpointsRouter";
import { GetUserProfileProps } from "../../interfaces/spotifyTypes";

export default async function getUserProfile({
  userId,
  token,
}: GetUserProfileProps) {
  try {
    const route = spotifyEndpoints.getSpotifyUserProfileEndpoint(userId);
    const response = await fetch(route, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    const data = await response.json();
    return data;
  } catch (error: any) {
    throw new Error(error);
  }
}
