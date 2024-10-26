import { GetUserProfileProps } from "../../interfaces/spotifyTypes";

export default async function getUserProfile({
  userId,
  token,
}: GetUserProfileProps) {
  try {
    const response = await fetch(`https://api.spotify.com/v1/users/${userId}`, {
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
