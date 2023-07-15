import { PlaylistState } from './playlist.model';
import { GlobalSearchState } from './search.model';
import { LikedSongState, SongState } from './song.model';
import { UserState } from './user.model';

export interface RootState {
  readonly user: UserState;
  readonly song: SongState;
  readonly likedSongs: LikedSongState;
  readonly playlists: PlaylistState;
  readonly globalSearch: GlobalSearchState;
}
