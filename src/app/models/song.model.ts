import { Album } from './album.model';
import { Artist } from './artist.model';

export interface Song {
  album: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: { isrc: string };
  external_urls: { spotify: string };
  href: string;
  id: string;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
  type: string;
  uri: string;
}

export interface LikedSong {
  added_at: '2022-12-31T07:48:20Z';
  track: Song;
}

export interface LikedSongsResponse {
  href: string;
  items: LikedSong[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

export type RepeatMode = 'playlist' | 'song' | 'none';

export interface SongPlayer {
  isPlaying: boolean;
  isShuffle: boolean;
  isMuted: boolean;
  repeatMode: 'playlist' | 'song' | 'none';
  volume: number;
  currentTime: number;
}

export interface SongState {
  playlists: Song[];
  song: Song | null;
  player: SongPlayer;
}

export interface LikedSongState {
  data: LikedSong[];
  total: number;
  nextPage: number | null;
}
