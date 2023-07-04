import { BaseData, ExternalUrls } from './base.model';

export interface User extends BaseData<'user'> {
  country: string;
  display_name: string;
  email: string;
  explicit_content: { filter_enabled: boolean; filter_locked: boolean };
  external_urls: ExternalUrls;
  followers: { href: string | null; total: number };
  images: string[];
  product: string;
}

export interface UserState {
  userData: User | null;
}
