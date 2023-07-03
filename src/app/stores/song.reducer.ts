import { Action, createReducer, on } from '@ngrx/store';
import { SongState } from '../models/song.model';
import {
  GetLikedSongsAction,
  SetPlayedSongAction,
  UpdatePlayerSongAction,
  // TogglePlaySongAction,
} from '../actions/songs.action';
import { hydrationMetaReducer } from './hydration.reducer';

const initialState: SongState = {
  likedSongs: {
    data: [],
    total: 0,
    nextPage: null,
  },
  playedSong: {
    playlists: [],
    song: null,
    player: {
      isPlaying: false,
      isShuffle: false,
      isMuted: false,
      repeatMode: 'none',
      volume: 100,
      currentTime: 0,
    },
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
    }),
    on(UpdatePlayerSongAction, (state, action) => {
      const _payload =
        action.payload instanceof Function
          ? action.payload(state.playedSong)
          : action.payload;

      return {
        ...state,
        playedSong: {
          ...state.playedSong,
          player: {
            ...state.playedSong.player,
            ..._payload,
          },
        },
      };
    })
  );
  const hydratedReducer = hydrationMetaReducer<SongState>(
    reducer,
    'song-player'
  );
  return hydratedReducer(state, action);
};
