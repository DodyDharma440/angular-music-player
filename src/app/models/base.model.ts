export interface PaginationResponse<T extends any = any> {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: T[];
}

export interface ExternalUrls extends Record<string, string> {
  spotify: string;
}

export interface ImageFormat {
  height: number;
  url: string;
  width: number;
}

export interface BaseData<T extends string = string> {
  href: string;
  id: string;
  type: T;
  uri: string;
}

export type SpotifyCategory = 'album' | 'playlist' | 'track' | 'artist';

export interface SpotifyCategoryOption {
  label: string;
  value: SpotifyCategory;
}
