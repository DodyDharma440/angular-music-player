import {
  BaseData,
  ExternalUrls,
  ImageFormat,
  PaginationResponse,
} from './base.model';
import { User } from './user.model';

export interface Playlist extends BaseData<'playlist'> {
  collaborative: boolean;
  description: string;
  externalUrls: ExternalUrls;
  images: Array<ImageFormat | undefined>;
  name: string;
  owner: User;
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string;
    total: number;
  };
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
}
