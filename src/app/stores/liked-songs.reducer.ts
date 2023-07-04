import { Action, createReducer, on } from '@ngrx/store';
import { LikedSongState } from '../models/song.model';
import { GetLikedSongsAction } from '../actions/liked-songs.action';

const initialState: LikedSongState = {
  data: [],
  total: 0,
  nextPage: null,
};

export const likedSongsReducer = (
  state: LikedSongState = initialState,
  action: Action
) => {
  const reducer = createReducer(
    initialState,
    on(GetLikedSongsAction, (state, action) => {
      return {
        ...state,
        ...action.payload,
      };
    })
  );
  return reducer(state, action);
};
