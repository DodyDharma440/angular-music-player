import { LikedSongState, SongState } from './song.model';
import { UserState } from './user.model';

export interface RootState {
  readonly user: UserState;
  readonly song: SongState;
  readonly likedSongs: LikedSongState;
}
