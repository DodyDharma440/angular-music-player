import { createAction, props } from '@ngrx/store';
import { SongPlayer, SongState } from '../models/song.model';

export enum UserActionType {
  SET_PLAYED_SONG = 'SET_PLAYED_SONG',
  UPDATE_PLAYER_SONG = 'UPDATE_PLAYER_SONG',
}

export const SetPlayedSongAction = createAction(
  UserActionType.SET_PLAYED_SONG,
  props<{
    payload: Pick<SongState, 'playlists' | 'song'> & {
      autoPlay?: boolean;
    };
  }>()
);

type UpdatePlayerPayloadReturn = Partial<SongState['player']>;
export type UpdatePlayerPayload =
  | ((state: SongState) => UpdatePlayerPayloadReturn)
  | UpdatePlayerPayloadReturn;

export const UpdatePlayerSongAction = createAction(
  UserActionType.UPDATE_PLAYER_SONG,
  props<{
    payload: UpdatePlayerPayload;
  }>()
);
