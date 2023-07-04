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
  images: ImageFormat[];
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
