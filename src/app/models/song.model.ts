import { Album } from './album.model';
import { Artist } from './artist.model';
import { BaseData, ExternalUrls, PaginationResponse } from './base.model';

export interface Song extends BaseData<'track'> {
  album?: Album;
  artists: Artist[];
  available_markets: string[];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  external_ids: Record<string, string>;
  external_urls: ExternalUrls;
  is_local: boolean;
  name: string;
  popularity: number;
  preview_url: string;
  track_number: number;
}

export interface LikedSong {
  added_at: string;
  track: Song;
}

export interface LikedSongsResponse extends PaginationResponse<LikedSong> {}

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
