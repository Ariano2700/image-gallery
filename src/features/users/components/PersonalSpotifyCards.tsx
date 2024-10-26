import { SpotifyProfileProps } from "@/business/ownerUser/interfaces/spotifyTypes";
import Controls from "./Controls";
import SpotifyButton from "./SpotifyButton";

function PersonalSpotifyCards({ profile }: { profile: SpotifyProfileProps }) {
  return (
    <div
      className="bg-[#282828] h-[330px] p-5 w-full flex flex-col items-center rounded-2xl text-white gap-4 min-[500px]:flex-row min-[500px]:h-[250px]"
    >
      <img
        src={profile.images[0].url}
        alt={profile.id}
        className="object-cover min-w-32 size-32 rounded-full"
      />
      <div className="flex flex-col justify-center gap-5 w-full">
        <div className="flex justify-between items-center">
          <div className="flex flex-col justify-center gap-1">
            <h3 className="font-semibold text-3xl">{profile.display_name}</h3>
            <p className="text-sm font-medium">
              {profile.followers?.total ?? 0} seguidores
            </p>
          </div>
          <SpotifyButton hrfe={profile.external_urls.spotify} />
        </div>
        <Controls />
      </div>
    </div>
  );
}
export default PersonalSpotifyCards;
