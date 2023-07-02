import { SongState } from './song.model';
import { UserState } from './user.model';

export interface State {
  readonly user: UserState;
  readonly songs: SongState;
}
