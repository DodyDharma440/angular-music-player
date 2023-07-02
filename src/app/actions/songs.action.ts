import { createAction, props } from '@ngrx/store';
import { SongState } from '../models/song.model';

export enum UserActionType {
  GET_LIKED_SONGS = 'GET_LIKED_SONGS',
  SET_PLAYED_SONG = 'SET_PLAYED_SONG',
  TOGGLE_PLAYED_SONG = 'TOGGLE_PLAYED_SONG',
}

export const GetLikedSongsAction = createAction(
  UserActionType.GET_LIKED_SONGS,
  props<{ payload: SongState['likedSongs'] }>()
);

export const SetPlayedSongAction = createAction(
  UserActionType.SET_PLAYED_SONG,
  props<{ payload: Pick<SongState['playedSong'], 'playlists' | 'song'> }>()
);

// export const TogglePlaySongAction = createAction(
//   UserActionType.TOGGLE_PLAYED_SONG,
//   props<{
//     payload: (
//       state: SongState['playedSong']
//     ) => Pick<SongState['playedSong'], 'isPlaying'>;
//   }>()
// );
