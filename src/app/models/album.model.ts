import { Artist } from './artist.model';
import {
  BaseData,
  ExternalUrls,
  ImageFormat,
  PaginationResponse,
} from './base.model';
import { Song } from './song.model';

export interface Album extends BaseData<'album'> {
  album_type: string;
  artists: Artist[];
  available_markets: string[];
  external_urls: ExternalUrls;
  images: ImageFormat[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  tracks?: Partial<PaginationResponse<Song>>;
}

export interface NewAlbumsResponse {
  albums: PaginationResponse<Album>;
}
