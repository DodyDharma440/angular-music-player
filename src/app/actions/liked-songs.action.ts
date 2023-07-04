import { createAction, props } from '@ngrx/store';
import { LikedSongState } from '../models/song.model';

export enum UserActionType {
  GET_LIKED_SONGS = 'GET_LIKED_SONGS',
}

export const GetLikedSongsAction = createAction(
  UserActionType.GET_LIKED_SONGS,
  props<{ payload: LikedSongState }>()
);
