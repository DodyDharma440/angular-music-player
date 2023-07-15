import { BaseData, ExternalUrls, ImageFormat } from './base.model';

export interface Artist extends BaseData<'artist'> {
  external_urls: ExternalUrls;
  name: string;
  images: ImageFormat[];
  genres: string[];
  followers: {
    href: string;
    total: number;
  };
}
