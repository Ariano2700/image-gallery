import { SpotifyProfileProps } from "@/business/ownerUser/interfaces/spotifyTypes";
import { create } from "zustand";

interface ProfileStoreI {
  profileAriano: SpotifyProfileProps | null;
  profileFatima: SpotifyProfileProps | null;
  setProfileAriano: (profile: SpotifyProfileProps) => void;
  setProfileFatima: (profile: SpotifyProfileProps) => void;
}
const useProfilesStore = create<ProfileStoreI>((set) => ({
  profileAriano: null,
  profileFatima: null,
  setProfileAriano: (profile) => set({ profileAriano: profile }),
  setProfileFatima: (profile) => set({ profileFatima: profile }),
}));
export default useProfilesStore;
