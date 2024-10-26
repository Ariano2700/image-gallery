export type GetUserProfileProps = {
  userId: string;
  token: string;
};
export type GetAccessToken = {
  client_id: string;
  client_secret: string;
};
export interface SpotifyProfileProps {
  display_name: string;
  external_urls: ExternalUrls;
  followers: Followers;
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
}

interface ExternalUrls {
  spotify: string;
}

interface Followers {
  href: any;
  total: number;
}

interface Image {
  url: string;
  height: number;
  width: number;
}
