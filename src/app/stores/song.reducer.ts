import { Action, createReducer, on } from '@ngrx/store';
import { SongState } from '../models/song.model';
import {
  GetLikedSongsAction,
  SetPlayedSongAction,
  // TogglePlaySongAction,
} from '../actions/songs.action';

const initialState: SongState = {
  likedSongs: {
    data: [],
    total: 0,
    nextPage: null,
  },
  playedSong: {
    playlists: [],
    song: null,
    // isShuffle: false,
    // repeatMode: 'none',
    // volume: 1,
    // isPlaying: true,
    // isMuted: false,
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
    }),
    on(SetPlayedSongAction, (state, action) => {
      return {
        ...state,
        playedSong: {
          ...state.playedSong,
          isPlaying: true,
          ...action.payload,
        },
      };
    })
    // on(TogglePlaySongAction, (state, action) => {
    //   return {
    //     ...state,
    //     playedSong: {
    //       ...state.playedSong,
    //       ...action.payload(state.playedSong),
    //     },
    //   };
    // })
  );
  return reducer(state, action);
};
