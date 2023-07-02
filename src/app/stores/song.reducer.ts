import { Action, createReducer, on } from '@ngrx/store';
import { SongState } from '../models/song.model';
import { GetLikedSongsAction } from '../actions/songs.action';

const initialState: SongState = {
  likedSongs: {
    data: [],
    total: 0,
    nextPage: null,
  },
};

export const songsReducer = (
  state: SongState = initialState,
  action: Action
) => {
  const reducer = createReducer(
    initialState,
    on(GetLikedSongsAction, (state, action) => {
      return {
        ...state,
        likedSongs: action.payload,
      };
    })
  );
  return reducer(state, action);
};
