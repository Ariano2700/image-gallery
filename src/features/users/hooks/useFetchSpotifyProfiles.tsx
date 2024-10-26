"use client";
import useProfilesStore from "@/store/spotifyStore/profile.store";
import { useEffect } from "react";

export default function useFetchSpotifyProfiles() {
  //IDs
  const ID_ARIANO = process.env.NEXT_PUBLIC_SPOTIFY_ID_ARIANO as string;
  const ID_FATIMA = process.env.NEXT_PUBLIC_SPOTIFY_ID_FATIMA as string;
  //Setear en estado
  const setProfileAriano = useProfilesStore((state) => state.setProfileAriano);
  const setProfileFaima = useProfilesStore((state) => state.setProfileFatima);
  //Estado
  const profileAriano = useProfilesStore((state) => state.profileAriano);
  const profileFatima = useProfilesStore((state) => state.profileFatima);

  const fetchProfile = async (userId: string) => {
    const response = await fetch(`/api/spotify/get?userId=${userId}`, {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Error fetching data");
    }
    const result = await response.json();
    return result.userProfile;
  };
  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        const arianoP = await fetchProfile(ID_ARIANO);
        console.log("ArianoP", arianoP);
        const fatimaP = await fetchProfile(ID_FATIMA);
        setProfileAriano(arianoP);
        setProfileFaima(fatimaP);
      } catch (error: any) {
        throw new Error(error);
      }
    };
    fetchProfiles();
  },[]);
  return { profileAriano, profileFatima };
}
