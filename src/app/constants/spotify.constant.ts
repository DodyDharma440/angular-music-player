import { SpotifyCategory, SpotifyCategoryOption } from '../models/base.model';

export const spotifyCategories: SpotifyCategoryOption[] = [
  { label: 'Songs', value: 'track' },
  { label: 'Albums', value: 'album' },
  { label: 'Playlists', value: 'playlist' },
  { label: 'Artists', value: 'artist' },
];
