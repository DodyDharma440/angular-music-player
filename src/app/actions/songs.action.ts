import { createAction, props } from '@ngrx/store';
import { SongState } from '../models/song.model';

export enum UserActionType {
  GET_LIKED_SONGS = 'GET_LIKED_SONGS',
  SET_PLAYED_SONG = 'SET_PLAYED_SONG',
  UPDATE_PLAYER_SONG = 'UPDATE_PLAYER_SONG',
}

export const GetLikedSongsAction = createAction(
  UserActionType.GET_LIKED_SONGS,
  props<{ payload: SongState['likedSongs'] }>()
);

export const SetPlayedSongAction = createAction(
  UserActionType.SET_PLAYED_SONG,
  props<{ payload: Pick<SongState['playedSong'], 'playlists' | 'song'> }>()
);

type UpdatePlayerPayloadReturn = Partial<SongState['playedSong']['player']>;
export type UpdatePlayerPayload =
  | ((state: SongState['playedSong']) => UpdatePlayerPayload)
  | UpdatePlayerPayloadReturn;

export const UpdatePlayerSongAction = createAction(
  UserActionType.UPDATE_PLAYER_SONG,
  props<{
    payload: UpdatePlayerPayload;
  }>()
);
