import useFetchSpotifyProfiles from "../hooks/useFetchSpotifyProfiles";
import PersonalSpotifyCards from "./PersonalSpotifyCards";
import SpotifyCardSkeletor from "./SpotifyCardSkeletor";

function OurSpotifyData() {
  const PLAYLIST_ID = "0bzgEXmPub3RjBizQhB3ig";
  const { profileAriano, profileFatima } = useFetchSpotifyProfiles();
  return (
    <section className="flex flex-col md:flex-row items-center justify-center h-full p-3 gap-5">
      <div className="flex flex-col gap-5	w-full items-center">
        {profileFatima ? (
          <PersonalSpotifyCards profile={profileFatima} />
        ) : (
          <SpotifyCardSkeletor />
        )}
        {profileAriano ? (
          <PersonalSpotifyCards profile={profileAriano} />
        ) : (
          <SpotifyCardSkeletor />
        )}
      </div>
      <iframe
        title="Our spotify playlist"
        src={`https://open.spotify.com/embed/playlist/${PLAYLIST_ID}?utm_source=generator&theme=0`}
        width="100%"
        height="100%"
        style={{ minHeight: "520px" }}
        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture "
        loading="lazy"
      />
    </section>
  );
}
export default OurSpotifyData;
