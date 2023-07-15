import { Action, createReducer, on } from '@ngrx/store';
import { SongState } from '../models/song.model';
import {
  SetPlayedSongAction,
  UpdatePlayerSongAction,
} from '../actions/songs.action';
import { hydrationMetaReducer } from './hydration.reducer';

const initialState: SongState = {
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
};

export const songReducer = (
  state: SongState = initialState,
  action: Action
) => {
  const reducer = createReducer(
    initialState,
    on(SetPlayedSongAction, (state, action) => {
      const isPlaying =
        action.payload.autoPlay === false && state.player.isPlaying === false
          ? false
          : true;

      return {
        ...state,
        ...action.payload,
        player: {
          ...state.player,
          isPlaying,
        },
      };
    }),
    on(UpdatePlayerSongAction, (state, action) => {
      const _payload =
        action.payload instanceof Function
          ? action.payload(state)
          : action.payload;

      return {
        ...state,
        player: {
          ...state.player,
          ..._payload,
        },
      };
    })
  );
  const hydratedReducer = hydrationMetaReducer<SongState>(
    reducer,
    'song-player-state'
  );
  return hydratedReducer(state, action);
};
