export interface RecentlyPlayedTrack {
  name: string;
  artist: string;
  albumArt: string;
  url: string;
}

export interface YouTubeMusicApiResponse {
  success: boolean;
  data?: RecentlyPlayedTrack;
  error?: string;
}
