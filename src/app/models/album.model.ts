import { Artist } from './artist.model';
import { ImageFormat } from './image.model';

export interface Album {
  album_type: 'single';
  artists: Artist[];
  available_markets: string[];
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: ImageFormat[];
  name: string;
  release_date: string;
  release_date_precision: string;
  total_tracks: number;
  type: string;
  uri: string;
}

export interface NewAlbumsResponse {
  albums: {
    href: string;
    items: Album[];
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
  };
}
