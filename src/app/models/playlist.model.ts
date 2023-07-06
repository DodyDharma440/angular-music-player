import {
  BaseData,
  ExternalUrls,
  ImageFormat,
  PaginationResponse,
} from './base.model';
import { Song } from './song.model';
import { User } from './user.model';

export interface PlaylistItem {
  added_at: string;
  added_by: BaseData & { externalUrls: ExternalUrls };
  is_local: boolean;
  primary_color: string | null;
  track: Song;
}
export interface Playlist extends BaseData<'playlist'> {
  collaborative: boolean;
  description: string;
  externalUrls: ExternalUrls;
  images: Array<ImageFormat | undefined>;
  name: string;
  owner: User;
  public: boolean;
  snapshot_id: string;
  tracks?: Partial<PaginationResponse<PlaylistItem>>;
}

export interface UserPlaylistResponse extends PaginationResponse<Playlist> {}

export interface PlaylistResponse {
  message: string;
  playlists: PaginationResponse<Playlist>;
}

export interface PlaylistState {
  user: Playlist[];
  featured: Playlist[];
  category: Record<string, Playlist[]>;
  sidebarId: string;
}
