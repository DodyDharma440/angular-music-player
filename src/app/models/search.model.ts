import { Album } from './album.model';
import { Artist } from './artist.model';
import { PaginationResponse, SpotifyCategory } from './base.model';
import { Playlist } from './playlist.model';
import { Song } from './song.model';

export interface GlobalSearchState {
  value: string;
}

export interface SearchResponse {
  tracks: PaginationResponse<Song>;
  artists: PaginationResponse<Artist>;
  albums: PaginationResponse<Album>;
  playlists: PaginationResponse<Playlist>;
}

export interface SearchQueries {
  value: string;
  type: SpotifyCategory;
  params?: string;
}

export interface SearchResult {
  id: string;
  image: string;
  name: string;
  owner?: string;
  tracksCount?: number;
  detailPath?: any[];
  song?: Song;
  isArtist?: boolean;
}

export interface SearchResults
  extends Record<`${SpotifyCategory}s`, SearchResult[]> {}

export interface SearchStateData {
  page: number;
  data: SearchResult[];
}

export interface SearchState
  extends Record<`${SpotifyCategory}s`, SearchStateData> {}
