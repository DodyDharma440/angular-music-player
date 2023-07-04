import { BaseData, ExternalUrls } from './base.model';

export interface Artist extends BaseData<'artist'> {
  external_urls: ExternalUrls;
  name: string;
}
